"use client";

import InteractiveMesh from "./InteractiveMesh";
import { Text } from "@react-three/drei";
import { TimeOfDay } from "./CanvasContainer";

interface DeskUnitProps {
  onSelectSection: (section: string) => void;
  activeTime: TimeOfDay;
  onToggleLights: () => void;
}

export default function DeskUnit({
  onSelectSection,
  activeTime,
  onToggleLights,
}: DeskUnitProps) {
  // Cozy desk lamp bulb color: warm sunset glow at Twilight, otherwise matches theme
  const bulbColor = activeTime.name === "Twilight" ? "#ffedd5" : activeTime.themeColor;

  return (
    <group>
      {/* ==========================================
       * FURNITURE: DESK STRUCTURE (Walnut & Steel)
       * ========================================== */}
      {/* Wooden Desk Top */}
      <mesh position={[0, 0.86, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.4, 0.08, 1.8]} />
        <meshStandardMaterial 
          color="#3d2516" // Warm walnut wood color
          roughness={0.5} 
          metalness={0.05} 
        />
      </mesh>
      
      {/* Bevel wireframe highlight (Digital twin theme accent) */}
      <mesh position={[0, 0.86, 0]}>
        <boxGeometry args={[4.41, 0.09, 1.81]} />
        <meshBasicMaterial 
          color={activeTime.themeColor} 
          wireframe 
          transparent 
          opacity={0.08} 
        />
      </mesh>

      {/* Industrial Metal Legs */}
      {/* Front Left */}
      <mesh position={[-2.1, 0.4, 0.8]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.82, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Front Right */}
      <mesh position={[2.1, 0.4, 0.8]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.82, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Back Left */}
      <mesh position={[-2.1, 0.4, -0.8]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.82, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Back Right */}
      <mesh position={[2.1, 0.4, -0.8]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.82, 12]} />
        <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.7} />
      </mesh>


      {/* ==========================================
       * INTERACTIVE ITEM 1: MAIN MONITOR (Papers & Projects)
       * ========================================== */}
      <InteractiveMesh 
        label="Papers & Projects" 
        position={[0.6, 0.9, -0.25]} 
        rotation={[0, -Math.PI / 18, 0]}
        onClick={() => onSelectSection("projects")}
        baseScale={1}
        hoverScale={1.04}
      >
        <group>
          {/* Base */}
          <mesh position={[0, 0.02, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.26, 0.03, 24]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Stand */}
          <mesh position={[0, 0.24, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.44, 16]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Bezel */}
          <mesh position={[0, 0.65, 0.04]} castShadow>
            <boxGeometry args={[1.5, 0.88, 0.05]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Screen Glass */}
          <mesh position={[0, 0.65, 0.067]}>
            <planeGeometry args={[1.44, 0.82]} />
            <meshStandardMaterial color="#030712" roughness={0.1} />
          </mesh>
          {/* Screen Glow */}
          <mesh position={[0, 0.65, 0.069]}>
            <planeGeometry args={[1.44, 0.82]} />
            <meshBasicMaterial color={activeTime.themeColor} transparent opacity={0.08} />
          </mesh>
          
          {/* Digital Dashboard Content (Crisp SDF Text Previews) */}
          <group position={[0, 0.65, 0.072]}>
            <Text
              position={[-0.66, 0.35, 0]}
              fontSize={0.04}
              color={activeTime.themeColor}
              anchorX="left"
              anchorY="top"
            >
              {"[DIGITAL LIBRARY - PUBLICATIONS]"}
            </Text>
            <Text
              position={[-0.66, 0.25, 0]}
              fontSize={0.034}
              color="#e2e8f0"
              anchorX="left"
              anchorY="top"
              maxWidth={1.3}
              lineHeight={1.4}
            >
              {"• FGCS 2025: Engineering Opp. Digital Twins\n• IPDPSW 2025: Edge AI continuum & coordination\n• IoT Journal 2023: Emergency Vehicle local detection\n• MDPI 2023: Opportunistic Smart City Mobility CPS\n• FGCS 2022: Collaborative IoT-Cloud Gateway Architectures"}
            </Text>
            <Text
              position={[0.66, -0.34, 0]}
              fontSize={0.028}
              color={activeTime.themeColor}
              anchorX="right"
              anchorY="bottom"
              fillOpacity={0.8}
            >
              {"Click to explore Case Studies & Citations..."}
            </Text>
          </group>
        </group>
      </InteractiveMesh>


      {/* ==========================================
       * INTERACTIVE ITEM 2: OPEN LAPTOP (Work Experience)
       * ========================================== */}
      <InteractiveMesh 
        label="Work Experience" 
        position={[-0.5, 0.91, 0.15]} 
        rotation={[0, Math.PI / 10, 0]}
        onClick={() => onSelectSection("experiences")}
        baseScale={1}
        hoverScale={1.06}
      >
        <group>
          {/* Laptop Base */}
          <mesh position={[0, 0.008, 0]} castShadow>
            <boxGeometry args={[0.55, 0.016, 0.38]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.25} metalness={0.85} />
          </mesh>
          {/* Trackpad */}
          <mesh position={[0, 0.017, 0.12]}>
            <planeGeometry args={[0.12, 0.08]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          {/* Keyboard Grid */}
          <mesh position={[0, 0.017, -0.04]}>
            <planeGeometry args={[0.48, 0.18]} />
            <meshStandardMaterial color="#020617" roughness={0.8} wireframe />
          </mesh>

          {/* Laptop Lid (Open at 110 degrees) */}
          <group position={[0, 0.015, -0.18]} rotation={[Math.PI / 2 - 0.3, 0, 0]}>
            {/* Lid Shell */}
            <mesh position={[0, 0.18, 0]} castShadow>
              <boxGeometry args={[0.55, 0.36, 0.015]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.25} metalness={0.85} />
            </mesh>
            {/* Screen Glass */}
            <mesh position={[0, 0.18, 0.009]}>
              <planeGeometry args={[0.51, 0.32]} />
              <meshStandardMaterial color="#030712" roughness={0.1} />
            </mesh>
            {/* Screen Glow */}
            <mesh position={[0, 0.18, 0.01]}>
              <planeGeometry args={[0.51, 0.32]} />
              <meshBasicMaterial color={activeTime.themeColor} transparent opacity={0.08} />
            </mesh>

            {/* IDE VS Code Content (Lingua Franca reactor code) */}
            <group position={[0, 0.18, 0.012]}>
              <Text
                position={[-0.23, 0.14, 0]}
                fontSize={0.016}
                color={activeTime.themeColor}
                anchorX="left"
                anchorY="top"
              >
                {"main.lf — VS Code (DIMES EdgeAI)"}
              </Text>
              <Text
                position={[-0.23, 0.10, 0]}
                fontSize={0.011}
                color="#a7f3d0"
                anchorX="left"
                anchorY="top"
                maxWidth={0.46}
                lineHeight={1.3}
              >
                {"target C {\n  timeout: 10 s,\n  threads: 4\n};\n\nmain reactor EdgeAI {\n  state threshold = 0.85;\n  input sensors: double;\n\n  reaction(sensors) {\n    // local AI model inference\n    log(\"Consistency state: dependable\");\n  }\n}"}
              </Text>
            </group>
          </group>
        </group>
      </InteractiveMesh>


      {/* ==========================================
       * INTERACTIVE ITEM 3: TEXTBOOKS STACK (Education)
       * ========================================== */}
      <InteractiveMesh 
        label="Education" 
        position={[1.3, 0.91, 0.2]} 
        rotation={[0, -Math.PI / 8, 0]}
        onClick={() => onSelectSection("education")}
        baseScale={1}
        hoverScale={1.08}
      >
        <group>
          {/* Book 1 (Bottom, Indigo) */}
          <mesh position={[0, 0.03, 0]} castShadow>
            <boxGeometry args={[0.5, 0.06, 0.62]} />
            <meshStandardMaterial color="#1e1b4b" roughness={0.6} />
          </mesh>
          {/* Pages 1 */}
          <mesh position={[0.01, 0.03, 0]}>
            <boxGeometry args={[0.49, 0.05, 0.6]} />
            <meshStandardMaterial color="#fcf8f2" roughness={0.7} />
          </mesh>

          {/* Book 2 (Middle, Burgundy) */}
          <mesh position={[-0.02, 0.082, 0.01]} rotation={[0, Math.PI / 18, 0]} castShadow>
            <boxGeometry args={[0.48, 0.05, 0.58]} />
            <meshStandardMaterial color="#7f1d1d" roughness={0.6} />
          </mesh>
          {/* Pages 2 */}
          <mesh position={[-0.015, 0.082, 0.01]} rotation={[0, Math.PI / 18, 0]}>
            <boxGeometry args={[0.47, 0.04, 0.56]} />
            <meshStandardMaterial color="#fcf8f2" roughness={0.7} />
          </mesh>

          {/* Book 3 (Top, Dark Green) */}
          <mesh position={[0.01, 0.125, -0.01]} rotation={[0, -Math.PI / 24, 0]} castShadow>
            <boxGeometry args={[0.45, 0.045, 0.54]} />
            <meshStandardMaterial color="#064e3b" roughness={0.6} />
          </mesh>
          {/* Pages 3 */}
          <mesh position={[0.015, 0.125, -0.01]} rotation={[0, -Math.PI / 24, 0]}>
            <boxGeometry args={[0.44, 0.035, 0.52]} />
            <meshStandardMaterial color="#fcf8f2" roughness={0.7} />
          </mesh>
        </group>
      </InteractiveMesh>


      {/* ==========================================
       * INTERACTIVE ITEM 4: OPEN AGENDA / TABLET (Teaching)
       * ========================================== */}
      <InteractiveMesh 
        label="Teaching & Tutoring" 
        position={[-1.2, 0.91, 0.25]} 
        rotation={[0, Math.PI / 6, 0]}
        onClick={() => onSelectSection("teaching")}
        baseScale={1}
        hoverScale={1.08}
      >
        <group>
          {/* Agenda Leather Spine/Cover */}
          <mesh position={[0, 0.01, 0]} castShadow>
            <boxGeometry args={[0.56, 0.02, 0.42]} />
            <meshStandardMaterial color="#78350f" roughness={0.7} />
          </mesh>
          
          {/* Left Page */}
          <mesh position={[-0.12, 0.02, 0]} rotation={[0, 0, 0.02]}>
            <boxGeometry args={[0.22, 0.015, 0.36]} />
            <meshStandardMaterial color="#fafaf9" roughness={0.8} />
          </mesh>

          {/* Right Page */}
          <mesh position={[0.12, 0.02, 0]} rotation={[0, 0, -0.02]}>
            <boxGeometry args={[0.22, 0.015, 0.36]} />
            <meshStandardMaterial color="#fafaf9" roughness={0.8} />
          </mesh>

          {/* Glowing Bookmark thread */}
          <mesh position={[0.0, 0.022, 0.1]} rotation={[0.05, 0, 0]}>
            <boxGeometry args={[0.02, 0.01, 0.22]} />
            <meshBasicMaterial color={activeTime.themeColor} />
          </mesh>
        </group>
      </InteractiveMesh>


      {/* ==========================================
       * INTERACTIVE ITEM 5: HANGING WHITEBOARD (Talks)
       * ========================================== */}
      <InteractiveMesh 
        label="Talks & Presentations" 
        position={[-7.95, 2.3, -2.5]} 
        rotation={[0, Math.PI / 2, 0]}
        onClick={() => onSelectSection("talks")}
        baseScale={1}
        hoverScale={1.02}
      >
        <group>
          {/* Wooden/Aluminum frame */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[2.0, 1.3, 0.04]} />
            <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.7} />
          </mesh>
          {/* Whiteboard gloss surface */}
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.9, 1.2]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.15} />
          </mesh>

          {/* Interactive Whiteboard Content (Edge AI Architecture Nodes + Text Schedule) */}
          <group position={[0, 0, 0.032]}>
            {/* System Nodes */}
            {/* Node 1: IoT Sensors */}
            <mesh position={[-0.55, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.01, 24]} />
              <meshStandardMaterial color="#64748b" roughness={0.5} />
            </mesh>
            <Text position={[-0.55, 0.42, 0.01]} fontSize={0.035} color="#0f172a" anchorX="center" anchorY="bottom">
              {"[IoT]"}
            </Text>

            {/* Connection Arrow 1 */}
            <mesh position={[-0.275, 0.28, 0]}>
              <boxGeometry args={[0.2, 0.015, 0.005]} />
              <meshBasicMaterial color="#94a3b8" />
            </mesh>

            {/* Node 2: Edge Node */}
            <mesh position={[0.0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.09, 0.01, 24]} />
              <meshStandardMaterial color={activeTime.themeColor} roughness={0.2} />
            </mesh>
            <Text position={[0.0, 0.42, 0.01]} fontSize={0.038} color={activeTime.accentDark} anchorX="center" anchorY="bottom">
              {"[Edge AI]"}
            </Text>

            {/* Connection Arrow 2 */}
            <mesh position={[0.275, 0.28, 0]}>
              <boxGeometry args={[0.2, 0.015, 0.005]} />
              <meshBasicMaterial color="#94a3b8" />
            </mesh>

            {/* Node 3: Cloud Node */}
            <mesh position={[0.55, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.01, 24]} />
              <meshStandardMaterial color="#64748b" roughness={0.5} />
            </mesh>
            <Text position={[0.55, 0.42, 0.01]} fontSize={0.035} color="#0f172a" anchorX="center" anchorY="bottom">
              {"[Cloud]"}
            </Text>

            {/* Schedule text on whiteboard */}
            <Text
              position={[-0.8, -0.05, 0]}
              fontSize={0.042}
              color="#0f172a"
              anchorX="left"
              anchorY="top"
              maxWidth={1.6}
              lineHeight={1.45}
            >
              {"UPCOMING TALKS & SEMINARS\n• LF Conf 2025: Real-time Edge AI twins\n• DIMES Seminars: Opportunistic consistency\n• IEEE Workshop: EVD smart city architectures"}
            </Text>
          </group>

          {/* Tech/digital glow highlight border */}
          <mesh position={[0, 0, 0.028]}>
            <planeGeometry args={[1.9, 1.2]} />
            <meshBasicMaterial color={activeTime.themeColor} transparent opacity={0.04} />
          </mesh>
        </group>
      </InteractiveMesh>


      {/* ==========================================
       * INTERACTIVE ITEM 6: DIPLOMA CERTIFICATE (Career)
       * ========================================== */}
      <InteractiveMesh 
        label="Career Summary & CV" 
        position={[7.95, 2.3, -4.0]} 
        rotation={[0, -Math.PI / 2, 0]}
        onClick={() => onSelectSection("career")}
        baseScale={1}
        hoverScale={1.04}
      >
        <group>
          {/* Black Frame */}
          <mesh position={[0, 0, 0]} castShadow>
            <boxGeometry args={[1.1, 1.4, 0.04]} />
            <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.5} />
          </mesh>
          {/* Passpartout/Board */}
          <mesh position={[0, 0, 0.023]}>
            <planeGeometry args={[1.0, 1.3]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.8} />
          </mesh>
          {/* Certificate Paper */}
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[0.75, 1.05]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.9} />
          </mesh>

          {/* Gold Seal Emblem */}
          <mesh position={[0, -0.36, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.005, 12]} />
            <meshBasicMaterial color="#fbbf24" />
          </mesh>

          {/* Certificate SDF Text details */}
          <group position={[0, 0, 0.028]}>
            <Text
              position={[0, 0.38, 0]}
              fontSize={0.038}
              color="#1e293b"
              anchorX="center"
              anchorY="middle"
            >
              {"UNIVERSITY OF CALABRIA"}
            </Text>
            <Text
              position={[0, 0.28, 0]}
              fontSize={0.022}
              color="#64748b"
              anchorX="center"
              anchorY="middle"
            >
              {"DEPARTMENT OF DIMES"}
            </Text>
            <Text
              position={[0, 0.08, 0]}
              fontSize={0.032}
              color="#0f172a"
              anchorX="center"
              anchorY="middle"
              lineHeight={1.2}
            >
              {"DOCTOR OF PHILOSOPHY\nIN ICT"}
            </Text>
            <Text
              position={[0, -0.12, 0]}
              fontSize={0.024}
              color="#334155"
              anchorX="center"
              anchorY="middle"
              lineHeight={1.3}
            >
              {"Awarded to:\nVincenzo Barbuto\nYear 2025"}
            </Text>
          </group>

          {/* Tech digital glow highlight */}
          <mesh position={[0, 0, 0.026]}>
            <planeGeometry args={[0.75, 1.05]} />
            <meshBasicMaterial color={activeTime.themeColor} transparent opacity={0.06} />
          </mesh>
        </group>
      </InteractiveMesh>


      {/* ==========================================
       * LIVED-IN DESK ACCESSORIES
       * ========================================== */}
      {/* SLEEK METAL KEYBOARD (in front of main monitor) */}
      <group position={[0.6, 0.905, 0.2]} rotation={[0, -Math.PI / 18, 0]}>
        {/* Keyboard Frame */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.01, 0.16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Keycaps Grid */}
        <mesh position={[0, 0.006, 0]}>
          <boxGeometry args={[0.48, 0.008, 0.14]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
      </group>

      {/* SLEEK METAL MOUSE */}
      <group position={[0.95, 0.905, 0.22]} rotation={[0, -Math.PI / 10, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.016, 0.1]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Scroll wheel */}
        <mesh position={[0, 0.009, -0.02]}>
          <boxGeometry args={[0.008, 0.006, 0.02]} />
          <meshBasicMaterial color={activeTime.themeColor} />
        </mesh>
      </group>

      {/* CERAMIC COFFEE MUG (next to the laptop) */}
      <group position={[-0.9, 0.905, 0.35]}>
        {/* Mug Cylindrical Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.14, 16]} />
          <meshStandardMaterial color="#f97316" roughness={0.2} /> {/* Sleek orange glaze */}
        </mesh>
        {/* Coffee surface */}
        <mesh position={[0, 0.062, 0]}>
          <cylinderGeometry args={[0.054, 0.054, 0.01, 16]} />
          <meshStandardMaterial color="#451a03" roughness={0.9} />
        </mesh>
        {/* Mug Handle */}
        <mesh position={[-0.07, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.04, 0.012, 8, 16]} />
          <meshStandardMaterial color="#f97316" roughness={0.2} />
        </mesh>
      </group>

      {/* PEN HOLDER CUP */}
      <group position={[0.1, 0.905, -0.3]}>
        {/* Cup */}
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.13, 16, 1, true]} />
          <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Cup Inner base */}
        <mesh position={[0, -0.06, 0]}>
          <cylinderGeometry args={[0.046, 0.046, 0.01, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        {/* Pens */}
        <mesh position={[-0.01, 0.06, 0.01]} rotation={[0.15, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.5} />
        </mesh>
        <mesh position={[0.01, 0.06, -0.01]} rotation={[-0.1, -0.05, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.16, 8]} />
          <meshStandardMaterial color="#ef4444" roughness={0.5} />
        </mesh>
        <mesh position={[0.01, 0.05, 0.02]} rotation={[0.05, -0.15, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.13, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} />
        </mesh>
      </group>

      {/* MODERN WIREFRAME TRASH BIN (Under the desk) */}
      <mesh position={[-1.4, 0.25, 0.3]} castShadow>
        <cylinderGeometry args={[0.16, 0.12, 0.5, 16, 1, true]} />
        <meshStandardMaterial color="#334155" wireframe roughness={0.5} />
      </mesh>

      {/* SCATTERED RESEARCH PAPERS */}
      {/* Paper 1 */}
      <mesh position={[0.0, 0.902, -0.1]} rotation={[-Math.PI / 2, 0, Math.PI / 8]} receiveShadow>
        <planeGeometry args={[0.21, 0.297]} />
        <meshStandardMaterial color="#fafaf9" roughness={0.85} side={2} />
      </mesh>
      {/* Paper 2 */}
      <mesh position={[-1.2, 0.902, -0.1]} rotation={[-Math.PI / 2, 0, -Math.PI / 10]} receiveShadow>
        <planeGeometry args={[0.21, 0.297]} />
        <meshStandardMaterial color="#fafaf9" roughness={0.85} side={2} />
      </mesh>
      {/* Paper 3 */}
      <mesh position={[1.1, 0.902, -0.2]} rotation={[-Math.PI / 2, 0, Math.PI / 6]} receiveShadow>
        <planeGeometry args={[0.21, 0.297]} />
        <meshStandardMaterial color="#fafaf9" roughness={0.85} side={2} />
      </mesh>


      {/* ==========================================
       * COZY DESK LAMP (Interactive Theme Toggle)
       * ========================================== */}
      <InteractiveMesh 
        label="Cycle Time of Day" 
        position={[-1.8, 0.91, -0.3]} 
        onClick={onToggleLights}
        baseScale={1}
        hoverScale={1.08}
      >
        <group>
          {/* Base */}
          <mesh position={[0, 0.015, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.16, 0.03, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.8} />
          </mesh>
          
          {/* Stand */}
          <mesh position={[0.05, 0.22, 0.05]} rotation={[0, 0, -Math.PI / 12]} castShadow>
            <cylinderGeometry args={[0.018, 0.018, 0.44, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
          </mesh>
          
          {/* Neck */}
          <mesh position={[0.12, 0.42, 0.05]} rotation={[0, 0, Math.PI / 4]} castShadow>
            <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
          </mesh>

          {/* Lamp shade */}
          <mesh position={[0.2, 0.48, 0.05]} rotation={[0, 0, -Math.PI / 3]}>
            <cylinderGeometry args={[0.1, 0.07, 0.2, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
          </mesh>
          
          {/* Bulb */}
          <mesh position={[0.22, 0.45, 0.05]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color={bulbColor} />
          </mesh>

          {/* Real PointLight casting onto the wood desk (active at Twilight) */}
          <pointLight 
            position={[0.22, 0.38, 0.05]} 
            color={bulbColor} 
            intensity={activeTime.deskLampIntensity} 
            distance={3.2} 
            decay={1.4}
            castShadow
            shadow-bias={-0.001}
          />
        </group>
      </InteractiveMesh>
    </group>
  );
}
