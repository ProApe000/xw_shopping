import { useState } from "react";
import { ImageOff } from "lucide-react";
export function ProductImage({
  image,
  alt,
  className = "",
  eager = false,
}: {
  image: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`image-fallback ${className}`}>
      <ImageOff size={28} />
      <span>{alt}</span>
    </div>
  ) : (
    <img
      className={className}
      src={`/images/${image}.jpg`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}
