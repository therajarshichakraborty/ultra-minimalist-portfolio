import { useId } from "react";

export function KitCover() {
  const id = useId();
  const shadow = `${id}-shadow`;

  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" className="absolute inset-0 size-full">
      <defs>
        <filter id={shadow} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#000" floodOpacity="0.12" />
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.1" />
        </filter>
      </defs>
      <g filter={`url(#${shadow})`}>
        <rect x="56" y="68" width="288" height="264" rx="10" fill="#fff" />
      </g>
      <path d="M56 98h288" stroke="#ececec" />
      <g fill="#dcdcdc">
        <circle cx="72" cy="83" r="4" />
        <circle cx="85" cy="83" r="4" />
        <circle cx="98" cy="83" r="4" />
      </g>
      <rect x="150" y="78" width="100" height="10" rx="5" fill="#f2f2f2" />
      <rect x="208" y="114" width="118" height="30" rx="12" fill="#1c1c1e" />
      <rect x="220" y="124" width="70" height="4" rx="2" fill="#fff" opacity="0.9" />
      <rect x="220" y="132" width="46" height="4" rx="2" fill="#fff" opacity="0.55" />
      <circle cx="82" cy="166" r="9" fill="#1c1c1e" />
      <g fill="#fff">
        <rect x="77.5" y="162" width="3" height="7" rx="1.5" />
        <rect x="83.5" y="162" width="3" height="7" rx="1.5" />
      </g>
      <g fill="#3a3a3c">
        <rect x="100" y="158" width="190" height="5" rx="2.5" />
        <rect x="100" y="170" width="164" height="5" rx="2.5" />
        <rect x="100" y="182" width="120" height="5" rx="2.5" />
      </g>
      <rect className="cover-caret" x="224" y="180" width="2" height="9" rx="1" fill="#1c1c1e" />
      <rect x="100" y="204" width="226" height="64" rx="8" fill="#fafafa" stroke="#ececec" />
      <rect x="112" y="216" width="10" height="10" rx="3" fill="#ffb020" />
      <rect x="130" y="218" width="86" height="5" rx="2.5" fill="#2c2c2e" />
      <rect x="112" y="232" width="150" height="4" rx="2" fill="#c7c7cc" />
      <rect x="112" y="246" width="52" height="14" rx="4" fill="#1c1c1e" />
      <rect x="124" y="251" width="28" height="4" rx="2" fill="#fff" />
      <rect x="170" y="246" width="40" height="14" rx="4" fill="#f0f0f0" />
      <rect x="180" y="251" width="20" height="4" rx="2" fill="#8e8e93" />
      <rect x="72" y="290" width="256" height="28" rx="10" fill="#fff" stroke="#e5e5e5" />
      <rect x="84" y="301" width="96" height="5" rx="2.5" fill="#d1d1d6" />
      <circle cx="312" cy="304" r="8" fill="#1c1c1e" />
      <path d="M312 308v-7M309 303.5l3-3 3 3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
