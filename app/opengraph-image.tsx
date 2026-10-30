import { ImageResponse } from "next/og";

export const alt = "Ajoy Das — Software Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 76px",
          color: "#f8fafc",
          background:
            "linear-gradient(125deg, #0b1220 0%, #111c35 58%, #173c87 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#bfdbfe",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#60a5fa",
            }}
          />
          Developer portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            Ajoy Das
          </div>
          <div style={{ color: "#bfdbfe", fontSize: 38 }}>
            Software Developer
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 25 }}>
            Web applications · Developer tools · Experiments
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(191, 219, 254, 0.3)",
            paddingTop: 22,
            color: "#dbeafe",
            fontSize: 22,
          }}
        >
          <span>codewithajoydas.live</span>
          <span>Assam, India</span>
        </div>
      </div>
    ),
    size,
  );
}
