function MarkdownLink({ href, children, ...props }) {
  const isExternal = /^https?:\/\//.test(href || "");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-[#5B8CFF] hover:underline break-all"
      {...props}
    >
      {children}
    </a>
  );
}

export default MarkdownLink;
