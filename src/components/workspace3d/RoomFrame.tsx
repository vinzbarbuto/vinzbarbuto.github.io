"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TimeOfDay } from "./CanvasContainer";

// Volumetric Sunbeams streaming through the panoramic window
interface VolumetricSunbeamProps {
  color: string;
  opacity: number;
  sunPosition: [number, number, number];
}

function VolumetricSunbeam({ color, opacity, sunPosition }: VolumetricSunbeamProps) {
  const beamRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (beamRef.current) {
      // Calculate lookAt target based on sun position
      const sun = new THREE.Vector3(...sunPosition);
      const windowCenter = new THREE.Vector3(0, 5.15, -7.9);
      const dir = new THREE.Vector3().subVectors(windowCenter, sun).normalize();
      const target = new THREE.Vector3().addVectors(windowCenter, dir.multiplyScalar(8));
      beamRef.current.lookAt(target);
    }
  }, [sunPosition]);

  return (
    <group ref={beamRef} position={[0, 5.15, -7.9]} scale={[1.8, 1, 1]}>
      {/* Outer Soft Light Shaft */}
      <mesh position={[0, 0, 5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3.5, 5.5, 12, 32, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner Core Light Shaft */}
      <mesh position={[0, 0, 5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.8, 3.0, 12, 32, 1, true]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.7}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

interface WhiteFlutedPlantProps {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}

function WhiteFlutedPlant({ position, scale = 1, rotation = [0, 0, 0] }: WhiteFlutedPlantProps) {
  return (
    <group position={position} scale={[scale, scale, scale]} rotation={rotation}>
      {/* Ceramic fluted pot */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.34, 0.25, 0.7, 24]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.71, 0]}>
        <cylinderGeometry args={[0.31, 0.31, 0.02, 24]} />
        <meshStandardMaterial color="#3b2314" roughness={0.9} />
      </mesh>

      {/* Plant Stems & Leaves */}
      {/* Stalk 1 */}
      <group position={[0, 0.6, 0]} rotation={[0.4, -0.6, -0.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.03, 0.75, 8]} />
          <meshStandardMaterial color="#1c3d18" roughness={0.8} />
        </mesh>
        <group position={[0, 0.38, 0]} rotation={[-0.2, 0.4, 0.3]}>
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.42, 0.015]} />
            <meshStandardMaterial color="#2d5e23" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Stalk 2 */}
      <group position={[0, 0.6, 0]} rotation={[0.2, 0.5, 0.4]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.03, 0.85, 8]} />
          <meshStandardMaterial color="#1c3d18" roughness={0.8} />
        </mesh>
        <group position={[0, 0.42, 0]} rotation={[-0.25, -0.3, -0.2]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.45, 0.015]} />
            <meshStandardMaterial color="#2d5e23" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Stalk 3 (Tall Center) */}
      <group position={[0, 0.6, 0]} rotation={[-0.15, 0.1, 0.15]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.03, 1.2, 8]} />
          <meshStandardMaterial color="#1c3d18" roughness={0.8} />
        </mesh>
        <group position={[0, 0.6, 0]} rotation={[0.35, 0.15, -0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.35, 0.48, 0.015]} />
            <meshStandardMaterial color="#387a2c" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Stalk 4 (Shallow back-left) */}
      <group position={[0, 0.6, 0]} rotation={[-0.35, -0.7, -0.25]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.02, 0.028, 1.0, 8]} />
          <meshStandardMaterial color="#1c3d18" roughness={0.8} />
        </mesh>
        <group position={[0, 0.5, 0]} rotation={[0.25, 0.3, 0.15]}>
          <mesh castShadow>
            <boxGeometry args={[0.32, 0.44, 0.015]} />
            <meshStandardMaterial color="#224a1a" roughness={0.7} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

interface RoomFrameProps {
  activeTime: TimeOfDay;
}

