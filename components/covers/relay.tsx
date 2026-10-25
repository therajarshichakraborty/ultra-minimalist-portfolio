import { useId } from "react";

const rows = [
  { y: 138, color: "#ff453a", width: 46, active: true },
  { y: 166, color: "#ffb020", width: 38 },
  { y: 194, color: "#34c759", width: 50 },
  { y: 222, color: "#ffb020", width: 34 },
  { y: 250, color: "#34c759", width: 42 },
];

const markers = [
  { x: 196, y: 150, color: "#ff453a", pulse: true },
  { x: 246, y: 176, color: "#ffb020" },
  { x: 288, y: 140, color: "#34c759" },
  { x: 222, y: 228, color: "#34c759" },
  { x: 312, y: 212, color: "#ffb020" },
  { x: 270, y: 262, color: "#34c759" },
  { x: 176, y: 262, color: "#ffb020" },
];

export function RelayCover() {
  const id = useId();
  const shadow = `${id}-shadow`;
  const clip = `${id}-clip`;

  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" className="absolute inset-0 size-full">
      <defs>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000" floodOpacity="0.16" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.12" />
        </filter>
        <clipPath id={clip}>
          <rect x="54" y="110" width="292" height="182" rx="8" />
        </clipPath>
      </defs>
      <g filter={`url(#${shadow})`}>
        <rect x="46" y="102" width="308" height="198" rx="15" fill="#161618" />
      </g>
      <rect x="54" y="110" width="292" height="182" rx="8" fill="#fff" />
      <g clipPath={`url(#${clip})`}>
        <rect x="146" y="110" width="200" height="182" fill="#eceef1" />
        <g stroke="#fff" strokeWidth="5">
          <path d="M146 158h200M146 204h200M146 250h200M188 110v182M236 110v182M284 110v182M326 110v182" />
        </g>
        <g fill="#e2e5e9">
          <rect x="196" y="118" width="32" height="32" rx="2" />
          <rect x="294" y="166" width="24" height="30" rx="2" />
          <rect x="154" y="212" width="26" height="30" rx="2" />
          <rect x="244" y="258" width="32" height="28" rx="2" />
        </g>
        <path d="M150 300c40-30 70-34 112-58s58-56 92-70" stroke="#c9d6f2" strokeWidth="6" fill="none" />
        {markers.map((marker) => (
          <g key={`${marker.x}-${marker.y}`}>
            {marker.pulse ? (
              <circle className="cover-pulse" cx={marker.x} cy={marker.y} r="9" fill={marker.color} opacity="0.3" />
            ) : null}
            <circle cx={marker.x} cy={marker.y} r="5" fill={marker.color} stroke="#fff" strokeWidth="2" />
          </g>
        ))}
        <rect x="54" y="110" width="92" height="182" fill="#fff" />
        <path d="M146 110v182" stroke="#e6e6e6" />
        <rect x="64" y="120" width="34" height="5" rx="2.5" fill="#1c1c1e" />
        <rect x="118" y="119" width="18" height="7" rx="3.5" fill="#f0f0f0" />
        {rows.map((row) => (
          <g key={row.y}>
            {row.active ? <rect x="58" y={row.y - 9} width="84" height="24" rx="5" fill="#f2f2f4" /> : null}
            <circle cx="68" cy={row.y + 3} r="3.5" fill={row.color} />
            <rect x="78" y={row.y - 1} width={row.width} height="4" rx="2" fill="#2c2c2e" />
            <rect x="78" y={row.y + 6} width={row.width - 14} height="3" rx="1.5" fill="#c7c7cc" />
          </g>
        ))}
        <rect x="62" y="272" width="76" height="13" rx="4" fill="#0a84ff" />
        <rect x="86" y="277" width="28" height="3" rx="1.5" fill="#fff" />
        <rect x="318" y="118" width="20" height="20" rx="5" fill="#fff" />
        <path d="M324 128h8M328 124v8" stroke="#1c1c1e" strokeWidth="1.6" strokeLinecap="round" />
      </g>
      <circle cx="200" cy="106" r="1.6" fill="#3a3a3c" />
    </svg>
  );
}
