import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';

// Importing all exports from the 'maath/random' module (ES module build) and aliasing them as 'random'
import * as random from 'maath/random/dist/maath-random.esm';

const Stars = (props) => {
  // Ref to store the Points object
  const ref = useRef();

  // Generating random positions for stars in a spherical distribution
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });

  // Using the useFrame hook to rotate the stars over time
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.1; // Rotate stars slowly on the y-axis
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Points component with ref for animation */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false} // Fixed typo from 'deptWrite' to 'depthWrite'
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas
