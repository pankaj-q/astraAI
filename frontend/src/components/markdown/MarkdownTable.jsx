function MarkdownTable({ children }) {
  return (
    <div className="my-3 w-full overflow-x-auto rounded-lg border border-[#252A32]">
      <table className="w-full min-w-full border-collapse text-sm" style={{ tableLayout: "auto" }}>
        {children}
      </table>
    </div>
  );
}

export default MarkdownTable;
