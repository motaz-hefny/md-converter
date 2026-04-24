"use client";

import { X } from "lucide-react";

interface CheatsheetPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheatsheetPanel({ isOpen, onClose }: CheatsheetPanelProps) {
  if (!isOpen) return null;

  const cheatsheetItems = [
    { category: "Text Formatting", items: [
      { syntax: "**bold**", result: "bold" },
      { syntax: "*italic*", result: "italic" },
      { syntax: "~~strikethrough~~", result: "strikethrough" },
      { syntax: "`code`", result: "inline code" },
    ]},
    { category: "Headers", items: [
      { syntax: "# H1", result: "Heading 1" },
      { syntax: "## H2", result: "Heading 2" },
      { syntax: "### H3", result: "Heading 3" },
    ]},
    { category: "Lists", items: [
      { syntax: "- item", result: "bullet list" },
      { syntax: "1. item", result: "numbered list" },
      { syntax: "- [ ] task", result: "unchecked task" },
      { syntax: "- [x] task", result: "checked task" },
    ]},
    { category: "Links & Images", items: [
      { syntax: "[text](url)", result: "link" },
      { syntax: "![alt](url)", result: "image" },
    ]},
    { category: "Block Elements", items: [
      { syntax: "> quote", result: "blockquote" },
      { syntax: "```code```", result: "code block" },
      { syntax: "---", result: "horizontal rule" },
    ]},
    { category: "Math", items: [
      { syntax: "$E=mc^2$", result: "inline math" },
      { syntax: "$$...$$", result: "block math" },
    ]},
    { category: "Tables", items: [
      { syntax: "| A | B |", result: "table header" },
      { syntax: "|---|---|", result: "separator" },
      { syntax: "| C | D |", result: "table row" },
    ]},
  ];

  return (
    <div className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--card)] border-l border-[var(--border)] shadow-lg z-20 overflow-y-auto">
      <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
        <h3 className="font-semibold">Markdown Cheatsheet</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-[var(--border)] rounded transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <div className="p-4 space-y-6">
        {cheatsheetItems.map((section) => (
          <div key={section.category}>
            <h4 className="text-sm font-medium text-[var(--accent-primary)] mb-2">
              {section.category}
            </h4>
            <div className="space-y-1.5">
              {section.items.map((item) => (
                <div
                  key={item.syntax}
                  className="flex items-center justify-between text-sm py-1 px-2 rounded hover:bg-[var(--border)] transition-colors"
                >
                  <code className="font-mono text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded">
                    {item.syntax}
                  </code>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{item.result}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="pt-4 border-t border-[var(--border)] text-xs opacity-60 text-center">
          Keyboard shortcut: Ctrl+Shift+M
        </div>
      </div>
    </div>
  );
}
