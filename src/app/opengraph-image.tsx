import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "InternPilot — AI Tech Internship & Scholarship Hub for Uganda";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#080D0B",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.18) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(5, 150, 105, 0.15) 0%, transparent 40%)",
          padding: "60px 70px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#FFFFFF",
        }}
      >
        {/* Top Brand Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #10B981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000000",
                fontSize: "28px",
                fontWeight: "900",
              }}
            >
              🧭
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{ fontSize: "32px", fontWeight: "800", letterSpacing: "-0.5px" }}>
                InternPilot
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  color: "#34D399",
                  padding: "4px 10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                }}
              >
                UGANDA
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              color: "#34D399",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(16, 185, 129, 0.25)",
            }}
          >
            <span>✨ Powered by Gemini 2.5 Flash</span>
          </div>
        </div>

        {/* Center Main Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "900px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "900",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
              background: "linear-gradient(to right, #FFFFFF, #E6FBF2, #A7F3D0)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Launch Your Tech Career in Uganda
          </h1>
          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.4,
              color: "#9CA3AF",
              margin: 0,
            }}
          >
            Verified local tech internships, scholarships, and deadline tracking for university students across Makerere, Kyambogo, MUST & more.
          </p>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                color: "#E5E7EB",
              }}
            >
              <span style={{ color: "#10B981" }}>✓</span> Verified Opportunities
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                color: "#E5E7EB",
              }}
            >
              <span style={{ color: "#10B981" }}>✓</span> AI Skill Matching
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "16px",
                color: "#E5E7EB",
              }}
            >
              <span style={{ color: "#10B981" }}>✓</span> WhatsApp Post Extractor
            </div>
          </div>

          <div
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#10B981",
            }}
          >
            internpilot.ug
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
