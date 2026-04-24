import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about the Markdown to RichText converter. Privacy, features, and usage explained.",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "Is this tool completely free?",
      answer:
        "Yes! MD Converter is 100% free to use. There are no hidden fees, no registration required, and no usage limits. In the future, we may add non-intrusive advertisements to support development, but the core functionality will always remain free.",
    },
    {
      question: "Does this tool store or upload my content?",
      answer:
        "Absolutely not. All processing happens directly in your browser using client-side JavaScript. Your content never leaves your device, never gets uploaded to any server, and is never stored anywhere. We cannot see your content even if we wanted to.",
    },
    {
      question: "Will my content be used to train AI models?",
      answer:
        "Never. We do not use your content for AI training, machine learning, or any data analysis purposes. Your content is yours alone - we don't touch it, analyze it, or retain it in any way.",
    },
    {
      question: "Which Markdown syntax is supported?",
      answer:
        "We support full GitHub Flavored Markdown (GFM), including: Headers (H1-H6), Bold & Italic text, Ordered & Unordered lists, Nested lists, Links & Images, Code blocks (fenced and inline), Tables, Task lists, Blockquotes, Horizontal rules, and Strikethrough text.",
    },
    {
      question: "Can I convert RichText back to Markdown?",
      answer:
        "Yes! Our converter is bidirectional. You can paste formatted text into the RichText panel and it will automatically convert back to Markdown. You can also edit the RichText directly and see the Markdown update in real-time.",
    },
    {
      question: "Which applications support the copied rich text?",
      answer:
        "The copied rich text works with most modern applications including: Microsoft Word, Google Docs, Apple Pages, Notion, Slack, Discord, Gmail, Outlook, and many other email clients and document editors.",
    },
    {
      question: "Why does formatting look different in Word or Notion?",
      answer:
        "Different applications have varying levels of support for rich text formatting. While we generate clean HTML, the receiving application may interpret styles differently. Basic formatting (bold, italic, lists, headings) should work consistently across all apps.",
    },
    {
      question: "Can I use this converter offline?",
      answer:
        "Once the page is loaded, it works without an internet connection. However, you need to be online to initially load the page. We're considering making this a Progressive Web App (PWA) in the future for full offline support.",
    },
    {
      question: "Is it safe for confidential or work-related documents?",
      answer:
        "Yes, because all processing happens in your browser. Your documents never travel over the internet to our servers. However, as with any web-based tool, you should evaluate whether it meets your organization's security requirements.",
    },
    {
      question: "What file formats can I export to?",
      answer:
        "Currently, you can export to: HTML (clean HTML with inline styles), Markdown (.md files), and Rich Text (copy to clipboard for pasting into other apps). We plan to add Word (.docx) and PDF export options soon.",
    },
    {
      question: "How can I report a bug or suggest a feature?",
      answer:
        "Please visit our forum at https://www.moteklab.com/forum and post in the MD Converter section. We actively monitor feedback and appreciate your suggestions for improving the tool.",
    },
    {
      question: "Is the code open source?",
      answer:
        "Yes, the project is licensed under GPL-3.0. While the repository is currently private, we plan to make it public in the future so others can learn from it, contribute, or self-host their own instance.",
    },
    {
      question: "Does it support RTL (Right-to-Left) languages?",
      answer:
        "Yes! We fully support RTL languages including Arabic, Hebrew, and Persian. The interface automatically adapts to RTL when you select Arabic (\u0627\u0644\u0639\u0631\u0628\u064a\u0629) from the language options.",
    },
    {
      question: "Can I upload Markdown files directly?",
      answer:
        "Yes, you can upload .md or .markdown files by clicking the 'Upload .md' button or by dragging and dropping a file onto the Markdown editor area.",
    },
    {
      question: "What's the maximum file size I can convert?",
      answer:
        "There's no hard limit, but very large files (10MB+) may cause performance issues in your browser. For best results, we recommend working with files under 5MB.",
    },
    {
      question: "Why do I see weird CSS code when pasting from Word or LibreOffice?",
      answer:
        "Microsoft Word and LibreOffice Writer embed internal CSS styles in copied content to preserve formatting. This can appear as text like 'p.compact { margin-top: 0.03in... }' in your Markdown. This is a known issue we're actively working to fix. In the meantime, simply delete the CSS-looking code from the Markdown panel - your document will convert perfectly and formatting will be preserved.",
    },
    {
      question: "Can I upload RTF files?",
      answer:
        "Yes! You can upload .rtf files using the 'Upload .rtf' button in the Rich Text panel toolbar. The converter will extract the text content and convert it to Markdown. You can also export your converted content as RTF using the 'Export RTF' button.",
    },
  ];

  return (
    <main className="min-h-screen bg-aurora">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-center opacity-80 mb-12">
          Find answers to common questions about MD Converter
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              index={index + 1}
            />
          ))}
        </div>

        <div className="glass rounded-xl p-8 mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Still have questions?
          </h2>
          <p className="opacity-80 mb-6">
            Visit our community forum to get help from the team and other users.
          </p>
          <a
            href="https://www.moteklab.com/forum"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#B91C1C] text-white hover:bg-[#991B1B] transition-colors"
          >
            Visit Forum
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  return (
    <details className="glass rounded-xl overflow-hidden group">
      <summary className="p-6 cursor-pointer flex items-start gap-4 list-none hover:bg-[var(--card)]/50 transition-colors">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center font-semibold text-sm">
          {index}
        </span>
        <span className="font-semibold text-lg flex-1">{question}</span>
        <span className="text-2xl opacity-50 group-open:rotate-180 transition-transform">
          \u25bc
        </span>
      </summary>
      <div className="px-6 pb-6 pl-18">
        <p className="opacity-80 leading-relaxed pl-12">{answer}</p>
      </div>
    </details>
  );
}
