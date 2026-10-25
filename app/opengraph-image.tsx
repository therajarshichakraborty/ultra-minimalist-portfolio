import { ImageResponse } from "next/og";
import { domain, site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 120px",
          gap: 96,
          background: "#fff",
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.09) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      >
        <svg width="240" height="240" viewBox="0 0 200 200">
          <path fill="#000" d="M86 36c0-7 6-12 14-12s14 5 14 12l-3 44c-.5 6-5 10-11 10s-10.5-4-11-10z" />
          <circle cx="100" cy="138" r="38" fill="#000" />
          <g transform="rotate(-10 100 136)">
            <rect x="82" y="122" width="12" height="27" rx="6" fill="#fff" />
            <rect x="105" y="122" width="12" height="27" rx="6" fill="#fff" />
          </g>
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, background: "#fff", padding: "16px 0" }}>
          <div style={{ display: "flex", fontSize: 60, letterSpacing: -2, color: "#000" }}>
            <span>hi i&apos;m&nbsp;</span>
            <span style={{ fontWeight: 700 }}>{site.name}</span>
          </div>
          <div style={{ fontSize: 40, color: "#696969", letterSpacing: -1 }}>{site.role}</div>
          <div style={{ fontSize: 24, color: "#9a9a9a", marginTop: 36 }}>{domain()}</div>
        </div>
      </div>
    ),
    size,
  );
}
