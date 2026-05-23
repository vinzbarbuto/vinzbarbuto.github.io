"use client";
 
import RoomFrame from "./RoomFrame";
import DeskUnit from "./DeskUnit";
import { TimeOfDay } from "./CanvasContainer";
 
interface OfficeSceneProps {
  onSelectSection: (section: string) => void;
  activeTime: TimeOfDay;
  onToggleLights: () => void;
}
 
export default function OfficeScene({
  onSelectSection,
  activeTime,
  onToggleLights,
}: OfficeSceneProps) {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Room Structure & Background particle systems */}
      <RoomFrame activeTime={activeTime} />
 
      {/* Desk and all interactive objects */}
      <DeskUnit 
        onSelectSection={onSelectSection} 
        activeTime={activeTime}
        onToggleLights={onToggleLights}
      />
 
      {/* Decorative Swivel Chair in front of the desk */}
      <group>
        {/* Chair base five-star support */}
        <mesh position={[0, 0.03, 0.95]} castShadow>
          <cylinderGeometry args={[0.22, 0.25, 0.04, 10]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.7} />
        </mesh>
        
        {/* Chair central hydraulic column */}
        <mesh position={[0, 0.25, 0.95]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.38, 8]} />
          <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Chair Seat cushion */}
        <mesh position={[0, 0.46, 0.9]} castShadow>
          <boxGeometry args={[0.55, 0.06, 0.52]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
 
        {/* Chair Seat wireframe border overlay (Digital twin vibe) */}
        <mesh position={[0, 0.46, 0.9]}>
          <boxGeometry args={[0.56, 0.07, 0.53]} />
          <meshBasicMaterial color={activeTime.themeColor} wireframe transparent opacity={0.15} />
        </mesh>
 
        {/* Chair back support spine */}
        <mesh position={[0, 0.68, 1.13]} rotation={[Math.PI / 18, 0, 0]} castShadow>
          <boxGeometry args={[0.04, 0.44, 0.04]} />
          <meshStandardMaterial color="#475569" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Chair Backrest cushion */}
        <mesh position={[0, 0.88, 1.16]} rotation={[Math.PI / 18, 0, 0]} castShadow>
          <boxGeometry args={[0.48, 0.32, 0.05]} />
          <meshStandardMaterial color="#334155" roughness={0.7} />
        </mesh>
 
        {/* Chair Backrest wireframe overlay */}
        <mesh position={[0, 0.88, 1.16]} rotation={[Math.PI / 18, 0, 0]}>
          <boxGeometry args={[0.49, 0.33, 0.06]} />
          <meshBasicMaterial color={activeTime.themeColor} wireframe transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
}
