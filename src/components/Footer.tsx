import Link from "next/link";
import { Github, Twitter, MessageSquare, ExternalLink } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B91C1C] to-[#7F1D1D] flex items-center justify-center text-white font-bold">
                M
              </div>
              <span className="font-bold">MD Converter</span>
            </div>
            <p className="text-sm opacity-80 mb-4 max-w-md">
              Free, private, and fast bidirectional Markdown to RichText converter. 
              Built with ❤️ by{" "}
              <a
                href="https://www.moteklab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B91C1C] hover:underline"
              >
                MotekLab
              </a>.
            </p>
            <p className="text-sm opacity-80 max-w-md">
              Also check out{" "}
              <a
                href="https://fahhim.moteklab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B91C1C] hover:underline"
              >
                Fahhim
              </a>
              {" "}- Our AI-powered structured prompt generator.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Converter
                </Link>
              </li>
              <li>
                <Link href="/help/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Help
                </Link>
              </li>
              <li>
                <Link href="/faq/" className="opacity-80 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://github.github.com/gfm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                >
                  GFM Spec
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.moteklab.com/forum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                >
                  <MessageSquare size={14} />
                  Forum
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.moteklab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                >
                  MotekLab
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a
                  href="https://fahhim.moteklab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
                >
                  Fahhim
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--border)] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70">
            © {currentYear} MotekLab. Licensed under GPL-3.0.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy/"
              className="text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              Privacy Policy
            </Link>
            <span className="opacity-30">|</span>
            <a
              href="https://github.com/motaz-hefny/MarkDown-to-Formatted-Text"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com/moteklab"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
