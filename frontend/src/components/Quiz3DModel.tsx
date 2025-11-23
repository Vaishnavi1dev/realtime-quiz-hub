import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export function FloatingBook() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.5, 2, 0.3]} />
      <meshStandardMaterial color="#6366f1" metalness={0.5} roughness={0.2} />
      {/* Book spine */}
      <mesh position={[0, 0, -0.15]}>
        <boxGeometry args={[1.5, 2, 0.05]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>
      {/* Book pages */}
      <mesh position={[0.05, 0, 0.16]}>
        <boxGeometry args={[1.4, 1.9, 0.25]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </mesh>
  );
}

export function FloatingTrophy() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + 1) * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Cup */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.6, 0.4, 1, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Handles */}
      <mesh position={[-0.7, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.08, 16, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.7, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.3, 0.08, 16, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 0.4, 32]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function FloatingBrain() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.008;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + 2) * 0.25;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Main brain sphere */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ec4899" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Brain details - left hemisphere bumps */}
      <mesh position={[-0.3, 0.2, 0.3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#db2777" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[-0.4, -0.1, 0.2]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#db2777" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Right hemisphere bumps */}
      <mesh position={[0.3, 0.2, 0.3]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#db2777" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0.4, -0.1, 0.2]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#db2777" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

export function FloatingLightbulb() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + 3) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Bulb */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#fef08a" 
          emissive="#fef08a" 
          emissiveIntensity={0.5}
          metalness={0.1} 
          roughness={0.3} 
        />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.4, 32]} />
        <meshStandardMaterial color="#71717a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Thread */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
        <meshStandardMaterial color="#52525b" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}