export default function RoomFrame({ activeTime }: RoomFrameProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 60;

  // Bird refs for animated sky elements
  const bird1Ref = useRef<THREE.Group>(null);
  const bird2Ref = useRef<THREE.Group>(null);
  const bird3Ref = useRef<THREE.Group>(null);

  // Generate dynamic landscape color scheme based on active TimeOfDay
  const landscapeColors = useMemo(() => {
    switch (activeTime.name) {
      case "Morning":
        return {
          sky: "#bae6fd",
          mountainBase: "#2e4827",      // Rich pine forest green
          mountainRock: "#5e6975",      // Cool slate rock grey
          foothills: "#15803d",         // Deep grassy green hills
          lake: "#7dd3fc",              // Bright sky blue water
          lakeShore: "#86efac",         // Light green shore
          trunk: "#422006",             // Brown wood trunk
          treeNeedles1: "#14532d",      // Dark pine needles
          treeNeedles2: "#15803d",      // Medium pine needles
          treeNeedles3: "#16a34a",      // Bright green needles
          foliageDeciduous: "#22c55e",  // Leaf green
          buildingWall: "#f1f5f9",      // Off-white concrete
          buildingGlass: "#93c5fd",     // Blue glass
        };
      case "Golden Hour":
        return {
          sky: "#fed7aa",
          mountainBase: "#524328",      // Warm orange-green forest
          mountainRock: "#7c3f1a",      // Warm terracotta rock
          foothills: "#854d0e",         // Warm golden hills
          lake: "#fdba74",              // Golden reflection water
          lakeShore: "#fde047",         // Soft yellow grass
          trunk: "#301802",
          treeNeedles1: "#4c2810",      // Warm shaded orange-green
          treeNeedles2: "#b45309",      // Autumn amber
          treeNeedles3: "#d97706",      // Golden yellow needles
          foliageDeciduous: "#ea580c",  // Vibrant autumn orange
          buildingWall: "#fed7aa",
          buildingGlass: "#fdba74",
        };
      case "Twilight":
      default:
        return {
          sky: "#1e1b4b",
          mountainBase: "#051f15",      // Dark forest green-black
          mountainRock: "#0b1329",      // Dark indigo-grey rock
          foothills: "#064e3b",         // Deep emerald hills
          lake: "#0c4a6e",              // Dark blue water
          lakeShore: "#065f46",         // Dark teal shore
          trunk: "#180b02",
          treeNeedles1: "#022c22",
          treeNeedles2: "#064e3b",
          treeNeedles3: "#0f766e",
          foliageDeciduous: "#115e59",  // Dark blue-green
          buildingWall: "#0f172a",
          buildingGlass: "#1e3a5f",
        };
    }
  }, [activeTime.name]);

  // Define 20 background trees for a rich, realistic forest scenery
  const forestTrees = useMemo(() => {
    return [
      // Left side forest (x: -9 to -4)
      { x: -7.5, z: -11.0, scale: 1.2, type: "conifer" },
      { x: -6.0, z: -11.5, scale: 1.5, type: "conifer" },
      { x: -8.5, z: -11.8, scale: 1.0, type: "conifer" },
      { x: -5.0, z: -12.0, scale: 1.3, type: "conifer" },
      { x: -7.0, z: -12.5, scale: 1.6, type: "conifer" },
      { x: -4.0, z: -11.2, scale: 0.9, type: "deciduous" },
      { x: -5.8, z: -12.8, scale: 1.1, type: "conifer" },
      
      // Center lake-side trees (x: -3 to 3)
      { x: -2.5, z: -11.3, scale: 1.1, type: "deciduous" },
      { x: -1.2, z: -11.8, scale: 1.3, type: "deciduous" },
      { x: 2.0, z: -11.0, scale: 0.8, type: "conifer" },
      { x: 3.2, z: -11.4, scale: 1.4, type: "deciduous" },
      { x: 0.8, z: -12.2, scale: 1.0, type: "conifer" },
      
      // Right side forest (x: 4 to 9)
      { x: 5.0, z: -11.2, scale: 1.2, type: "conifer" },
      { x: 6.2, z: -11.6, scale: 1.5, type: "conifer" },
      { x: 4.5, z: -12.0, scale: 1.0, type: "conifer" },
      { x: 7.5, z: -11.3, scale: 1.3, type: "deciduous" },
      { x: 8.8, z: -11.7, scale: 1.1, type: "deciduous" },
      { x: 5.8, z: -12.5, scale: 1.6, type: "conifer" },
      { x: 7.0, z: -12.2, scale: 1.2, type: "conifer" },
      { x: 8.2, z: -12.8, scale: 1.4, type: "conifer" },
    ];
  }, []);

  // Programmatically generate a rich array of books for the library bookcase
  const libraryBooks = useMemo(() => {
    const list: Array<{
      shelfIndex: number;
      offset: number; // local X offset along the shelf (from -0.9 to 0.9)
      height: number;
      width: number;
      depth: number;
      color: string;
      rotation?: number; // tilt angle
      stacked?: boolean; // if stacked horizontally, height becomes thickness, etc.
      stackCount?: number;
    }> = [];

    // Shelf 0 (y = 0.08) - Big heavy manuals
    list.push(
      { shelfIndex: 0, offset: -0.85, height: 0.55, width: 0.08, depth: 0.35, color: "#1e293b" },
      { shelfIndex: 0, offset: -0.76, height: 0.52, width: 0.07, depth: 0.34, color: "#334155" },
      { shelfIndex: 0, offset: -0.68, height: 0.54, width: 0.09, depth: 0.35, color: "#475569" },
      { shelfIndex: 0, offset: -0.58, height: 0.50, width: 0.08, depth: 0.32, color: "#0f172a" },
      // A horizontal stack of binders
      { shelfIndex: 0, offset: -0.1, height: 0.08, width: 0.42, depth: 0.32, color: "#b91c1c", stacked: true, stackCount: 4 },
      // Some standard books leaning
      { shelfIndex: 0, offset: 0.4, height: 0.48, width: 0.06, depth: 0.30, color: "#1e3a8a" },
      { shelfIndex: 0, offset: 0.48, height: 0.48, width: 0.06, depth: 0.30, color: "#0284c7" },
      { shelfIndex: 0, offset: 0.57, height: 0.45, width: 0.07, depth: 0.28, color: "#065f46", rotation: -Math.PI / 10 },
      { shelfIndex: 0, offset: 0.65, height: 0.45, width: 0.06, depth: 0.28, color: "#0f766e", rotation: -Math.PI / 10 }
    );

    // Shelf 1 (y = 0.8) - Highly packed academic literature
    for (let i = 0; i < 18; i++) {
      const h = 0.32 + Math.random() * 0.12;
      const w = 0.035 + Math.random() * 0.04;
      const d = 0.24 + Math.random() * 0.06;
      const colors = ["#7f1d1d", "#3730a3", "#064e3b", "#0f766e", "#1e3a8a", "#111827", "#1e293b", "#d97706", "#7c2d12", "#4c1d95"];
      const col = colors[Math.floor(Math.random() * colors.length)];
      const localX = -0.85 + i * 0.09;
      if (localX < 0.8) {
        list.push({ shelfIndex: 1, offset: localX, height: h, width: w, depth: d, color: col });
      }
    }
    // A couple of leaning books at the right end of Shelf 1
    list.push(
      { shelfIndex: 1, offset: 0.78, height: 0.38, width: 0.05, depth: 0.26, color: "#1e3a8a", rotation: -Math.PI / 8 },
      { shelfIndex: 1, offset: 0.85, height: 0.38, width: 0.05, depth: 0.26, color: "#b91c1c", rotation: -Math.PI / 8 }
    );

    // Shelf 2 (y = 1.6) - Mix of books and a small trophy/vase gap
    list.push(
      { shelfIndex: 2, offset: -0.85, height: 0.36, width: 0.05, depth: 0.25, color: "#065f46" },
      { shelfIndex: 2, offset: -0.79, height: 0.38, width: 0.06, depth: 0.25, color: "#0f766e" },
      { shelfIndex: 2, offset: -0.72, height: 0.34, width: 0.05, depth: 0.25, color: "#115e59" },
      { shelfIndex: 2, offset: -0.66, height: 0.35, width: 0.07, depth: 0.24, color: "#15803d" },
      // Stack of books
      { shelfIndex: 2, offset: -0.25, height: 0.05, width: 0.34, depth: 0.26, color: "#9d174d", stacked: true, stackCount: 3 }
    );
    // Right side:
    for (let i = 0; i < 7; i++) {
      const h = 0.30 + Math.random() * 0.08;
      const w = 0.04 + Math.random() * 0.03;
      const d = 0.22 + Math.random() * 0.04;
      const col = ["#1e293b", "#b91c1c", "#1e3a8a", "#0f766e", "#6b7280"][i % 5];
      list.push({ shelfIndex: 2, offset: 0.3 + i * 0.08, height: h, width: w, depth: d, color: col });
    }

    // Shelf 3 (y = 2.4) - Textbooks & Journals
    for (let i = 0; i < 15; i++) {
      const h = 0.34 + Math.random() * 0.08;
      const w = 0.04 + Math.random() * 0.03;
      const d = 0.25 + Math.random() * 0.03;
      const colors = ["#475569", "#0f172a", "#1e3a8a", "#065f46", "#7c2d12", "#b91c1c", "#1e1b4b"];
      const col = colors[i % colors.length];
      const localX = -0.85 + i * 0.11;
      if (localX < 0.8) {
        list.push({ shelfIndex: 3, offset: localX, height: h, width: w, depth: d, color: col });
      }
    }

    // Shelf 4 (y = 3.2) - Theses & folders
    list.push(
      { shelfIndex: 4, offset: -0.85, height: 0.44, width: 0.07, depth: 0.30, color: "#1e1b4b" },
      { shelfIndex: 4, offset: -0.77, height: 0.44, width: 0.07, depth: 0.30, color: "#1e1b4b" },
      { shelfIndex: 4, offset: -0.69, height: 0.44, width: 0.07, depth: 0.30, color: "#1e1b4b" },
      { shelfIndex: 4, offset: -0.61, height: 0.44, width: 0.07, depth: 0.30, color: "#1e1b4b" }
    );
    // Stack of folders
    list.push({ shelfIndex: 4, offset: -0.1, height: 0.07, width: 0.38, depth: 0.28, color: "#3b0764", stacked: true, stackCount: 4 });
    // Right side books
    for (let i = 0; i < 6; i++) {
      const h = 0.28 + Math.random() * 0.06;
      const w = 0.04 + Math.random() * 0.02;
      const d = 0.22 + Math.random() * 0.03;
      const col = ["#1e293b", "#7c2d12", "#0f766e", "#1e3a8a"][i % 4];
      list.push({ shelfIndex: 4, offset: 0.4 + i * 0.07, height: h, width: w, depth: d, color: col });
    }

    return list;
  }, []);

  // Generate random positions for floating dust particles
  const [positions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 9 + Math.random() * 4;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = Math.abs(r * Math.sin(phi) * Math.sin(theta)) + 1; // keep above floor
      pos[i * 3 + 2] = r * Math.cos(phi) - 11; // Push far behind the window
    }
    return [pos];
  }, []);

  // Animating the sky birds and dust particles
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    // Solar Dust
    if (particlesRef.current) {
      particlesRef.current.rotation.y = elapsed * 0.01;
      const positionsArray = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const indexY = i * 3 + 1;
        const initialY = positions[indexY];
        positionsArray[indexY] = initialY + Math.sin(elapsed * 0.4 + i) * 0.08;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Sky Birds gliding across the campus landscape
    if (bird1Ref.current) {
      bird1Ref.current.position.x = -7 + ((elapsed * 0.3) % 14);
      bird1Ref.current.position.y = 6.5 + Math.sin(elapsed * 1.5) * 0.15;
    }
    if (bird2Ref.current) {
      bird2Ref.current.position.x = 7 - ((elapsed * 0.25) % 14);
      bird2Ref.current.position.y = 7.2 + Math.cos(elapsed * 1.1) * 0.2;
    }
    if (bird3Ref.current) {
      bird3Ref.current.position.x = -5 + ((elapsed * 0.4) % 12);
      bird3Ref.current.position.y = 5.8 + Math.sin(elapsed * 2.1) * 0.12;
    }
  });

  return (
    <group>
      {/* ==========================================
       * 1. ROOM SHELL (Walls, Floor & Ceiling)
       * ========================================== */}
      {/* Wood Parquet Floor (Warm Natural Oak - now shinier for reflections) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#92623e" // Rich warm honey oak parquet
          roughness={0.3} 
          metalness={0.0} 
        />
      </mesh>

      {/* Back Wall — split into 4 sections around the panoramic window opening */}
      {/* Bottom strip (below window, full width) y: 0→2.8 */}
      <mesh position={[0, 1.4, -8]} receiveShadow>
        <planeGeometry args={[16, 2.8]} />
        <meshStandardMaterial color="#ebded2" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Top strip (above window, full width) y: 7.5→8.0 */}
      <mesh position={[0, 7.75, -8]} receiveShadow>
        <planeGeometry args={[16, 0.5]} />
        <meshStandardMaterial color="#ebded2" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Left pillar (beside window) x: -8→-6, y: 2.8→7.5 */}
      <mesh position={[-7.0, 5.15, -8]} receiveShadow>
        <planeGeometry args={[2.0, 4.7]} />
        <meshStandardMaterial color="#ebded2" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Right pillar (beside window) x: 6→8, y: 2.8→7.5 */}
      <mesh position={[7.0, 5.15, -8]} receiveShadow>
        <planeGeometry args={[2.0, 4.7]} />
        <meshStandardMaterial color="#ebded2" roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-8, 4, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color="#e5d6ca" roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[8, 4, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[16, 8]} />
        <meshStandardMaterial color="#e5d6ca" roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Soft Fabric Rug (Cozy Cream/Beige) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0.2]} receiveShadow>
        <boxGeometry args={[5.2, 3.2, 0.01]} />
        <meshStandardMaterial 
          color="#ddd6ca" // Warm cream beige
          roughness={0.95} 
          metalness={0.0} 
        />
      </mesh>

      {/* Ceiling Structural Beams */}
      <group>
        {[-6, -3, 0, 3, 6].map((zVal, idx) => (
          <mesh key={idx} position={[0, 7.9, zVal]} castShadow>
            <boxGeometry args={[16.0, 0.2, 0.35]} />
            <meshStandardMaterial color="#3d2516" roughness={0.6} />
          </mesh>
        ))}
      </group>

      {/* ==========================================
       * 2. PANORAMIC RECTANGULAR WINDOW & FRAME
       *    Positioned above whiteboard (y≤3.15) and certificate (y≤3.3)
       *    Bottom edge at y=2.8, top at y=7.5  —  12 units wide
       * ========================================== */}
      <group position={[0, 5.15, -7.95]}>
        {/* Warm Walnut Wood Frame */}
        {/* Top bar */}
        <mesh position={[0, 2.35, 0]} castShadow>
          <boxGeometry args={[12.3, 0.15, 0.1]} />
          <meshStandardMaterial color="#3d2516" roughness={0.55} metalness={0.05} />
        </mesh>
        {/* Bottom bar */}
        <mesh position={[0, -2.35, 0]} castShadow>
          <boxGeometry args={[12.3, 0.15, 0.1]} />
          <meshStandardMaterial color="#3d2516" roughness={0.55} metalness={0.05} />
        </mesh>
        {/* Left bar */}
        <mesh position={[-6.08, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 4.85, 0.1]} />
          <meshStandardMaterial color="#3d2516" roughness={0.55} metalness={0.05} />
        </mesh>
        {/* Right bar */}
        <mesh position={[6.08, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 4.85, 0.1]} />
          <meshStandardMaterial color="#3d2516" roughness={0.55} metalness={0.05} />
        </mesh>

        {/* Vertical Muntin Grilles (dividing into 4 panes) */}
        {[-3, 0, 3].map((xVal, idx) => (
          <mesh key={`vm-${idx}`} position={[xVal, 0, 0.02]}>
            <boxGeometry args={[0.05, 4.55, 0.04]} />
            <meshStandardMaterial color="#5c4431" roughness={0.5} metalness={0.05} />
          </mesh>
        ))}
        {/* Horizontal Muntin Grille (dividing into 2 rows) */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[11.95, 0.05, 0.04]} />
          <meshStandardMaterial color="#5c4431" roughness={0.5} metalness={0.05} />
        </mesh>

        {/* Glass Pane (subtle reflective / transparent) */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[11.95, 4.55]} />
          <meshStandardMaterial
            color="#bae6fd"
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Window sill (bottom ledge) */}
        <mesh position={[0, -2.45, 0.1]} castShadow>
          <boxGeometry args={[12.4, 0.06, 0.22]} />
          <meshStandardMaterial color="#4a3525" roughness={0.5} metalness={0.05} />
        </mesh>
      </group>

      {/* ==========================================
       * 3. CINEMATIC MOUNTAIN & LAKE LANDSCAPE
       * ========================================== */}
      {/* Panoramic Sky Backdrop (behind window) */}
      <mesh position={[0, 5.5, -16]}>
        <planeGeometry args={[40, 24]} />
        <meshBasicMaterial color={activeTime.skyColor} side={THREE.DoubleSide} />
      </mesh>

      {/* Sun / Moon Glow Disc */}
      <mesh position={[activeTime.sunPosition[0] * 1.2, activeTime.sunPosition[1] + 1.5, -15.8]}>
        <circleGeometry args={[5.0, 32]} />
        <meshBasicMaterial
          color={activeTime.sunColor}
          transparent
          opacity={activeTime.name === "Twilight" ? 0.12 : 0.3}
        />
      </mesh>

      {/* ---- LAYER 1: Distant Mountain Range (Realistic, non-snowy, two-toned) ---- */}
      <group position={[0, 0, -15]}>
        {/* Peak 1 — Large left mountain */}
        <mesh position={[-8, 4.5, 0]}>
          <coneGeometry args={[5, 7, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainBase} />
        </mesh>
        {/* Rocky peak 1 (replaces snow cap) */}
        <mesh position={[-8, 6.75, 0.05]}>
          <coneGeometry args={[1.78, 2.5, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainRock} />
        </mesh>

        {/* Peak 2 — Tallest centre mountain */}
        <mesh position={[1, 5.5, -0.5]}>
          <coneGeometry args={[6, 9, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainBase} />
        </mesh>
        {/* Rocky peak 2 */}
        <mesh position={[1, 8.25, -0.45]}>
          <coneGeometry args={[2.3, 3.5, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainRock} />
        </mesh>

        {/* Peak 3 — Right mountain */}
        <mesh position={[9, 4.0, 0.2]}>
          <coneGeometry args={[4.5, 6, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainBase} />
        </mesh>
        {/* Rocky peak 3 */}
        <mesh position={[9, 5.9, 0.25]}>
          <coneGeometry args={[1.65, 2.2, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainRock} />
        </mesh>

        {/* Small ridge fill between mountains */}
        <mesh position={[-3, 3.2, 0.3]}>
          <coneGeometry args={[3.0, 3.5, 4]} />
          <meshBasicMaterial color={landscapeColors.foothills} />
        </mesh>
        <mesh position={[5, 3.0, 0.3]}>
          <coneGeometry args={[3.5, 3.2, 4]} />
          <meshBasicMaterial color={landscapeColors.foothills} />
        </mesh>
      </group>

      {/* ---- LAYER 2: Green Foothills ---- */}
      <group position={[0, 0, -13.5]}>
        <mesh position={[-7, 1.0, 0]} scale={[5, 2.5, 1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={landscapeColors.foothills} />
        </mesh>
        <mesh position={[0, 0.8, 0]} scale={[6, 3, 1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={landscapeColors.foothills} />
        </mesh>
        <mesh position={[8, 1.0, 0]} scale={[5, 2.5, 1]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color={landscapeColors.foothills} />
        </mesh>
      </group>

      {/* ---- LAYER 3: Modern University Campus Buildings ---- */}
      <group position={[0, 0, -12.5]}>
        {/* Main University Hall (centre-left) */}
        <mesh position={[-3, 2.8, 0]}>
          <boxGeometry args={[2.5, 5.6, 0.5]} />
          <meshBasicMaterial color={landscapeColors.buildingWall} />
        </mesh>
        {/* Glass facade */}
        <mesh position={[-3, 3.5, 0.26]}>
          <planeGeometry args={[2.2, 4.0]} />
          <meshBasicMaterial color={landscapeColors.buildingGlass} transparent opacity={0.5} />
        </mesh>

        {/* Research Tower (centre) */}
        <mesh position={[0.5, 3.5, -0.2]}>
          <boxGeometry args={[1.8, 7.0, 0.5]} />
          <meshBasicMaterial color={landscapeColors.buildingWall} />
        </mesh>
        {/* Tower glass curtain wall */}
        <mesh position={[0.5, 4.2, 0.06]}>
          <planeGeometry args={[1.5, 5.5]} />
          <meshBasicMaterial color={landscapeColors.buildingGlass} transparent opacity={0.45} />
        </mesh>

        {/* Library Wing (right) */}
        <mesh position={[4, 2.2, 0.1]}>
          <boxGeometry args={[3.0, 4.4, 0.5]} />
          <meshBasicMaterial color={landscapeColors.buildingWall} />
        </mesh>
        {/* Library glass facade */}
        <mesh position={[4, 2.8, 0.36]}>
          <planeGeometry args={[2.6, 3.2]} />
          <meshBasicMaterial color={landscapeColors.buildingGlass} transparent opacity={0.4} />
        </mesh>

        {/* Far-left smaller building */}
        <mesh position={[-7, 1.6, 0]}>
          <boxGeometry args={[2.0, 3.2, 0.5]} />
          <meshBasicMaterial color={landscapeColors.buildingWall} />
        </mesh>

        {/* Far-right smaller building */}
        <mesh position={[8, 1.8, 0]}>
          <boxGeometry args={[1.6, 3.6, 0.5]} />
          <meshBasicMaterial color={landscapeColors.buildingWall} />
        </mesh>

        {/* Glowing window rows on buildings at Twilight */}
        {activeTime.name === "Twilight" && (
          <group>
            {/* Main Hall windows */}
            {[1.5, 2.5, 3.5, 4.5].map((y, i) => (
              <mesh key={`mh-${i}`} position={[-3, y, 0.27]}>
                <planeGeometry args={[1.8, 0.08]} />
                <meshBasicMaterial color="#fef08a" transparent opacity={0.5 + i * 0.08} />
              </mesh>
            ))}
            {/* Research Tower windows */}
            {[2.0, 3.0, 4.0, 5.0, 6.0].map((y, i) => (
              <mesh key={`rt-${i}`} position={[0.5, y, 0.07]}>
                <planeGeometry args={[1.2, 0.1]} />
                <meshBasicMaterial color={i % 2 === 0 ? "#fef08a" : "#fed7aa"} transparent opacity={0.6} />
              </mesh>
            ))}
            {/* Library windows */}
            {[1.5, 2.5, 3.5].map((y, i) => (
              <mesh key={`lb-${i}`} position={[4, y, 0.37]}>
                <planeGeometry args={[2.2, 0.08]} />
                <meshBasicMaterial color="#fed7aa" transparent opacity={0.55} />
              </mesh>
            ))}
          </group>
        )}
      </group>

      {/* ---- LAYER 4: Serene Lake / Reflecting Pool ---- */}
      <mesh position={[2, 0.15, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 3]} />
        <meshBasicMaterial
          color={landscapeColors.lake}
          transparent
          opacity={0.55}
        />
      </mesh>
      {/* Lake shore highlight */}
      <mesh position={[2, 0.12, -10.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 0.4]} />
        <meshBasicMaterial
          color={landscapeColors.lakeShore}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* ---- LAYER 5: Rich Background Forest (20 Trees) ---- */}
      <group>
        {forestTrees.map((tree, idx) => {
          if (tree.type === "conifer") {
            return (
              <group key={`tree-${idx}`} position={[tree.x, 0.12, tree.z]} scale={[tree.scale * 0.9, tree.scale * 0.9, tree.scale * 0.9]}>
                {/* Trunk */}
                <mesh position={[0, 0.4, 0]}>
                  <cylinderGeometry args={[0.04, 0.07, 0.8, 8]} />
                  <meshBasicMaterial color={landscapeColors.trunk} />
                </mesh>
                {/* Needles Layer 1 (Bottom) */}
                <mesh position={[0, 1.2, 0]}>
                  <coneGeometry args={[0.4, 1.1, 8]} />
                  <meshBasicMaterial color={landscapeColors.treeNeedles1} />
                </mesh>
                {/* Needles Layer 2 (Middle) */}
                <mesh position={[0, 1.8, 0]}>
                  <coneGeometry args={[0.3, 0.8, 8]} />
                  <meshBasicMaterial color={landscapeColors.treeNeedles2} />
                </mesh>
                {/* Needles Layer 3 (Top) */}
                <mesh position={[0, 2.3, 0]}>
                  <coneGeometry args={[0.2, 0.6, 8]} />
                  <meshBasicMaterial color={landscapeColors.treeNeedles3} />
                </mesh>
              </group>
            );
          } else {
            return (
              <group key={`tree-${idx}`} position={[tree.x, 0.12, tree.z]} scale={[tree.scale * 0.9, tree.scale * 0.9, tree.scale * 0.9]}>
                {/* Trunk */}
                <mesh position={[0, 0.5, 0]}>
                  <cylinderGeometry args={[0.05, 0.08, 1.0, 8]} />
                  <meshBasicMaterial color={landscapeColors.trunk} />
                </mesh>
                {/* Foliage main sphere */}
                <mesh position={[0, 1.3, 0]}>
                  <sphereGeometry args={[0.55, 8, 8]} />
                  <meshBasicMaterial color={landscapeColors.foliageDeciduous} />
                </mesh>
                {/* Foliage accent sphere */}
                <mesh position={[0.2, 1.5, 0.1]}>
                  <sphereGeometry args={[0.38, 8, 8]} />
                  <meshBasicMaterial color={landscapeColors.treeNeedles3} />
                </mesh>
              </group>
            );
          }
        })}
      </group>

      {/* ---- Animated Sky Birds ---- */}
      <group ref={bird1Ref} position={[-6, 6.5, -13.5]}>
        <mesh scale={[0.12, 0.03, 0.06]}>
          <sphereGeometry args={[1, 4, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainRock} />
        </mesh>
      </group>
      <group ref={bird2Ref} position={[6, 7.2, -13.5]}>
        <mesh scale={[0.1, 0.025, 0.05]}>
          <sphereGeometry args={[1, 4, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainRock} />
        </mesh>
      </group>
      <group ref={bird3Ref} position={[-4, 5.8, -13.5]}>
        <mesh scale={[0.09, 0.02, 0.045]}>
          <sphereGeometry args={[1, 4, 4]} />
          <meshBasicMaterial color={landscapeColors.mountainRock} />
        </mesh>
      </group>

      {/* Volumetric Sunbeams streaming through the panoramic window */}
      <VolumetricSunbeam 
        color={activeTime.sunbeamColor} 
        opacity={activeTime.sunbeamOpacity} 
        sunPosition={activeTime.sunPosition}
      />

      {/* Floating Solar Dust Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={activeTime.name === "Twilight" ? "#38bdf8" : "#fef08a"}
          size={0.07}
          transparent
          opacity={activeTime.dustOpacity}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* ==========================================
       * 4. ENVIRONMENT FURNITURE & ACCESSORIES
       * ========================================== */}


      {/* 2. LIBRARY BOOKCASE (Right Wall, replaces minimal shelves) */}
      <group position={[7.75, 0, -1.0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Bookcase Outer Wood Frame */}
        {/* Back Panel */}
        <mesh position={[0, 2.1, -0.21]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 4.2, 0.03]} />
          <meshStandardMaterial color="#4a3525" roughness={0.7} metalness={0.02} />
        </mesh>
        {/* Left Side Panel */}
        <mesh position={[-1.0, 2.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.04, 4.2, 0.45]} />
          <meshStandardMaterial color="#4a3525" roughness={0.7} metalness={0.02} />
        </mesh>
        {/* Right Side Panel */}
        <mesh position={[1.0, 2.1, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.04, 4.2, 0.45]} />
          <meshStandardMaterial color="#4a3525" roughness={0.7} metalness={0.02} />
        </mesh>
        {/* Top Panel */}
        <mesh position={[0, 4.175, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.05, 0.45]} />
          <meshStandardMaterial color="#4a3525" roughness={0.7} metalness={0.02} />
        </mesh>
        {/* Base Kickboard */}
        <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.96, 0.08, 0.43]} />
          <meshStandardMaterial color="#3d2516" roughness={0.8} />
        </mesh>

        {/* Shelves */}
        {[0.8, 1.6, 2.4, 3.2].map((yVal, idx) => (
          <mesh key={`shelf-${idx}`} position={[0, yVal, 0.01]} castShadow receiveShadow>
            <boxGeometry args={[1.96, 0.04, 0.43]} />
            <meshStandardMaterial color="#4a3525" roughness={0.75} />
          </mesh>
        ))}

        {/* Dynamic Books */}
        {libraryBooks.map((book, idx) => {
          const shelfBaseY = [0.08, 0.8, 1.6, 2.4, 3.2][book.shelfIndex];
          if (book.stacked) {
            const count = book.stackCount || 3;
            const thickness = book.height;
            return (
              <group key={`book-stack-${idx}`} position={[book.offset, shelfBaseY, 0]}>
                {Array.from({ length: count }).map((_, k) => {
                  const bY = k * thickness + thickness / 2 + 0.005;
                  const rotY = (k - count / 2) * 0.04;
                  return (
                    <mesh key={k} position={[0, bY, 0]} rotation={[0, rotY, 0]} castShadow>
                      <boxGeometry args={[book.width, thickness - 0.005, book.depth]} />
                      <meshStandardMaterial color={k % 2 === 0 ? book.color : "#d97706"} roughness={0.6} />
                    </mesh>
                  );
                })}
              </group>
            );
          } else {
            const y = shelfBaseY + book.height / 2 + 0.005;
            const rotZ = book.rotation || 0;
            const posX = book.offset;
            const posY = y;
            return (
              <mesh 
                key={`book-${idx}`} 
                position={[posX, posY, 0]} 
                rotation={[0, 0, rotZ]} 
                castShadow
              >
                <boxGeometry args={[book.width, book.height, book.depth]} />
                <meshStandardMaterial color={book.color} roughness={0.65} />
              </mesh>
            );
          }
        })}

        {/* Small Decorative Trophy / Vase on Shelf 2 gap */}
        <group position={[0.05, 1.62, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.16, 12]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.18, 0]} castShadow>
            <sphereGeometry args={[0.10, 12, 12]} />
            <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* 3. LOW WINDOW CONSOLE CABINET & TURNTABLE (Under Window) */}
      <group position={[0, 0, -7.6]}>
        {/* Tapered Legs */}
        <mesh position={[-2.5, 0.09, 0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.04, 0.18, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[2.5, 0.09, 0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.04, 0.18, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[-2.5, 0.09, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.04, 0.18, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[2.5, 0.09, -0.2]} castShadow>
          <cylinderGeometry args={[0.02, 0.04, 0.18, 8]} />
          <meshStandardMaterial color="#1e293b" metalness={0.4} roughness={0.5} />
        </mesh>

        {/* Main Cabinet Body */}
        <mesh position={[0, 0.54, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.5, 0.72, 0.55]} />
          <meshStandardMaterial color="#5c4431" roughness={0.6} metalness={0.02} />
        </mesh>
        
        {/* Sliding Slatted Doors (Front Panels) */}
        <mesh position={[-1.32, 0.54, 0.28]} castShadow>
          <boxGeometry args={[2.55, 0.64, 0.02]} />
          <meshStandardMaterial color="#4a3525" roughness={0.65} />
        </mesh>
        <mesh position={[1.32, 0.54, 0.28]} castShadow>
          <boxGeometry args={[2.55, 0.64, 0.02]} />
          <meshStandardMaterial color="#4a3525" roughness={0.65} />
        </mesh>
        {/* Sliding door grooves / slats texture effect */}
        {[-2.3, -2.1, -1.9, -1.7, -1.5, -1.3, -1.1, -0.9, -0.7, -0.5, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7, 1.9, 2.1, 2.3].map((xOffset, idx) => (
          <mesh key={`groove-${idx}`} position={[xOffset, 0.54, 0.292]}>
            <boxGeometry args={[0.015, 0.6, 0.005]} />
            <meshBasicMaterial color="#2d1f14" />
          </mesh>
        ))}
        {/* Handles */}
        <mesh position={[-0.2, 0.54, 0.295]} castShadow>
          <boxGeometry args={[0.03, 0.12, 0.02]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.2, 0.54, 0.295]} castShadow>
          <boxGeometry args={[0.03, 0.12, 0.02]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* TURNTABLE / RECORD PLAYER */}
        <group position={[-1.4, 0.9, 0.05]}>
          <mesh position={[0, 0.04, 0]} castShadow>
            <boxGeometry args={[0.62, 0.08, 0.48]} />
            <meshStandardMaterial color="#2d1f14" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.081, 0]}>
            <boxGeometry args={[0.6, 0.002, 0.46]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} />
          </mesh>

          <mesh position={[-0.06, 0.086, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.008, 24]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
          
          <mesh position={[-0.06, 0.092, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.17, 0.17, 0.005, 24]} />
            <meshStandardMaterial color="#020617" roughness={0.85} />
          </mesh>
          <mesh position={[-0.06, 0.096, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.002, 16]} />
            <meshBasicMaterial color={activeTime.themeColor} />
          </mesh>

          {/* Tonearm */}
          <mesh position={[0.18, 0.1, -0.14]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.04, 12]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.18, 0.125, -0.14]} castShadow>
            <sphereGeometry args={[0.016, 8, 8]} />
            <meshStandardMaterial color="#475569" metalness={0.8} />
          </mesh>
          <mesh position={[0.07, 0.13, -0.06]} rotation={[0.08, -0.5, 0.02]} castShadow>
            <boxGeometry args={[0.24, 0.008, 0.008]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0.21, 0.122, -0.155]} rotation={[0, -0.5, 0]} castShadow>
            <cylinderGeometry args={[0.012, 0.012, 0.02, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.8} />
          </mesh>

          <mesh position={[0.2, 0.083, 0.08]} castShadow>
            <boxGeometry args={[0.012, 0.004, 0.04]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} />
          </mesh>
          <mesh position={[0.14, 0.083, 0.14]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.005, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
          </mesh>

          {/* Dust Cover */}
          <group position={[0, 0.08, -0.23]} rotation={[-Math.PI / 5, 0, 0]}>
            <mesh position={[0, 0, 0.23]} castShadow>
              <boxGeometry args={[0.63, 0.01, 0.47]} />
              <meshStandardMaterial color="#93c5fd" transparent opacity={0.15} roughness={0.1} metalness={0.9} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.31, -0.09, 0.23]} castShadow>
              <boxGeometry args={[0.01, 0.18, 0.47]} />
              <meshStandardMaterial color="#93c5fd" transparent opacity={0.15} roughness={0.1} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[-0.31, -0.09, 0.23]} castShadow>
              <boxGeometry args={[0.01, 0.18, 0.47]} />
              <meshStandardMaterial color="#93c5fd" transparent opacity={0.15} roughness={0.1} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.09, 0.46]} castShadow>
              <boxGeometry args={[0.61, 0.18, 0.01]} />
              <meshStandardMaterial color="#93c5fd" transparent opacity={0.15} roughness={0.1} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.09, 0.0]} castShadow>
              <boxGeometry args={[0.61, 0.18, 0.01]} />
              <meshStandardMaterial color="#93c5fd" transparent opacity={0.15} roughness={0.1} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>

        {/* Wire Crate of Vinyls */}
        <group position={[0.1, 0.9, 0.05]}>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.42, 0.02, 0.36]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.8} />
          </mesh>
          {[-0.18, -0.06, 0.06, 0.18].map((xOffset, idx) => (
            <mesh key={`wire-${idx}`} position={[xOffset, 0.14, 0]}>
              <boxGeometry args={[0.01, 0.26, 0.32]} />
              <meshStandardMaterial color="#94a3b8" wireframe metalness={0.9} />
            </mesh>
          ))}
          {[-0.14, -0.1, -0.05, 0, 0.05, 0.1, 0.15].map((xOffset, idx) => {
            const rotY = (idx - 3) * 0.02;
            const rotZ = -Math.PI / 16;
            const col = ["#7f1d1d", "#1e3b8a", "#0f766e", "#1e293b", "#b91c1c", "#3b0764", "#064e3b"][idx % 7];
            return (
              <mesh key={`sleeve-${idx}`} position={[xOffset, 0.17, 0]} rotation={[0, rotY, rotZ]} castShadow>
                <boxGeometry args={[0.012, 0.32, 0.32]} />
                <meshStandardMaterial color={col} roughness={0.7} />
              </mesh>
            );
          })}
        </group>

        {/* Stack of Books */}
        <group position={[1.4, 0.9, 0.05]}>
          <mesh position={[0, 0.02, 0]} rotation={[0, 0.06, 0]} castShadow>
            <boxGeometry args={[0.36, 0.04, 0.44]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.6} />
          </mesh>
          <mesh position={[-0.02, 0.056, 0.01]} rotation={[0, -0.04, 0]} castShadow>
            <boxGeometry args={[0.34, 0.032, 0.42]} />
            <meshStandardMaterial color="#7f1d1d" roughness={0.6} />
          </mesh>
          <mesh position={[0.01, 0.084, -0.01]} rotation={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.32, 0.025, 0.40]} />
            <meshStandardMaterial color="#064e3b" roughness={0.6} />
          </mesh>

          <group position={[0.0, 0.15, 0.0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.06, 0.045, 0.10, 12]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.15} />
            </mesh>
            <mesh position={[0, 0.09, 0]} castShadow>
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshStandardMaterial color="#16a34a" roughness={0.8} />
            </mesh>
          </group>
        </group>

        {/* Standing Books between Bookends */}
        <group position={[2.2, 0.9, 0.05]}>
          <mesh position={[-0.24, 0.06, 0]} castShadow>
            <boxGeometry args={[0.01, 0.12, 0.22]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
          <mesh position={[0.24, 0.06, 0]} castShadow>
            <boxGeometry args={[0.01, 0.12, 0.22]} />
            <meshStandardMaterial color="#475569" metalness={0.7} />
          </mesh>
          {[-0.18, -0.12, -0.06, 0, 0.06, 0.12, 0.18].map((xOffset, idx) => {
            const h = 0.24 + (idx % 3) * 0.03;
            const w = 0.04;
            const d = 0.22;
            const col = ["#1e293b", "#7c2d12", "#0f766e", "#1e3a8a", "#0f172a", "#b91c1c", "#6b7280"][idx % 7];
            return (
              <mesh key={`stand-bk-${idx}`} position={[xOffset, h / 2 + 0.005, 0]} castShadow>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial color={col} roughness={0.6} />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* SIDEBOARD CABINET (Left Wall) */}
      <group position={[-7.7, 0, -2.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Main Cabinet Body */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.0, 0.5]} />
          <meshStandardMaterial color="#3d2516" roughness={0.6} />
        </mesh>
        
        {/* Drawers lines overlays */}
        <mesh position={[0, 0.5, 0.255]}>
          <boxGeometry args={[1.96, 0.94, 0.01]} />
          <meshBasicMaterial color="#1e1b4b" wireframe transparent opacity={0.25} />
        </mesh>

        {/* Sleek metal handles */}
        <mesh position={[-0.5, 0.75, 0.27]} castShadow>
          <boxGeometry args={[0.15, 0.02, 0.02]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.5, 0.75, 0.27]} castShadow>
          <boxGeometry args={[0.15, 0.02, 0.02]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Items on top of sideboard */}
        <group position={[0.2, 1.05, 0]}>
          <mesh position={[0, 0.02, 0]} rotation={[0, Math.PI / 6, 0]} castShadow>
            <boxGeometry args={[0.3, 0.04, 0.4]} />
            <meshStandardMaterial color="#9d174d" roughness={0.7} />
          </mesh>
          <mesh position={[-0.05, 0.06, 0.05]} rotation={[0, -Math.PI / 12, 0]} castShadow>
            <boxGeometry args={[0.28, 0.04, 0.38]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.7} />
          </mesh>
        </group>
        <group position={[-0.6, 1.02, 0.05]}>
          <mesh castShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* MODERN WOOD ENTRANCE DOOR (Left Wall, Near Entrance) */}
      <group position={[-7.95, 0, 3.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Door Frame/Trim */}
        <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.3, 2.9, 0.08]} />
          <meshStandardMaterial color="#4a3525" roughness={0.7} />
        </mesh>
        {/* Door Slab */}
        <mesh position={[0, 1.4, 0.01]} castShadow>
          <boxGeometry args={[1.2, 2.8, 0.04]} />
          <meshStandardMaterial color="#3d2516" roughness={0.5} />
        </mesh>
        {/* Frosted Glass Inserts in the Door */}
        {[-0.8, 0, 0.8].map((yOffset, idx) => (
          <mesh key={idx} position={[0, 1.4 + yOffset, 0.032]}>
            <planeGeometry args={[0.25, 0.5]} />
            <meshStandardMaterial 
              color="#e2e8f0" 
              roughness={0.15} 
              metalness={0.8} 
              transparent 
              opacity={0.55} 
            />
          </mesh>
        ))}
        {/* Metallic Door Handle Bar */}
        <mesh position={[0.48, 1.3, 0.05]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.35, 12]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0.45, 1.45, 0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0.45, 1.15, 0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* LEFT FLANKING PLANT (Left of Credenza, under window) */}
      <WhiteFlutedPlant position={[-3.7, 0, -7.4]} scale={0.85} rotation={[0, 0.5, 0]} />

      {/* RIGHT FLANKING PLANT (Right of Credenza, under window) */}
      <WhiteFlutedPlant position={[3.7, 0, -7.4]} scale={0.85} rotation={[0, -0.5, 0]} />
    </group>
  );
}
