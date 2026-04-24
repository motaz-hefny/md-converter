"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Copy,
  Download,
  FileUp,
  Trash2,
  RefreshCw,
  FileText,
  FileCode,
  CheckCircle2,
  ClipboardPaste,
  ImagePlus,
  Table,
  HelpCircle,
  FileType,
  Calculator
} from "lucide-react";
import { marked } from "marked";
import TurndownService from "turndown";
import { saveAs } from "file-saver";
import DOMPurify from "dompurify";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { CheatsheetPanel } from "./CheatsheetPanel";
import { TableEditor } from "./TableEditor";
import "katex/dist/katex.min.css";
import { render } from "katex";

interface ConverterProps {
  showToast: (message: string, type?: "success" | "error") => void;
}

const DEFAULT_MARKDOWN = `# Welcome to MD Converter

This is a **bidirectional** Markdown ↔ RichText converter with **math support** and **task lists**.

## Features

- ✅ **Bold** and *italic* text
- ✅ [Links](https://moteklab.com)
- ✅ Lists (ordered and unordered)
- ✅ Task lists with checkboxes
- ✅ Tables with visual editor
- ✅ Code blocks with syntax highlighting
- ✅ Blockquotes
- ✅ Math expressions: $E = mc^2$

## Task List Example

- [x] Create Markdown
- [x] Add math support
- [ ] Share with team

## Math Example

Inline math: $E = mc^2$

Block math:
$$\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\cdots + x_n$$

## Example Table

| Feature | Supported | Notes |
|---------|-----------|-------|
| Markdown | ✅ | Full GFM support |
| Math | ✅ | KaTeX rendering |
| Export | ✅ | PDF, DOCX, HTML, RTF |

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> **Tip:** Use **Ctrl+B** for bold, **Ctrl+I** for italic, **Ctrl+K** for links!

---

*Made with ❤️ by [MotekLab](https://www.moteklab.com)*
`;

