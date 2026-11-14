import { useState } from "react";

function ZoomableImage({ src, alt }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt || "image"}
        onClick={() => setOpen(true)}
        className="h-24 w-24 cursor-pointer rounded-lg object-cover transition hover:opacity-80"
      />
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt || "image"}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}

export default ZoomableImage;
