import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fff",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="28" fill="#000" />
          <rect x="13" y="18" width="11" height="16" rx="5.5" fill="#fff" />
          <rect x="32" y="18" width="11" height="16" rx="5.5" fill="#fff" />
        </svg>
      </div>
    ),
    size,
  );
}
