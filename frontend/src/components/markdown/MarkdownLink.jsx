import { ExternalLink } from "lucide-react";

function MarkdownLink({ href, children, ...props }) {
  const isExternal = /^https?:\/\//.test(href || "");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1 text-[#5B8CFF] hover:underline break-all"
      {...props}
    >
      {children}
      <ExternalLink size={12} strokeWidth={2} />
    </a>
  );
}

export default MarkdownLink;
