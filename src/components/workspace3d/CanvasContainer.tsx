"use client";

import { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import OfficeScene from "./OfficeScene";
import InfoModal from "./InfoModal";

// Cinematic Time-of-Day Configurations
export interface TimeOfDay {
  name: string;
  icon: string;
  skyColor: string;
  sunColor: string;
  sunPosition: [number, number, number];
  sunIntensity: number;
  ambientIntensity: number;
  skyFillIntensity: number;
  skyFillColor: string;
  sunbeamColor: string;
  sunbeamOpacity: number;
  sunbeamAngle: number;
  dustOpacity: number;
  deskLampIntensity: number;
  accentDark: string;
  themeColor: string;
}

export const TIMES_OF_DAY: TimeOfDay[] = [
  {
    name: "Morning",
    icon: "☀️",
    skyColor: "#bae6fd", // Bright morning sky blue
    sunColor: "#fffbeb", // Warm cream sunlight
    sunPosition: [2, 5, -9],
    sunIntensity: 2.4,
    ambientIntensity: 0.7,
    skyFillIntensity: 0.45,
    skyFillColor: "#f0f4f8",
    sunbeamColor: "#fffbeb",
    sunbeamOpacity: 0.06,
    sunbeamAngle: 0.1,
    dustOpacity: 0.6,
    deskLampIntensity: 0, // off
    accentDark: "#0284c7", // dark cyan
    themeColor: "#38bdf8", // cyber cyan
  },
  {
    name: "Golden Hour",
    icon: "🌅",
    skyColor: "#fed7aa", // soft sunset orange
    sunColor: "#ffedd5", // amber sunlight
    sunPosition: [5, 2.5, -9.5], // low-angle sun
    sunIntensity: 2.8,
    ambientIntensity: 0.55,
    skyFillIntensity: 0.55,
    skyFillColor: "#ffedd5",
    sunbeamColor: "#ffedd5",
    sunbeamOpacity: 0.09,
    sunbeamAngle: 0.25,
    dustOpacity: 0.8,
    deskLampIntensity: 0, // off
    accentDark: "#c2410c", // dark orange
    themeColor: "#f97316", // orange
  },
  {
    name: "Twilight",
    icon: "🌆",
    skyColor: "#1e1b4b", // deep indigo / night sky
    sunColor: "#38bdf8", // faint cool moonlit glow
    sunPosition: [-3, 4, -8.5],
    sunIntensity: 0.35,
    ambientIntensity: 0.3,
    skyFillIntensity: 0.15,
    skyFillColor: "#1e293b",
    sunbeamColor: "#38bdf8",
    sunbeamOpacity: 0.015,
    sunbeamAngle: -0.15,
    dustOpacity: 0.2,
    deskLampIntensity: 7.5, // cozy yellow pointLight turns on
    accentDark: "#6d28d9", // dark violet
    themeColor: "#8b5cf6", // neon violet
  }
];

export default function CanvasContainer() {
  const [webglAvailable, setWebglAvailable] = useState<boolean | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [timeIndex, setTimeIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check WebGL availability and screen size on mount
  useEffect(() => {
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext && 
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    };
    setWebglAvailable(checkWebGL());

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cycle time of day
  const handleToggleLights = () => {
    setTimeIndex((prev) => (prev + 1) % TIMES_OF_DAY.length);
  };

  const activeTime = TIMES_OF_DAY[timeIndex];

  // Dynamically update CSS custom properties for HTML overlays to consume
  useEffect(() => {
    document.documentElement.style.setProperty("--workspace-theme-color", activeTime.themeColor);
    document.documentElement.style.setProperty("--workspace-accent-dark", activeTime.accentDark);
  }, [activeTime]);

  if (webglAvailable === false) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          padding: "2rem",
          color: "var(--text-1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "var(--text-0)", marginBottom: "1rem" }}>WebGL Not Supported</h2>
        <p style={{ maxWidth: "500px", marginBottom: "1.5rem" }}>
          Your browser or device doesn't support WebGL, which is required to render the 3D Digital Twin environment.
        </p>
        <a href="/" className="btn btn--primary">
          Return to Classic 2D Portfolio
        </a>
      </div>
    );
  }

  return (
    <div
      className="workspace-3d-active"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#f1f5f9",
        overflow: "hidden",
      }}
    >
      {/* 3D Canvas rendering */}
      <Canvas
        shadows={!isMobile} // Disable shadows on mobile for performance boost
        camera={{ position: [0, 3.5, 4.5], fov: isMobile ? 60 : 50 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={[activeTime.skyColor]} />
        
        {/* Natural hemisphere light bounce from sky and ground */}
        <hemisphereLight 
          color={activeTime.skyColor} 
          groundColor="#a37651" 
          intensity={activeTime.ambientIntensity} 
        />
        
        {/* Directional Sunlight/Moonlight streaming through the back circular window */}
        <directionalLight
          position={activeTime.sunPosition}
          intensity={activeTime.sunIntensity}
          color={activeTime.sunColor}
          castShadow={!isMobile}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0002}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-camera-near={0.1}
          shadow-camera-far={30}
        />

        {/* Secondary soft daylight sky bounce fill */}
        <directionalLight
          position={[-4, 6, 5]}
          intensity={activeTime.skyFillIntensity}
          color={activeTime.skyFillColor}
        />

        {/* Scene Loading fallback inside canvas */}
        <Suspense
          fallback={
            <Html center>
              <div
                style={{
                  color: activeTime.themeColor,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "14px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <div className="spinner" style={{ borderTopColor: activeTime.themeColor }} />
                <span>Initializing 3D Twin...</span>
                <style>{`
                  .spinner {
                    border: 2px solid rgba(148, 163, 184, 0.2);
                    border-radius: 50%;
                    width: 32px;
                    height: 32px;
                    animation: spin 1s linear infinite;
                  }
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </div>
            </Html>
          }
        >
          <OfficeScene
            onSelectSection={setActiveSection}
            activeTime={activeTime}
            onToggleLights={handleToggleLights}
          />
        </Suspense>

        {/* Camera Navigation Constraints */}
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2.2}
          maxDistance={7.5}
          maxPolarAngle={Math.PI / 2.1} // Prevent looking below floor level
          minPolarAngle={Math.PI / 12}  // Prevent looking directly from top
          target={[0, 0.8, 0]}          // Focus orbit controls on the desk height
        />
      </Canvas>

      {/* Glassmorphic overlay overlay controls / instructions */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(15, 23, 42, 0.08)",
          borderRadius: "999px",
          padding: "0.5rem 1.5rem",
          color: "#475569",
          fontSize: "12px",
          fontFamily: "var(--font-geist-mono), monospace",
          pointerEvents: "none",
          display: "flex",
          gap: "1.5rem",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
          textAlign: "center",
          whiteSpace: "nowrap",
          zIndex: 10,
        }}
      >
        <span>🖱️ Drag to rotate</span>
        <span>🔍 Scroll to zoom</span>
        <span>👆 Tap objects to explore</span>
      </div>

      {/* Floating Header Actions */}
      <div
        style={{
          position: "absolute",
          top: "5.5rem",
          right: "1.5rem",
          display: "flex",
          gap: "0.75rem",
          zIndex: 20,
        }}
      >
        <button
          onClick={handleToggleLights}
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: `1px solid ${activeTime.themeColor}60`,
            borderRadius: "var(--radius-pill)",
            padding: "0.5rem 1rem",
            color: activeTime.themeColor,
            fontWeight: "600",
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono), monospace",
            cursor: "pointer",
            boxShadow: `0 4px 12px rgba(15, 23, 42, 0.04)`,
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = activeTime.themeColor;
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
            e.currentTarget.style.color = activeTime.themeColor;
          }}
        >
          {activeTime.icon} {activeTime.name}
        </button>

        <a
          href="/"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: "var(--radius-pill)",
            padding: "0.5rem 1rem",
            color: "#334155",
            fontWeight: "600",
            fontSize: "12px",
            fontFamily: "var(--font-geist-mono), monospace",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
            transition: "all 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.15)";
            e.currentTarget.style.background = "rgba(15, 23, 42, 0.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(15, 23, 42, 0.08)";
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
          }}
        >
          🚪 Exit 3D
        </a>
      </div>

      {/* Floating Detailed Info Modal Overlays */}
      <InfoModal section={activeSection} onClose={() => setActiveSection(null)} />
    </div>
  );
}
