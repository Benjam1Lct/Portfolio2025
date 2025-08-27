"use client";

import * as THREE from "three";
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float, Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from "gsap";

export default function Shapes(){
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: true }}
        dpr={[1,1.5]}
        camera={{ position: [0,0,25], fov:30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <ModelsScene />
          <ContactShadows position={[0, -3.5, 0]} opacity={0.65} scale={40} blur={1} far={9}/>
          <Environment preset="studio"/>
        </Suspense>
      </Canvas>
    </div>
  )
}

function ModelsScene() {
  const [clickedModels, setClickedModels] = useState(new Set())
  const [showMain2, setShowMain2] = useState(false)
  
  const modelPositions = [
    { path: "/3d-models/main.glb", position: [0, 0, 6], scale: 4, id: "main", rotation: [0, Math.PI-0.3, 0] },
    { path: "/3d-models/sub1.glb", position: [4, 3, -2], scale: 2, id: "sub1", rotation: [0, Math.PI-0.5, 0] },
    { path: "/3d-models/sub2.glb", position: [-3, -3, 7], scale: 0.25, id: "sub2", rotation: [0, Math.PI+1, 0] },
    { path: "/3d-models/sub3.glb", position: [3, -2, 4], scale: 0.5, id: "sub3", rotation: [0, Math.PI+1, 0] },
    { path: "/3d-models/sub4.glb", position: [-4, 2.5, -1], scale: 0.3, id: "sub4", rotation: [0, 1, 0] }
  ]

  const soundEffects = [
    new Audio("/sounds/knock1.ogg"),
    new Audio("/sounds/knock2.ogg"),
    new Audio("/sounds/knock3.ogg"),
  ]

  const handleModelClick = (modelId) => {
    const newClickedModels = new Set(clickedModels)
    newClickedModels.add(modelId)
    setClickedModels(newClickedModels)
    
    const sound = gsap.utils.random(soundEffects)
    sound.currentTime = 0
    sound.play().catch(console.warn)
    
    if (newClickedModels.size === 5) {
      setTimeout(() => {
        setClickedModels(new Set(['disappearing']))
        setTimeout(() => {
          setShowMain2(true)
        }, 2200)
      }, 800)
    }
  }

  if (showMain2) {
    return <Main2Model onReset={() => {
      setShowMain2(false)
      setClickedModels(new Set())
    }} />
  }

  return (
    <>
      {modelPositions.map((model, index) => (
        <Model3D
          key={model.id}
          path={model.path}
          position={model.position}
          scale={model.scale}
          rotation={model.rotation}
          delay={index * 0.2}
          isClicked={clickedModels.has(model.id)}
          shouldDisappear={clickedModels.has('disappearing')}
          onClick={() => handleModelClick(model.id)}
          hide={showMain2}
        />
      ))}
    </>
  )
}

