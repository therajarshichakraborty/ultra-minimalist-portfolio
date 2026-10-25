import { useId } from "react";

const tasks = [
  { y: 236, width: 62, done: true },
  { y: 262, width: 54 },
  { y: 288, width: 70 },
  { y: 314, width: 46 },
];

export function TideCover() {
  const id = useId();
  const shadow = `${id}-shadow`;
  const clip = `${id}-clip`;

  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" className="absolute inset-0 size-full">
      <defs>
        <filter id={shadow} x="-30%" y="-20%" width="160%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000" floodOpacity="0.16" />
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.12" />
        </filter>
        <clipPath id={clip}>
          <rect x="135" y="49" width="130" height="302" rx="21" />
        </clipPath>
      </defs>
      <g filter={`url(#${shadow})`}>
        <rect x="128" y="42" width="144" height="316" rx="28" fill="#161618" />
      </g>
      <rect x="135" y="49" width="130" height="302" rx="21" fill="#f6f6f8" />
      <g clipPath={`url(#${clip})`}>
        <rect x="181" y="56" width="38" height="11" rx="5.5" fill="#161618" />
        <rect x="147" y="84" width="40" height="6" rx="3" fill="#1c1c1e" />
        <rect x="147" y="96" width="60" height="4" rx="2" fill="#aeaeb2" />
        <rect x="145" y="112" width="110" height="96" rx="12" fill="#fff" />
        <circle cx="160" cy="127" r="4" fill="#ffb020" />
        <rect x="170" y="124" width="46" height="5" rx="2.5" fill="#1c1c1e" />
        <g transform="translate(200 168)">
          <circle r="28" fill="none" stroke="#efeff4" strokeWidth="1.5" />
          <circle r="18" fill="none" stroke="#efeff4" strokeWidth="1.5" />
          <circle r="8" fill="none" stroke="#efeff4" strokeWidth="1.5" />
          <path className="cover-sweep" d="M0 0L0 -28A28 28 0 0 1 24 -14z" fill="#ffb020" opacity="0.22" />
          <circle cx="12" cy="-10" r="3.5" fill="#ffb020" />
        </g>
        <rect x="147" y="220" width="54" height="5" rx="2.5" fill="#1c1c1e" />
        {tasks.map((task) => (
          <g key={task.y}>
            <rect x="145" y={task.y - 2} width="110" height="22" rx="7" fill="#fff" />
            {task.done ? (
              <g>
                <circle cx="157" cy={task.y + 9} r="5.5" fill="#1c1c1e" />
                <path
                  d={`M154.5 ${task.y + 9}l1.8 1.8 3.4-3.6`}
                  stroke="#fff"
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ) : (
              <circle cx="157" cy={task.y + 9} r="5" fill="none" stroke="#c7c7cc" strokeWidth="1.3" />
            )}
            <rect x="168" y={task.y + 7} width={task.width} height="4" rx="2" fill={task.done ? "#c7c7cc" : "#3a3a3c"} />
          </g>
        ))}
        <rect x="181" y="338" width="38" height="4" rx="2" fill="#1c1c1e" />
      </g>
    </svg>
  );
}
