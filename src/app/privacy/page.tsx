import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Lock, EyeOff, Database, Brain, Server, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Our privacy-first commitment: no data collection, no storage, no AI training. Learn how we keep your content completely private.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-aurora">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
            <Shield className="text-green-600 dark:text-green-400" size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            Your content is yours alone. We don&apos;t see it, store it, or use it. Ever.
          </p>
        </div>

        {/* Privacy Promise Banner */}
        <div className="glass rounded-xl p-8 mb-8 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-900/10">
          <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-400">
            Our Privacy Promise
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            Whatever you write, paste, or convert on this page is your own private and personal information. 
            <strong className="text-green-700 dark:text-green-400">
              {" "}We will not train on it, we will not use it for AI training, we will not utilize it, 
              it&apos;s none of our business, and we will never touch it, retain it, or save it.
            </strong>
          </p>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle size={20} />
            <span className="font-medium">Last updated: April 2026</span>
          </div>
        </div>

        {/* Key Privacy Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <PrivacyFeature
            icon={<EyeOff size={24} />}
            title="Zero Visibility"
            description="We never see your content. All processing happens in your browser - your content never reaches our servers."
          />
          <PrivacyFeature
            icon={<Database size={24} />}
            title="Zero Storage"
            description="We don't store, log, or retain any of your content. Everything is temporary and disappears when you close the page."
          />
          <PrivacyFeature
            icon={<Brain size={24} />}
            title="Zero AI Training"
            description="Your content is NEVER used to train AI models. We don't analyze or process your data for any purpose."
          />
          <PrivacyFeature
            icon={<Server size={24} />}
            title="Client-Side Only"
            description="100% client-side processing. Our servers only serve the application code - they never process your content."
          />
        </div>

        {/* Detailed Policy */}
        <div className="glass rounded-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Do NOT Collect</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                <span>Content you write, paste, or convert</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                <span>Files you upload</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                <span>Your IP address</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                <span>Browser or device information</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                <span>Usage statistics or analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-green-500 mt-1 shrink-0" size={18} />
                <span>Cookies or tracking data</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <p className="opacity-80 leading-relaxed mb-4">
              MD Converter is designed as a purely client-side application. When you visit our website:
            </p>
            <ol className="list-decimal list-inside space-y-2 ml-4 opacity-80">
              <li>Your browser downloads our application code</li>
              <li>All Markdown processing happens in your browser using JavaScript</li>
              <li>Your content stays in your browser&apos;s memory</li>
              <li>When you close the tab, everything is gone</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
            <p className="opacity-80 leading-relaxed">
              We use the following open-source libraries for client-side processing:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 opacity-80 mt-2">
              <li><strong>marked</strong> - Markdown parser</li>
              <li><strong>turndown</strong> - HTML to Markdown converter</li>
              <li><strong>DOMPurify</strong> - XSS sanitizer</li>
            </ul>
            <p className="opacity-80 leading-relaxed mt-4">
              These libraries run entirely in your browser and do not communicate with external servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Future Advertising</h2>
            <p className="opacity-80 leading-relaxed">
              In the future, we may display non-intrusive advertisements to support the development 
              of this free tool. Any ads will be served through standard ad networks and will:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 opacity-80 mt-2">
              <li>Not access or track your content</li>
              <li>Not collect personal information</li>
              <li>Be clearly distinguishable from the tool interface</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Open Source</h2>
            <p className="opacity-80 leading-relaxed">
              This project is open source under the GPL-3.0 license. You can verify our privacy claims 
              by reviewing the source code. When the repository is made public, you&apos;ll be able to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 opacity-80 mt-2">
              <li>Audit the code yourself</li>
              <li>Self-host your own instance</li>
              <li>Contribute improvements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="opacity-80 leading-relaxed">
              If you have any questions about this Privacy Policy, please visit our forum at{" "}
              <a
                href="https://www.moteklab.com/forum"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B91C1C] hover:underline"
              >
                https://www.moteklab.com/forum
              </a>
              {" "}or contact us through our main website at{" "}
              <a
                href="https://www.moteklab.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B91C1C] hover:underline"
              >
                https://www.moteklab.com
              </a>.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function PrivacyFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}