function Model3D({ path, position, scale = 1, rotation = [0, 0, 0], delay = 0, isClicked = false, shouldDisappear = false, onClick, hide = false }) {
  const { scene } = useGLTF(path)
  const modelRef = useRef()
  const groupRef = useRef()
  const containerRef = useRef()
  const [visible, setVisible] = useState(false)
  
  const clonedScene = scene.clone()

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
      if (groupRef.current) {
        gsap.fromTo(groupRef.current.scale, 
          { x: 0, y: 0, z: 0 },
          {
            x: 1, y: 1, z: 1,
            duration: 1.2,
            ease: "elastic.out(0.6, 0.4)",
            delay: 0.1,
          }
        )
        gsap.fromTo(containerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
            delay: 0.1,
          }
        )
        gsap.fromTo(groupRef.current.rotation,
          { y: Math.PI * 2 },
          {
            y: 0,
            duration: 1.5,
            ease: "power2.out",
            delay: 0.2
          }
        )
      }
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (shouldDisappear && groupRef.current && !hide) {
      gsap.to(groupRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 1.2,
        ease: "power2.in",
        delay: Math.random() * 0.5,
      })
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1.0,
        ease: "power2.in",
        delay: Math.random() * 0.3,
      })
      gsap.to(groupRef.current.rotation, {
        y: `+=${Math.PI * 3}`,
        duration: 1.2,
        ease: "power2.in"
      })
    }
  }, [shouldDisappear, hide])

  useEffect(() => {
    if (hide && containerRef.current) {
      gsap.to(containerRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.6,
        ease: "back.in(1.7)",
      })
      if (groupRef.current) {
        gsap.to(groupRef.current.rotation, {
          y: `+=${Math.PI * 2}`,
          duration: 0.6,
          ease: "power2.in"
        })
      }
    } else if (!hide && containerRef.current && visible) {
      gsap.to(containerRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      })
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      if (groupRef.current) {
        gsap.set(groupRef.current.rotation, { y: 0 })
      }
    }
  }, [hide, visible])

  const handleClick = (e) => {
    e.stopPropagation()
    if (groupRef.current && !isClicked) {
      const currentRotationY = groupRef.current.rotation.y
      gsap.to(groupRef.current.rotation, {
        y: currentRotationY + Math.PI * 2,
        duration: 1,
        ease: "power2.inOut",
      })
      gsap.to(groupRef.current.scale, {
        x: 1.15, y: 1.15, z: 1.15,
        duration: 0.5,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      })
      onClick()
    }
  }

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer"
    if (groupRef.current && !isClicked && !hide) {
      gsap.to(groupRef.current.scale, {
        x: 1.1, y: 1.1, z: 1.1,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const handlePointerOut = () => {
    document.body.style.cursor = "default"
    if (groupRef.current && !isClicked && !hide) {
      gsap.to(groupRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={containerRef} position={position} visible={visible}>
        <group
          ref={groupRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <primitive
            ref={modelRef}
            object={clonedScene}
            rotation={rotation}
            scale={[scale, scale, scale]}
          />
        </group>
      </group>
    </Float>
  )
}

// Main2Model — stop music at end of zoom, face camera, click = spin
function Main2Model({ onReset }) {
  const { scene } = useGLTF("/3d-models/main2.glb");
  const mainScene = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef();
  const containerRef = useRef();
  const animationRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    if (!containerRef.current || !groupRef.current) return;

    // Préparer musique
    audioRef.current = new Audio("/easterEgg.mp3");
    audioRef.current.volume = 0.7;
    audioRef.current.loop = false;

    gsap.set(containerRef.current.scale, { x: 0.8, y: 0.8, z: 0.8 });
    gsap.set(containerRef.current.position, { x: 0, y: -3, z: -8 });
    gsap.set(containerRef.current, { opacity: 0 });
    gsap.set(groupRef.current.rotation, { y: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Intro
    tl.to(containerRef.current, { opacity: 1, duration: 0.6 })
      .to(containerRef.current.position, { z: -2, y: -1, duration: 1.2 }, 0.2)
      .call(() => {
        audioRef.current?.play().catch(() => {});
      }, null, "+=1")

      .to(groupRef.current.rotation, { y: Math.PI * 2, duration: 1.5, ease: "power2.inOut" })
      .to({}, { duration: 0.8 })
      .to(groupRef.current.rotation, { y: Math.PI * 4, duration: 2.5, ease: "power2.inOut" })
      .to({}, { duration: 1.4 })
      // Lancer la musique avec 1s de retard
      

    // Zoom finishes at 14s with fast spin
    const current = tl.duration();
    const zoomDuration = Math.max(0, 14 - current);
    tl.to(containerRef.current.scale, { x: 8, y: 8, z: 8, duration: zoomDuration }, "zoom")
      .to(containerRef.current.position, { z: 6, duration: zoomDuration }, "zoom")
      // Rotation rapide pendant le zoom
      .to(groupRef.current.rotation, { y: "+=" + Math.PI * 80, ease: "none", duration: zoomDuration }, "zoom")
      // Stop musique brusquement et remettre le chat face caméra
      .call(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        gsap.to(groupRef.current.rotation, { y: 0, duration: 0.05, ease: "none" });
      }, null, "zoom+=" + zoomDuration);

    animationRef.current = tl;

    return () => {
      if (animationRef.current) animationRef.current.kill();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [mainScene]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: "+=" + Math.PI * 2,
        duration: 1,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.7}>
      <group ref={containerRef} position={[0, 0, 0]}>
        <group
          ref={groupRef}
          onClick={handleClick}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <primitive object={mainScene} rotation={[0, Math.PI * 0.25, 0]} scale={1} />
        </group>
      </group>
    </Float>
  );
}

// Précharger tous les modèles
useGLTF.preload("/3d-models/main.glb")
useGLTF.preload("/3d-models/main2.glb")
useGLTF.preload("/3d-models/sub1.glb")
useGLTF.preload("/3d-models/sub2.glb")
useGLTF.preload("/3d-models/sub3.glb")
useGLTF.preload("/3d-models/sub4.glb")
