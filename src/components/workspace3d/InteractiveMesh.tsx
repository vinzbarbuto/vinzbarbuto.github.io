"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface InteractiveMeshProps {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  baseScale?: number;
  hoverScale?: number;
}

export default function InteractiveMesh({
  children,
  label,
  onClick,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  baseScale = 1,
  hoverScale = 1.08,
}: InteractiveMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Set body cursor styling when hovering
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // Smooth lerp scaling using useFrame
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Determine target scale
    const currentTargetScale = hovered ? hoverScale : baseScale;
    const currentScale = groupRef.current.scale.x;
    
    // Lerp scale
    const lerpedScale = THREE.MathUtils.lerp(currentScale, currentTargetScale, 10 * delta);
    groupRef.current.scale.set(lerpedScale, lerpedScale, lerpedScale);

    // Gently float active hovered item up and down
    if (hovered) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(time * 4) * 0.03;
    } else {
      // Lerp back to base height
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, position[1], 10 * delta);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
      
      {/* Floating Holographic/Glassmorphic Text Badge */}
      {hovered && (
        <Html
          position={[0, 0.6, 0]}
          center
          distanceFactor={5}
          style={{
            pointerEvents: "none",
            transition: "opacity 0.2s ease-in-out",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid var(--workspace-theme-color, #10b981)",
              color: "#0f172a",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "12px",
              fontFamily: "var(--font-geist-mono), monospace",
              fontWeight: "600",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08), 0 0 12px var(--workspace-theme-color, rgba(16, 185, 129, 0.15))",
              letterSpacing: "1px",
              textTransform: "uppercase",
              animation: "fadeIn 0.2s ease-out",
            }}
          >
            {label}
          </div>
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(4px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </Html>
      )}
    </group>
  );
}
