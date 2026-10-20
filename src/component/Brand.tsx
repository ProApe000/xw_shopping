export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        ✳
      </span>
      <span>
        nest <span className="brand-amp">&</span> nomad
        <span className="brand-period">.</span>
      </span>
    </span>
  );
}
