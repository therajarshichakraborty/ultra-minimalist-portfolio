import type { Day } from "@/lib/activity";

const width = 520;
const height = 180;
const pad = { top: 12, right: 8, bottom: 24, left: 30 };

function smooth(points: [number, number][]) {
  if (points.length < 2) return "";
  let path = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[Math.max(0, i - 1)];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = points[Math.min(points.length - 1, i + 2)];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = Math.min(height - pad.bottom, y1 + (y2 - y0) / 6);
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = Math.min(height - pad.bottom, y2 - (y3 - y1) / 6);
    path += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  return path;
}

function ceiling(value: number) {
  if (value <= 4) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  return Math.ceil(value / magnitude) * magnitude;
}

export function ActivityChart({ days }: { days: Day[] }) {
  const recent = days.slice(-31);
  if (recent.length < 2) return null;
  const top = ceiling(Math.max(...recent.map((day) => day.count)));
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const points = recent.map(
    (day, index) =>
      [pad.left + (index / (recent.length - 1)) * plotWidth, pad.top + plotHeight - (day.count / top) * plotHeight] as [
        number,
        number,
      ],
  );
  const line = smooth(points);
  const baseline = pad.top + plotHeight;
  const area = `${line} L${points[points.length - 1][0]},${baseline} L${points[0][0]},${baseline} Z`;
  const ticks = [0, top / 2, top];
  const peak = recent.reduce((best, day, index) => (day.count > recent[best].count ? index : best), 0);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`contributions over the last ${recent.length} days, peaking at ${recent[peak].count}`}
      className="activity-chart block h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id="activity-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--ink)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((tick) => {
        const y = pad.top + plotHeight - (tick / top) * plotHeight;
        return (
          <g key={tick}>
            <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="var(--line)" strokeDasharray="2 4" />
            <text x={pad.left - 8} y={y + 3.5} textAnchor="end" className="fill-muted text-[10px] tabular-nums">
              {Math.round(tick)}
            </text>
          </g>
        );
      })}
      {recent.map((day, index) =>
        index % 5 === 0 || index === recent.length - 1 ? (
          <text
            key={day.date}
            x={points[index][0]}
            y={height - 6}
            textAnchor="middle"
            className="fill-muted text-[10px] tabular-nums"
          >
            {Number(day.date.slice(8, 10))}
          </text>
        ) : null,
      )}
      <path d={area} fill="url(#activity-fill)" className="activity-area" />
      <path
        d={line}
        pathLength={1}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="activity-line"
      />
      {points.map(([x, y], index) => (
        <circle key={recent[index].date} cx={x} cy={y} r={index === peak ? 3.5 : 2} fill="var(--bg)" stroke="var(--ink)" strokeWidth="1.25">
          <title>{`${recent[index].count} on ${recent[index].date}`}</title>
        </circle>
      ))}
    </svg>
  );
}
