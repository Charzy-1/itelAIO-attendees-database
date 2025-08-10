// Importing necessary modules from React and @react-three libraries
import { Suspense } from 'react'; // Allows deferring rendering of components until their data is ready
import { Canvas } from '@react-three/fiber'; // Provides the canvas element for rendering 3D content
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'; // OrbitControls for camera interaction, Preload to preload assets, useGLTF for loading GLTF models

import CanvasLoader from '../Loader'; // Custom loader component that shows a loading state during model loading

// Earth component responsible for rendering the GLTF model
const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf'); // Load the GLTF model using the useGLTF hook

  return (
    // Rendering the loaded GLTF model as a primitive 3D object
    <primitive
      object={earth.scene} // The scene property contains the 3D model
      scale={2.5} // Scaling the model to 2.5x its original size
      position-y={0} // Positioning the model at y=0
      rotation-y={0} // No rotation on the y-axis
    />
  );
};

// EarthCanvas component responsible for setting up the 3D scene and controls
const EarthCanvas = () => {
  return (
    <Canvas
      shadows // Enable shadows for objects in the scene
      frameloop="demand" // Render only when needed (on-demand frame rendering)
      gl={{ preserveDrawingBuffer: true }} // Preserve the content of the canvas after rendering
      camera={{ near: 0.1, position: [-4, 3, 6], fov: 45 }} // Set up camera parameters: near clipping, position, and field of view
    >
      <Suspense fallback={<CanvasLoader />}> {/* Wrap components in Suspense to display CanvasLoader while loading */}
        <OrbitControls
          autoRotate // Automatically rotate the camera around the object
          enableZoom={false} // Disable zoom functionality
          maxPolarAngle={Math.PI / 2} // Restrict upward rotation to 90 degrees (prevents flipping the camera)
          minPolarAngle={Math.PI / 2} // Lock downward rotation at 90 degrees
        />
        <Earth /> {/* Render the Earth component containing the GLTF model */}
        <Preload all /> {/* Preload all assets to ensure smooth rendering */}
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas; // Export the EarthCanvas component as the default export
