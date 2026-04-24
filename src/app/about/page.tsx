import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Code, Users, Globe, Sparkles, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about MD Converter - a free, privacy-first Markdown to RichText converter by MotekLab.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-aurora">
      <Header />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#7F1D1D] flex items-center justify-center mx-auto mb-4 text-white">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4">About MD Converter</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            A free, privacy-first tool built with love by{" "}
            <a
              href="https://www.moteklab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B91C1C] hover:underline"
            >
              MotekLab
            </a>
          </p>
        </div>

        {/* Mission */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed opacity-90">
            We believe that converting between Markdown and RichText should be simple, 
            fast, and completely private. Too many online tools require you to upload 
            your content to their servers, creating privacy risks and delays. MD Converter 
            was built to solve this: a tool that works entirely in your browser, 
            keeping your content truly yours.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ValueCard
            icon={<Heart size={24} />}
            title="Privacy First"
            description="We don't see, store, or use your content. All processing happens in your browser."
          />
          <ValueCard
            icon={<Code size={24} />}
            title="Open Source"
            description="Built on open-source technologies. We believe in transparency and community."
          />
          <ValueCard
            icon={<Users size={24} />}
            title="Community Driven"
            description="Features and improvements are guided by user feedback through our forum."
          />
          <ValueCard
            icon={<Globe size={24} />}
            title="Global Access"
            description="Free for everyone, everywhere. Supporting multiple languages including RTL scripts."
          />
        </div>

        {/* Technology */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Built With Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TechBadge name="Next.js 16" description="React Framework" />
            <TechBadge name="TypeScript" description="Type Safety" />
            <TechBadge name="Tailwind CSS" description="Styling" />
            <TechBadge name="Marked" description="Markdown Parser" />
            <TechBadge name="Turndown" description="HTML to MD" />
            <TechBadge name="GFM" description="GitHub Flavored" />
            <TechBadge name="Client-Side" description="100% Private" />
            <TechBadge name="GPL-3.0" description="Open Source" />
          </div>
        </div>

        {/* GFM Support */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">GitHub Flavored Markdown</h2>
          <p className="opacity-80 leading-relaxed mb-4">
            We proudly support the full{" "}
            <a
              href="https://github.github.com/gfm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B91C1C] hover:underline"
            >
              GitHub Flavored Markdown Spec
            </a>
            , which includes:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <FeatureTag text="Tables" />
            <FeatureTag text="Task Lists" />
            <FeatureTag text="Strikethrough" />
            <FeatureTag text="Autolinks" />
            <FeatureTag text="Code Blocks" />
            <FeatureTag text="Emoji Shortcodes" />
          </div>
        </div>

        {/* Inspiration */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Inspiration & Credits</h2>
          <p className="opacity-80 leading-relaxed mb-4">
            This project was inspired by and built upon ideas from these excellent open-source projects:
          </p>
          <ul className="space-y-2 opacity-80">
            <li>
              <a
                href="https://github.com/elliothux/MD2RichText"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B91C1C] hover:underline"
              >
                MD2RichText
              </a>
              {" "}- A markdown to rich text converter
            </li>
            <li>
              <a
                href="https://github.com/dreeves/eat-the-richtext"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B91C1C] hover:underline"
              >
                eat-the-richtext
              </a>
              {" "}- Rich text conversion utilities
            </li>
            <li>
              <a
                href="https://github.com/vitorgalvao/markdown-transform-workflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B91C1C] hover:underline"
              >
                markdown-transform-workflow
              </a>
              {" "}- Markdown transformation workflows
            </li>
          </ul>
        </div>

        {/* Future */}
        <div className="glass rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Roadmap & Future Plans</h2>
          <div className="space-y-3">
            <RoadmapItem status="done" text="Core Markdown \u2194 RichText conversion" />
            <RoadmapItem status="done" text="File upload (drag & drop)" />
            <RoadmapItem status="done" text="HTML & Markdown export" />
            <RoadmapItem status="done" text="Multi-language support (EN, AR)" />
            <RoadmapItem status="planned" text="Word (.docx) export" />
            <RoadmapItem status="planned" text="PDF export" />
            <RoadmapItem status="planned" text="PWA offline support" />
            <RoadmapItem status="planned" text="Custom themes" />
            <RoadmapItem status="planned" text="Plugin system" />
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
          <p className="opacity-80 mb-6">
            Have suggestions, found a bug, or just want to say hi? Visit our forum!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://www.moteklab.com/forum"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#B91C1C] text-white hover:bg-[#991B1B] transition-colors"
            >
              Visit Forum
            </a>
            <a
              href="https://www.moteklab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] transition-colors"
            >
              <Globe size={18} />
              MotekLab
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ValueCard({
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
      <div className="w-12 h-12 rounded-lg bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}

function TechBadge({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--card)] rounded-lg p-3 text-center">
      <div className="font-semibold text-sm">{name}</div>
      <div className="text-xs opacity-70">{description}</div>
    </div>
  );
}

function FeatureTag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] text-sm">
      {text}
    </span>
  );
}

function RoadmapItem({
  status,
  text,
}: {
  status: "done" | "planned" | "wip";
  text: string;
}) {
  const statusClasses = {
    done: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
    planned: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    wip: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
  };

  const statusLabels = {
    done: "\u2713 Done",
    planned: "\u25cb Planned",
    wip: "\u25d1 In Progress",
  };

  return (
    <div className="flex items-center justify-between p-3 bg-[var(--card)] rounded-lg">
      <span>{text}</span>
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status]}`}>
        {statusLabels[status]}
      </span>
    </div>
  );
}