export function Converter({ showToast }: ConverterProps) {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [html, setHtml] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "html">("preview");
  const [isDragging, setIsDragging] = useState(false);
  const [lastEdited, setLastEdited] = useState<"markdown" | "richtext">("markdown");
  const [cheatsheetOpen, setCheatsheetOpen] = useState(false);
  const [tableEditorOpen, setTableEditorOpen] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const richTextRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const turndownRef = useRef<TurndownService | null>(null);

  // Initialize Turndown with GFM plugin
  useEffect(() => {
    const turndown = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced",
      fence: "```",
    });
    
    // Enable GFM features manually
    turndown.addRule('strikethrough', {
      filter: ['del', 's'],
      replacement: function (content: string) {
        return '~~' + content + '~~'
      }
    });
    
    // Preserve tables
    turndown.addRule("table", {
      filter: "table",
      replacement: function(content, node) {
        const table = node as HTMLTableElement;
        const rows = Array.from(table.rows);
        if (rows.length === 0) return content;
        
        const headers = Array.from(rows[0].cells).map(cell => cell.textContent || "");
        const separator = headers.map(() => "---").join(" | ");
        const dataRows = rows.slice(1).map(row => 
          Array.from(row.cells).map(cell => cell.textContent || "").join(" | ")
        );
        
        return "\n| " + headers.join(" | ") + " |\n| " + separator + " |\n" + 
          (dataRows.length > 0 ? "| " + dataRows.join(" |\n| ") + " |\n" : "");
      },
    });
    
    // Task lists support
    turndown.addRule('taskListItems', {
      filter: function (node) {
        return node.type === 'checkbox' && 
               node.parentNode?.nodeName === 'LI';
      },
      replacement: function(_content, node) {
        const isChecked = (node as HTMLInputElement).checked;
        return isChecked ? '[x] ' : '[ ] ';
      },
    });

    // Math support for Turndown
    turndown.addRule('math-inline', {
      filter: (node) => node.nodeName === 'SPAN' && (node as HTMLElement).classList.contains('math-inline'),
      replacement: (content, node) => {
        const tex = (node as HTMLElement).getAttribute('data-tex');
        return `$${tex}$`;
      }
    });

    turndown.addRule('math-block', {
      filter: (node) => node.nodeName === 'DIV' && (node as HTMLElement).classList.contains('math-block'),
      replacement: (content, node) => {
        const tex = (node as HTMLElement).getAttribute('data-tex');
        return `\n$$\n${tex}\n$$\n`;
      }
    });
    
    turndownRef.current = turndown;
  }, []);

  // Process math expressions before marked parsing
  const processMath = useCallback((text: string): { text: string; mathExpressions: string[] } => {
    // Protect math expressions from markdown parsing
    let mathIndex = 0;
    const mathExpressions: string[] = [];
    
    // Replace block math $$...$$
    text = text.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
      mathExpressions.push(match.slice(2, -2).trim());
      return `__MATH_BLOCK_${mathIndex++}__`;
    });
    
    // Replace inline math $...$
    text = text.replace(/\$[^\$\n]+?\$/g, (match) => {
      mathExpressions.push(match.slice(1, -1).trim());
      return `__MATH_INLINE_${mathIndex++}__`;
    });
    
    return { text, mathExpressions };
  }, []);

  // Convert Markdown to HTML (only when markdown changes)
  useEffect(() => {
    if (lastEdited === "markdown") {
      // 1. Process math expressions
      const { text: textWithMathPlaceholders, mathExpressions } = processMath(markdown);
      
      // 2. Convert to HTML
      let rawHtml = marked.parse(textWithMathPlaceholders, { async: false }) as string;
      
      // 3. Replace math placeholders with HTML tags for KaTeX
      let mathIndex = 0;
      rawHtml = rawHtml.replace(/__MATH_BLOCK_\d+__/g, () => {
        const tex = mathExpressions[mathIndex++];
        return `<div class="math math-block" data-tex="${tex.replace(/"/g, '&quot;')}"></div>`;
      });
      rawHtml = rawHtml.replace(/__MATH_INLINE_\d+__/g, () => {
        const tex = mathExpressions[mathIndex++];
        return `<span class="math math-inline" data-tex="${tex.replace(/"/g, '&quot;')}"></span>`;
      });

      // 4. Process task lists (marked might not handle them as we want)
      rawHtml = rawHtml.replace(
        /<li>\[([ x])\]\s*/gi,
        (match, checked) => {
          const isChecked = checked.toLowerCase() === 'x' ? 'checked' : '';
          return `<li class="task-list-item"><input type="checkbox" ${isChecked} disabled> `;
        }
      );

      const cleanHtml = DOMPurify.sanitize(rawHtml, {
        ADD_ATTR: ['data-tex'],
        ADD_TAGS: ['math']
      });
      
      setHtml(cleanHtml);
      
      // Also update the richTextRef directly
      if (richTextRef.current) {
        richTextRef.current.innerHTML = cleanHtml;
      }
    }
  }, [markdown, lastEdited, processMath]);

  // Fix: Sync RichText preview when switching back from HTML tab
  useEffect(() => {
    if (activeTab === "preview" && richTextRef.current) {
      // Always ensure the preview is up-to-date with current markdown
      // Process task lists
      let processedMarkdown = markdown.replace(
        /^\s*-\s*\[([ x])\]\s*(.+)$/gm,
        (match, checked, content) => {
          const isChecked = checked === 'x' ? 'checked' : '';
          return `<li class="task-list-item"><input type="checkbox" ${isChecked} disabled> ${content}</li>`;
        }
      );
      
      const rawHtml = marked.parse(processedMarkdown, { async: false }) as string;
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      richTextRef.current.innerHTML = cleanHtml;
    }
  }, [activeTab, markdown]);

  const handleMarkdownChange = useCallback((value: string) => {
    setMarkdown(value);
    setLastEdited("markdown");
  }, []);

  const handleRichTextChange = useCallback(() => {
    if (richTextRef.current && turndownRef.current) {
      const htmlContent = richTextRef.current.innerHTML;
      const md = turndownRef.current.turndown(htmlContent);
      setMarkdown(md);
      setLastEdited("richtext");
    }
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        handleMarkdownChange(content);
        showToast("File loaded successfully!");
      };
      reader.readAsText(file);
    }
  }, [handleMarkdownChange, showToast]);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file && (file.name.endsWith(".md") || file.name.endsWith(".markdown"))) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        handleMarkdownChange(content);
        showToast("File dropped and loaded!");
      };
      reader.readAsText(file);
    } else {
      showToast("Please upload a .md or .markdown file", "error");
    }
  }, [handleMarkdownChange, showToast]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard!`);
    } catch {
      showToast("Failed to copy", "error");
    }
  }, [showToast]);

  const copyRichText = useCallback(async () => {
    if (richTextRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(richTextRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      try {
        document.execCommand("copy");
        selection?.removeAllRanges();
        showToast("Rich text copied! Paste into Word, Notion, etc.");
      } catch {
        showToast("Failed to copy", "error");
      }
    }
  }, [showToast]);

  // Clean up Word/LibreOffice internal CSS and garbled text
  const cleanWordHtml = useCallback((html: string): string => {
    let cleaned = html
      // Remove XML declarations
      .replace(/<\?xml[^>]*\?>/gi, '')
      // Remove all CSS style blocks completely
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<\/style>/gi, '')
      // Remove @page CSS rules (LibreOffice adds these)
      .replace(/@page\s*\{[\s\S]*?\}/gi, '')
      .replace(/@page\s+[\w-]+\s*\{[\s\S]*?\}/gi, '')
      // AGGRESSIVE: Remove ANY CSS-like text that appears outside HTML tags
      // This catches patterns like: selector { property: value; }
      // Match word characters, dots, colons, followed by { ... }
      .replace(/[a-z][\w\-\.:]*\s*\{[\s\S]*?\}/gi, '')
      // Remove CSS at-rules (@media, @import, etc.)
      .replace(/@[\w-]+\s+[^{]*\{[\s\S]*?\}/gi, '')
      // Remove inline style attributes
      .replace(/style="[^"]*"/gi, '')
      .replace(/style='[^']*'/gi, '')
      // Remove class attributes
      .replace(/class="[^"]*"/gi, '')
      .replace(/class='[^']*'/gi, '')
      // Remove Word-specific XML namespaces
      .replace(/xmlns:[^=]+="[^"]*"/gi, '')
      .replace(/xmlns="[^"]*"/gi, '')
      // Remove conditional comments (Word HTML comments like <!--[if ...]-->
      .replace(/<!--\[if[^\]]*\]>[^]*?<!\[endif\]-->/gi, '')
      .replace(/<!\[if[^\]]*\]>/gi, '')
      .replace(/<!\[endif\]>/gi, '')
      // Remove all HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove meta tags
      .replace(/<meta[^>]*>/gi, '')
      // Remove link tags
      .replace(/<link[^>]*>/gi, '')
      // Remove title tags
      .replace(/<title[^>]*>[\s\S]*?<\/title>/gi, '')
      // Remove head section completely
      .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
      // Remove Word-specific attributes
      .replace(/o:[\w-]+="[^"]*"/gi, '')
      .replace(/w:[\w-]+="[^"]*"/gi, '')
      // Remove language attributes
      .replace(/lang="[^"]*"/gi, '')
      .replace(/xml:lang="[^"]*"/gi, '')
      // Remove mso- prefixed attributes (Microsoft Office specific)
      .replace(/mso-[^:]+:[^=]+="[^"]*"/gi, '')
      // Remove empty paragraphs and spans
      .replace(/<p[^>]*>\s*<\/p>/gi, '')
      .replace(/<span[^>]*>\s*<\/span>/gi, '')
      // Clean up multiple spaces and newlines
      .replace(/\s+/g, ' ')
      // Trim
      .trim();
    
    return cleaned;
  }, []);

  const pasteRichText = useCallback(async () => {
    try {
      // Try to read HTML from clipboard first (for Word/LibreOffice paste)
      const clipboardItems = await navigator.clipboard.read();
      let htmlContent = "";
      
      for (const item of clipboardItems) {
        // Prefer text/html format (what Word/LibreOffice copies)
        if (item.types.includes("text/html")) {
          const blob = await item.getType("text/html");
          htmlContent = await blob.text();
          break;
        }
      }
      
      // Fallback to plain text if no HTML
      if (!htmlContent) {
        const text = await navigator.clipboard.readText();
        if (text) {
          htmlContent = text.replace(/\n/g, "<br>");
        }
      }
      
      if (htmlContent && turndownRef.current) {
        // Clean Word/LibreOffice garbage CSS
        htmlContent = cleanWordHtml(htmlContent);
        
        // Sanitize the HTML
        const cleanHtml = DOMPurify.sanitize(htmlContent);
        // Convert to Markdown
        const md = turndownRef.current.turndown(cleanHtml);
        setMarkdown(md);
        setLastEdited("richtext");
        showToast("Content pasted and converted to Markdown!");
      } else {
        showToast("No content found in clipboard", "error");
      }
    } catch (err) {
      // Fallback to simple text paste if clipboard API fails
      try {
        const text = await navigator.clipboard.readText();
        if (text && turndownRef.current) {
          const htmlContent = text.replace(/\n/g, "<br>");
          const cleanHtml = DOMPurify.sanitize(htmlContent);
          const md = turndownRef.current.turndown(cleanHtml);
          setMarkdown(md);
          setLastEdited("richtext");
          showToast("Content pasted and converted to Markdown!");
        }
      } catch {
        showToast("Failed to paste. Please ensure clipboard permission is granted.", "error");
      }
    }
  }, [showToast, cleanWordHtml]);

  const exportHTML = useCallback(() => {
    const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Converted Markdown</title>
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 800px; margin: 2rem auto; padding: 0 1rem; }
    pre { background: #f4f4f4; padding: 1rem; border-radius: 4px; overflow-x: auto; }
    code { background: #f4f4f4; padding: 0.2em 0.4em; border-radius: 3px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 0.5rem; text-align: left; }
    th { background: #f4f4f4; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 1rem; color: #666; }
  </style>
</head>
<body>
${html}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: "text/html" });
    saveAs(blob, "converted.html");
    showToast("HTML file downloaded!");
  }, [html, showToast]);

  const exportMarkdown = useCallback(() => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    saveAs(blob, "document.md");
    showToast("Markdown file downloaded!");
  }, [markdown, showToast]);

  const exportRTF = useCallback(() => {
    // Convert HTML to RTF format
    const rtfHeader = `{\\rtf1\\ansi\\deff0 {\\fonttbl {\\f0 Times New Roman;}}\\n`;
    const rtfFooter = `}`;
    
    // Simple HTML to RTF conversion
    let rtfContent = html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '{\\fs36\\b $1 \\par}\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '{\\fs32\\b $1 \\par}\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '{\\fs28\\b $1 \\par}\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1 \\par\n')
      .replace(/<strong>(.*?)<\/strong>/gi, '{\\b $1}')
      .replace(/<b>(.*?)<\/b>/gi, '{\\b $1}')
      .replace(/<em>(.*?)<\/em>/gi, '{\\i $1}')
      .replace(/<i>(.*?)<\/i>/gi, '{\\i $1}')
      .replace(/<u>(.*?)<\/u>/gi, '{\\ul $1}')
      .replace(/<br\s*\/?>/gi, '\\line\n')
      .replace(/<[^>]+>/g, ''); // Remove remaining tags
    
    const rtf = rtfHeader + rtfContent + rtfFooter;
    const blob = new Blob([rtf], { type: "application/rtf" });
    saveAs(blob, "converted.rtf");
    showToast("RTF file downloaded!");
  }, [html, showToast]);

  const handleRTFUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      // Simple RTF to text extraction
      const cleanText = text
        .replace(/\{\\rtf1[^}]*\}/g, '')
        .replace(/\\[a-z]+\d*\s?/g, ' ')
        .replace(/\\'/g, "'")
        .replace(/[{}]/g, '')
        .replace(/\\par/g, '\n')
        .replace(/\\line/g, '\n')
        .replace(/\\tab/g, '\t')
        .replace(/\\~/g, ' ')
        .replace(/\\-/g, '-')
        .replace(/\\_/g, ' ')
        .trim();
      
      // Convert plain text to Markdown
      const lines = cleanText.split('\n').map(line => line.trim()).filter(Boolean);
      const md = lines.join('\n\n');
      setMarkdown(md);
      setLastEdited("markdown");
      showToast(`RTF file "${file.name}" loaded!`);
    } catch (err) {
      showToast("Failed to load RTF file", "error");
    }
    
    // Reset input
    e.target.value = "";
  }, [showToast]);

  const clearAll = useCallback(() => {
    setMarkdown("");
    setHtml("");
    if (richTextRef.current) {
      richTextRef.current.innerHTML = "";
    }
    showToast("Cleared all content");
  }, [showToast]);

  const resetToDefault = useCallback(() => {
    setMarkdown(DEFAULT_MARKDOWN);
    setLastEdited("markdown");
    showToast("Reset to default content");
  }, [showToast]);

  // Export as PDF (image-based for accurate rendering)
  const exportPDF = useCallback(async () => {
    if (!richTextRef.current) return;
    
    try {
      showToast("Generating PDF...");
      
      const canvas = await html2canvas(richTextRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      let imgY = 10;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Force download using FileSaver
      const pdfBlob = pdf.output('blob');
      saveAs(pdfBlob, 'converted.pdf');
      
      showToast("PDF downloaded!");
    } catch (err) {
      showToast("Failed to export PDF", "error");
    }
  }, [showToast]);

  // Copy HTML to clipboard
  const copyHtmlToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html);
      showToast("HTML copied to clipboard!");
    } catch {
      showToast("Failed to copy HTML", "error");
    }
  }, [html, showToast]);

  // Handle HTML upload
  const handleHTMLUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const text = await file.text();
      if (turndownRef.current) {
        const cleanHtml = DOMPurify.sanitize(text);
        const md = turndownRef.current.turndown(cleanHtml);
        setMarkdown(md);
        setLastEdited("markdown");
        showToast(`HTML file "${file.name}" loaded!`);
      }
    } catch (err) {
      showToast("Failed to load HTML file", "error");
    }
    
    e.target.value = "";
  }, [showToast]);

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const imageMarkdown = `![${file.name}](${base64})\n\n`;
      
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newMarkdown = markdown.substring(0, start) + imageMarkdown + markdown.substring(end);
        setMarkdown(newMarkdown);
        setLastEdited("markdown");
        showToast(`Image "${file.name}" inserted!`);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, [markdown, showToast]);

  // Insert table
  const insertTable = useCallback((rows: number, cols: number) => {
    const headers = Array.from({ length: cols }, (_, i) => `Header ${i + 1}`).join(" | ");
    const separator = Array.from({ length: cols }, () => "---").join(" | ");
    const dataRow = Array.from({ length: cols }, (_, i) => `Cell ${i + 1}`).join(" | ");
    
    let tableMarkdown = `| ${headers} |\n| ${separator} |\n`;
    for (let i = 0; i < rows - 1; i++) {
      tableMarkdown += `| ${dataRow} |\n`;
    }
    
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newMarkdown = markdown.substring(0, start) + "\n" + tableMarkdown + "\n" + markdown.substring(end);
      setMarkdown(newMarkdown);
      setLastEdited("markdown");
    }
  }, [markdown]);

  // Calculate reading time
  const getReadingTime = useCallback(() => {
    const words = markdown.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return minutes <= 1 ? "1 min" : `${minutes} min`;
  }, [markdown]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if not in input/textarea or if Ctrl/Cmd is pressed
      if ((e.target instanceof HTMLTextAreaElement) && !e.ctrlKey && !e.metaKey) return;
      
      const isMac = navigator.platform.includes('Mac');
      const ctrlKey = isMac ? e.metaKey : e.ctrlKey;
      
      if (!ctrlKey) return;
      
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const selected = markdown.substring(start, end);
            const wrapped = `**${selected}**`;
            const newMarkdown = markdown.substring(0, start) + wrapped + markdown.substring(end);
            setMarkdown(newMarkdown);
            setLastEdited("markdown");
          }
          break;
        case 'i':
          e.preventDefault();
          if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const selected = markdown.substring(start, end);
            const wrapped = `*${selected}*`;
            const newMarkdown = markdown.substring(0, start) + wrapped + markdown.substring(end);
            setMarkdown(newMarkdown);
            setLastEdited("markdown");
          }
          break;
        case 'k':
          e.preventDefault();
          if (textareaRef.current) {
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const selected = markdown.substring(start, end) || "link text";
            const wrapped = `[${selected}](url)`;
            const newMarkdown = markdown.substring(0, start) + wrapped + markdown.substring(end);
            setMarkdown(newMarkdown);
            setLastEdited("markdown");
          }
          break;
        case 'm':
          if (e.shiftKey) {
            e.preventDefault();
            setCheatsheetOpen(prev => !prev);
          }
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [markdown]);

  // KaTeX math support
  useEffect(() => {
    if (activeTab === "preview" && richTextRef.current) {
      // Render math expressions
      const mathElements = richTextRef.current.querySelectorAll('.math');
      mathElements.forEach((el) => {
        const tex = el.getAttribute('data-tex');
        if (tex) {
          try {
            render(tex, el as HTMLElement, {
              throwOnError: false,
              displayMode: el.classList.contains('math-block')
            });
          } catch {
            // Keep original text if rendering fails
          }
        }
      });
    }
  }, [activeTab, html]);

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
        <div className="flex flex-col">
          <div className="p-3 border-b border-[var(--border)] bg-[var(--card)]/50 flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <FileCode size={16} />
              Markdown Input
            </span>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".md,.markdown"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors cursor-pointer text-xs"
              >
                <FileUp size={14} />
                <span>Upload .md</span>
              </label>
              <input
                type="file"
                accept=".html,.htm"
                onChange={handleHTMLUpload}
                className="hidden"
                id="html-upload"
              />
              <label
                htmlFor="html-upload"
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors cursor-pointer text-xs"
              >
                <FileType size={14} />
                <span>Upload HTML</span>
              </label>
              <button
                onClick={() => setTableEditorOpen(true)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors text-xs"
              >
                <Table size={14} />
                <span>Table</span>
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors cursor-pointer text-xs"
              >
                <ImagePlus size={14} />
                <span>Image</span>
              </label>
              <button
                onClick={() => setCheatsheetOpen(true)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors text-xs"
                title="Markdown Cheatsheet (Ctrl+Shift+M)"
              >
                <HelpCircle size={14} />
                <span>Help</span>
              </button>
              <button
                onClick={copyMarkdown}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors text-xs"
              >
                <Copy size={14} />
                <span>Copy MD</span>
              </button>
              <button
                onClick={exportMarkdown}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors text-xs"
              >
                <Download size={14} />
                <span>Export MD</span>
              </button>
              <button
                onClick={resetToDefault}
                className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors text-blue-500"
                title="Reset to default"
              >
                <RefreshCw size={14} />
              </button>
              <button
                onClick={clearAll}
                className="p-1.5 rounded-lg hover:bg-[var(--border)] transition-colors text-red-500"
                title="Clear all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-[400px] lg:min-h-[600px]">
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => handleMarkdownChange(e.target.value)}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              placeholder="Type or paste Markdown here..."
              className="absolute inset-0 w-full h-full p-6 bg-transparent resize-none focus:outline-none font-mono text-sm leading-relaxed"
            />
            {isDragging && (
              <div className="absolute inset-0 bg-[var(--accent-primary)]/10 backdrop-blur-sm flex items-center justify-center border-2 border-dashed border-[var(--accent-primary)] pointer-events-none">
                <div className="flex flex-col items-center gap-2">
                  <FileUp size={48} className="text-[var(--accent-primary)] animate-bounce" />
                  <p className="font-medium">Drop to upload .md file</p>
                </div>
              </div>
            )}
            <CheatsheetPanel
              isOpen={cheatsheetOpen}
              onClose={() => setCheatsheetOpen(false)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="p-3 border-b border-[var(--border)] bg-[var(--card)]/50 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium flex items-center gap-2">
                <FileText size={16} />
                Rich Text Output
              </span>
              <div className="flex bg-[var(--background)] p-0.5 rounded-lg">
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`px-3 py-1 rounded-md text-xs transition-all ${
                    activeTab === "preview"
                      ? "bg-[var(--card)] shadow-sm font-medium"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setActiveTab("html")}
                  className={`px-3 py-1 rounded-md text-xs transition-all ${
                    activeTab === "html"
                      ? "bg-[var(--card)] shadow-sm font-medium"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  HTML
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".rtf"
                onChange={handleRTFUpload}
                className="hidden"
                id="rtf-upload"
              />
              <label
                htmlFor="rtf-upload"
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors cursor-pointer text-xs"
              >
                <FileUp size={14} />
                <span>Upload .rtf</span>
              </label>
              <button
                onClick={copyRichText}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors text-xs"
              >
                <Copy size={14} />
                <span>Copy</span>
              </button>
              <button
                onClick={pasteRichText}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-red-500 text-white hover:opacity-90 transition-opacity text-xs"
                title="Paste from Word/LibreOffice"
              >
                <ClipboardPaste size={14} />
                <span>Paste</span>
              </button>
              <button
                onClick={exportRTF}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors text-xs"
              >
                <Download size={14} />
                <span>Export RTF</span>
              </button>
              <button
                onClick={copyHtmlToClipboard}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors text-xs"
              >
                <FileCode size={14} />
                <span>Copy HTML</span>
              </button>
              <button
                onClick={exportPDF}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors text-xs"
              >
                <FileType size={14} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-[400px] lg:min-h-[600px] bg-white text-black p-6 overflow-y-auto">
            {activeTab === "preview" ? (
              <div
                ref={richTextRef}
                contentEditable
                onInput={handleRichTextChange}
                className="prose prose-sm max-w-none focus:outline-none min-h-full"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              />
            ) : (
              <pre className="font-mono text-sm whitespace-pre-wrap break-all opacity-80 h-full">
                {html}
              </pre>
            )}
          </div>
        </div>
      </div>

      <div className="p-3 bg-[var(--card)]/30 border-t border-[var(--border)] flex items-center justify-between text-xs opacity-60">
        <div className="flex items-center gap-4">
          <span>{markdown.length} characters</span>
          <span>{markdown.trim().split(/\s+/).length} words</span>
          <span>{markdown.split('\n').length} lines</span>
          <span>{getReadingTime()} read</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={12} className="text-green-500" />
          <span>GFM Supported</span>
        </div>
      </div>

      <TableEditor
        isOpen={tableEditorOpen}
        onClose={() => setTableEditorOpen(false)}
        onInsert={insertTable}
      />
    </div>
  );
}

function copyMarkdown() {
  // Logic already in Converter via copyToClipboard
}
