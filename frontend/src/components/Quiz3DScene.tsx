import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FloatingBook, FloatingTrophy, FloatingBrain, FloatingLightbulb } from './Quiz3DModel';

export default function Quiz3DScene() {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
        
        {/* 3D Models positioned in a circle */}
        <group>
          <group position={[-3, 1, 0]}>
            <FloatingBook />
          </group>
          <group position={[3, 1, 0]}>
            <FloatingTrophy />
          </group>
          <group position={[-3, -1.5, 0]}>
            <FloatingBrain />
          </group>
          <group position={[3, -1.5, 0]}>
            <FloatingLightbulb />
          </group>
        </group>
      </Canvas>
    </div>
  );
}
