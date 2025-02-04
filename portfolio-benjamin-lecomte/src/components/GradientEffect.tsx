"use client";

import React, { useEffect, useRef } from "react";

const GradientEffect: React.FC = () => {
  const interBubbleRef = useRef<HTMLDivElement | null>(null); // Typage de la ref

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    // Fonction pour déplacer l'élément interactif
    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;

      // Si la ref existe, appliquer la transformation
      if (interBubbleRef.current) {
        interBubbleRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }

      requestAnimationFrame(move);
    };

    // Événement mousemove pour mettre à jour les coordonnées cibles
    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Démarrer le mouvement
    move();

    // Nettoyage de l'événement quand le composant est démonté
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="absolute w-full h-full top-0 left-0 -z-[1000]">
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
          <div className="interactive" ref={interBubbleRef}></div> {/* Utilisation de la ref */}
        </div>
      </div>
    </div>
  );
};

export default GradientEffect;
