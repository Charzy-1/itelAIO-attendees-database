import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf');

  return (
    <mesh>
      {/* Ambient Hemisphere Light */}
      <hemisphereLight intensity={5} groundColor='black' />

      {/* Point Light for Direct Illumination */}
      <pointLight intensity={5} position={[0, 5, 5]} /> {/* Adjusted position for better lighting */}

      {/* Directional Light for Shadows */}
      <directionalLight 
        intensity={0.5} 
        position={[0, 10, 5]} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />

      <primitive
        object={computer.scene}
        scale={isMobile ? [0.5, 0.5, 0.5] : [0.8, 0.8, 0.8]}  // Adjust scale for mobile
        position={isMobile ? [0, -3.05, -1.5] : [0, -3.8, -1.5]}  // Adjust position for mobile
        rotation={[-0.01, -0.2, -0.1]} 
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Media query to detect if the screen width is below 500px (mobile devices)
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set initial value of isMobile based on the media query
    setIsMobile(mediaQuery.matches);

    // Function to handle media query changes
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add event listener for media query changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-10">
      <Canvas 
        frameloop='demand'
        shadows
        camera={{ 
          position: isMobile ? [10, 2, 5] : [20, 3, 5], // Adjust camera position for mobile
          fov: isMobile ? 35 : 25  // Adjust field of view for mobile
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          {/* Pass the isMobile prop to Computers component */}
          <Computers isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default ComputersCanvas;
