"use client";

import React, { useEffect, useRef, useState } from "react";

const GradientEffect: React.FC = () => {
  const interBubbleRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > 1024); // Définir le seuil pour mobile/tablette
    };

    checkScreenSize(); // Vérifie au chargement
    window.addEventListener("resize", checkScreenSize); // Vérifie au redimensionnement

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // Ne pas exécuter l'effet sur mobile/tablette

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;

      if (interBubbleRef.current) {
        interBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }

      requestAnimationFrame(move);
    };

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDesktop]);

  return (
    <div className="absolute w-full h-full top-0 left-0 -z-[1000]">
      {isDesktop ? (
        <>
          <div className="absolute pointer-events-none -z-40 inset-0 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
          <div className="gradient-bg absolute -z-50 w-full h-full">
            <svg className="svg" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="goo">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
            </svg>
            <div className="gradients-container opacity-75">
              <div className="g1"></div>
              <div className="g2"></div>
              <div className="g3"></div>
              <div className="g4"></div>
              <div className="g5"></div>
              <div className="interactive" ref={interBubbleRef}></div>
            </div>
          </div>
        </>
      ) : (
        // Affichage d'une simple image en arrière-plan pour mobile/tablette
        <div className="relative w-full h-full">
          {/* Image de fond statique */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/Gradient3.png')" }}
          ></div>

          {/* Noise Effect superposé */}
          <div className="absolute inset-0 bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light pointer-events-none"></div>
        </div>
      )}
    </div>
  );
};

export default GradientEffect;
