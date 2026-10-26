import type { Day } from "@/lib/activity";

const width = 720;
const height = 250;
const pad = { top: 14, right: 12, bottom: 48, left: 56 };

function smooth(points: [number, number][], floor: number) {
  if (points.length < 2) return "";
  let path = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[Math.max(0, i - 1)];
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const [x3, y3] = points[Math.min(points.length - 1, i + 2)];
    const c1y = Math.min(floor, y1 + (y2 - y0) / 6);
    const c2y = Math.min(floor, y2 - (y3 - y1) / 6);
    path += ` C${(x1 + (x2 - x0) / 6).toFixed(1)},${c1y.toFixed(1)} ${(x2 - (x3 - x1) / 6).toFixed(1)},${c2y.toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  return path;
}

function nice(value: number) {
  if (value <= 5) return 5;
  const step = 10 ** Math.floor(Math.log10(value / 5));
  const candidates = [1, 2, 4, 5, 10].map((factor) => factor * step);
  const unit = candidates.find((candidate) => candidate * 5 >= value) ?? candidates[candidates.length - 1];
  return unit * 5;
}

export function ActivityChart({ days, label = "Contributions" }: { days: Day[]; label?: string }) {
  const recent = days.slice(-31);
  if (recent.length < 2) return null;

  const top = nice(Math.max(...recent.map((day) => day.count)));
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const floor = pad.top + plotHeight;
  const x = (index: number) => pad.left + (index / (recent.length - 1)) * plotWidth;
  const y = (count: number) => pad.top + plotHeight - (count / top) * plotHeight;
  const points = recent.map((day, index) => [x(index), y(day.count)] as [number, number]);
  const ticks = Array.from({ length: 6 }, (_, index) => (top / 5) * index);
  const peak = recent.reduce((best, day, index) => (day.count > recent[best].count ? index : best), 0);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${label} over the last ${recent.length} days, peaking at ${recent[peak].count} on ${recent[peak].date}`}
      className="activity-chart block h-auto w-full min-w-[560px] overflow-visible"
    >
      <defs>
        <linearGradient
          id="activity-stroke"
          x1={pad.left}
          x2={width - pad.right}
          y1="0"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="45%" stopColor="#ec4899" />
          <stop offset="78%" stopColor="#c026d3" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} className="chart-grid" />
          <text x={pad.left - 10} y={y(tick) + 4} textAnchor="end" className="chart-text">
            {Math.round(tick)}
          </text>
        </g>
      ))}
      {recent.map((day, index) => (
        <g key={day.date}>
          <line x1={x(index)} x2={x(index)} y1={pad.top} y2={floor} className="chart-grid" />
          {index % 2 === 0 || index === recent.length - 1 ? (
            <text x={x(index)} y={floor + 18} textAnchor="middle" className="chart-text">
              {Number(day.date.slice(8, 10))}
            </text>
          ) : null}
        </g>
      ))}
      <line x1={pad.left} x2={width - pad.right} y1={floor} y2={floor} className="chart-axis" />
      <line x1={pad.left} x2={pad.left} y1={pad.top} y2={floor} className="chart-axis" />
      <text x={pad.left + plotWidth / 2} y={height - 4} textAnchor="middle" className="chart-title">
        Days
      </text>
      <text
        transform={`translate(14 ${pad.top + plotHeight / 2}) rotate(-90)`}
        textAnchor="middle"
        className="chart-title"
      >
        {label}
      </text>
      <path
        d={smooth(points, floor)}
        pathLength={1}
        fill="none"
        stroke="url(#activity-stroke)"
        strokeWidth="2.25"
        strokeLinecap="round"
        className="activity-line"
      />
      {points.map(([cx, cy], index) => (
        <circle
          key={recent[index].date}
          cx={cx}
          cy={cy}
          r={index === peak ? 3.5 : 2.5}
          className="chart-dot"
          style={{ animationDelay: `${600 + index * 25}ms` }}
        >
          <title>{`${recent[index].count} on ${recent[index].date}`}</title>
        </circle>
      ))}
    </svg>
  );
}
