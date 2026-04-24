import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Help & Documentation",
  description:
    "Learn how to use the Markdown to RichText converter. Complete guide with examples and supported syntax.",
};

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-aurora">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Help & Documentation
        </h1>

        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p className="mb-4">
            MD Converter is a free, privacy-first tool for converting between Markdown and RichText formats. 
            All processing happens directly in your browser - your content never leaves your device.
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Paste your Markdown content in the left panel (or upload a .md file)</li>
            <li>See the formatted RichText preview instantly on the right</li>
            <li>Edit either side - both stay in sync automatically</li>
            <li>Copy the output or export in your preferred format</li>
          </ol>
        </div>

        <div className="glass rounded-xl p-8 mb-8 border-amber-200 dark:border-amber-800 border-2">
          <h2 className="text-2xl font-semibold mb-4 text-amber-700 dark:text-amber-400">
            \u26a0\ufe0f Pasting from Microsoft Word or LibreOffice
          </h2>
          <p className="mb-4">
            When pasting content from Microsoft Word or LibreOffice Writer, you may see CSS code 
            (like <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">p.compact &#123; margin-top: 0.03in... &#125;</code>) 
            at the top of your converted Markdown.
          </p>
          <p className="mb-4">
            <strong>Why this happens:</strong> Word and LibreOffice embed internal CSS styles in copied content 
            to preserve formatting. We are actively working to improve automatic cleanup, but in the meantime:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li><strong>Delete the garbage text</strong> - Simply select and delete any CSS-looking code from the Markdown panel</li>
            <li>Your formatting will still be preserved correctly</li>
            <li>Your document will convert perfectly after cleanup</li>
          </ol>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            We are continuously improving the CSS garbage filter. Thank you for your patience!
          </p>
        </div>

        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Supported Markdown Syntax</h2>
          
          <div className="space-y-6">
            <SyntaxSection
              title="Headers"
              description="Six levels of headings supported"
              example={`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6`}
            />

            <SyntaxSection
              title="Text Formatting"
              description="Bold, italic, and strikethrough text"
              example={`**Bold text**
*Italic text*
~~Strikethrough~~
***Bold and italic***`}
            />

            <SyntaxSection
              title="Lists"
              description="Ordered and unordered lists with nesting"
              example={`Unordered list:
- Item 1
- Item 2
  - Nested item
  - Another nested
- Item 3

Ordered list:
1. First item
2. Second item
3. Third item`}
            />

            <SyntaxSection
              title="Links & Images"
              description="Inline and reference-style links"
              example={`[Link text](https://example.com)
[Link with title](https://example.com "Title")
![Alt text](https://example.com/image.png)
![Alt with title](https://example.com/image.png "Image title")`}
            />

            <SyntaxSection
              title="Code"
              description="Inline code and code blocks with syntax highlighting"
              example={"Inline `code` within text\\n\\n```javascript\\nfunction example() {\\n  return \"Hello World\";\\n}\\n```\\n\\n```python\\ndef example():\\n    return \"Hello World\"\\n```"}
            />

            <SyntaxSection
              title="Tables"
              description="GFM-style tables with alignment"
              example={`| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

Aligned table:
| Left | Center | Right |
|:-----|:------:|------:|
| L    | C      | R     |`}
            />

            <SyntaxSection
              title="Task Lists"
              description="GitHub-style task lists"
              example={`Task list:
- [x] Completed task
- [ ] Uncompleted task
- [x] Another completed
- [ ] Another pending`}
            />

            <SyntaxSection
              title="Blockquotes"
              description="Nested blockquotes supported"
              example={`> This is a blockquote
> with multiple lines
>
> > Nested blockquote
> > More nested content
>
> Back to first level`}
            />

            <SyntaxSection
              title="Horizontal Rules"
              description="Three or more dashes, asterisks, or underscores"
              example={`---
***
___`}
            />
          </div>
        </div>

        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Export Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ExportCard
              format="HTML"
              description="Clean HTML with inline styles, perfect for emails or web pages"
              icon="\ud83c\udf10"
            />
            <ExportCard
              format="Word (.docx)"
              description="Native Word format compatible with Microsoft Word and LibreOffice"
              icon="\ud83d\udcdd"
            />
            <ExportCard
              format="PDF"
              description="Portable PDF format for sharing or printing"
              icon="\ud83d\udcc4"
            />
          </div>
        </div>

        <div className="glass rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
          <p className="mb-4">
            Your privacy is our top priority. Here&apos;s what that means:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>No Data Collection:</strong> We never see, store, or process your content</li>
            <li><strong>Client-Side Only:</strong> All conversion happens in your browser</li>
            <li><strong>No AI Training:</strong> Your content is never used to train AI models</li>
            <li><strong>No Cookies:</strong> We don&apos;t use tracking cookies</li>
            <li><strong>No Analytics:</strong> We don&apos;t track your usage (unless you enable optional analytics)</li>
            <li><strong>Open Source:</strong> Code is available for audit (GPL license)</li>
          </ul>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function SyntaxSection({
  title,
  description,
  example,
}: {
  title: string;
  description: string;
  example: string;
}) {
  return (
    <div className="border-b border-[var(--border)] pb-6 last:border-0">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm opacity-80 mb-3">{description}</p>
      <pre className="bg-[var(--card)] p-4 rounded-lg overflow-x-auto text-sm font-mono">
        <code>{example}</code>
      </pre>
    </div>
  );
}

function ExportCard({
  format,
  description,
  icon,
}: {
  format: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="border border-[var(--border)] rounded-lg p-4">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold mb-1">{format}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}
