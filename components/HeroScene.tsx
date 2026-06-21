"use client";

import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Signature hero 3D element: a slowly rotating wireframe icosahedron with an
 * electric-blue edge glow that reacts to the mouse.
 *
 * The pointer is tracked from a GLOBAL window listener (not R3F's state.pointer)
 * because the canvas wrapper uses pointer-events-none so it never receives its
 * own pointer events. A shared ref carries normalized [-1, 1] coordinates into
 * the render loop.
 *
 * Falls back to a static CSS element on touch / reduced-motion.
 */

type Pointer = { x: number; y: number };

function Icosahedron({ pointer }: { pointer: React.RefObject<Pointer> }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!group.current || !inner.current) return;
    const p = pointer.current;

    // Continuous slow spin on the inner mesh.
    inner.current.rotation.y += delta * 0.15;
    inner.current.rotation.x += delta * 0.05;

    // Pronounced parallax tilt of the whole group toward the pointer (damped).
    const targetX = p.y * 0.6;
    const targetY = p.x * 0.9;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.08;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.08;

    // Subtle positional drift so it clearly "follows" the cursor.
    const targetPosX = p.x * 0.35;
    const targetPosY = p.y * 0.25;
    group.current.position.x += (targetPosX - group.current.position.x) * 0.06;
    group.current.position.y += (targetPosY - group.current.position.y) * 0.06;
  });

  const meshProps: ThreeElements["mesh"] = { ref: inner };

  return (
    <group ref={group}>
      <mesh {...meshProps}>
        <icosahedronGeometry args={[1.5, 0]} />
        {/* Dark faceted body */}
        <meshStandardMaterial
          color="#0b0b0d"
          metalness={0.6}
          roughness={0.35}
          flatShading
        />
        {/* Glowing accent edges */}
        <Edges threshold={1} color="#4a7bf7" />
      </mesh>
    </group>
  );
}

function StaticFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="h-48 w-48 rotate-12 border border-[var(--color-accent)]/60"
        style={{
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          boxShadow: "0 0 60px rgba(74,123,247,0.25)",
        }}
      />
    </div>
  );
}

export default function HeroScene() {
  const [mode, setMode] = useState<"loading" | "3d" | "static">("loading");
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    // Only fall back to the static shape for reduced-motion users. The real
    // 3D renders on mobile too (it's a single low-poly mesh — cheap enough).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(reduce ? "static" : "3d");
  }, []);

  // Track the global pointer regardless of canvas pointer-events. Using
  // pointermove covers mouse AND touch-drag, so the shape reacts to finger
  // movement (including while scrolling) on phones.
  useEffect(() => {
    if (mode !== "3d") return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode]);

  if (mode === "loading") return null;
  if (mode === "static") return <StaticFallback />;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 3, 5]} intensity={40} color="#4a7bf7" />
      <pointLight position={[-5, -3, 2]} intensity={15} color="#ffffff" />
      <Icosahedron pointer={pointer} />
    </Canvas>
  );
}
