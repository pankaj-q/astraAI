function MarkdownTable({ children }) {
  return (
    <div className="my-3 overflow-x-auto rounded-lg border border-[#252A32]">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export default MarkdownTable;
