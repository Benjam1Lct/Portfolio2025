"use client"

import { FC, useEffect, useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {gsap} from "gsap"
import Bounded from "@/components/Bounded";
import Shapes from "./Shapes";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {


  const component = useRef(null)

  useEffect (() =>{
    let ctx = gsap.context(()=>{
      const tl = gsap.timeline()

      tl.fromTo(".name-animation", {
        x: -100, 
        opacity: 0, 
        rotate: -10,
      },{
        x:0, 
        opacity:1, 
        rotate: 0,
        duration:1,
        ease: "back.out(2)",
        transformOrigin: "left top",
        stagger: {
          each: 0.1,
          from: "random",
        }
      })

      tl.fromTo(".job-title", {
        y: 20,
        opacity: 0,
        scale: 1.2,
      },{
        opacity:1,
        y:0,
        scale:1,
        duration:0.5,
        ease: "back.out(2)",
      })

    }, component)
      return () => ctx.revert();
  }, [])



  const renderLetters = (name:KeyTextField, key:string) => {
    if (!name) return;
    return name.split("").map((letter, index)=> (
      <span key={index} className={`name-animation name-animation-${key} inline-block opacity-0`}>
        {letter}
      </span>
    ))
  }

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes></Shapes>
        <div className="col-start-1 md:row-start-1">
          <h1 className="mb-8 text-[clamp(3rem,12vmin,12rem)] font-extrabold leading-none tracking-tighter" aria-label={slice.primary.first_name + " " + slice.primary.last_name}>
            <span className="block text-gray-50">{renderLetters(slice.primary.first_name, "first")}</span>
            <span className="-mt-[.2em] block text-gray-50">{renderLetters(slice.primary.last_name, "last")}</span>
          </h1>
          <span className="job-title block text-[#F2A0B6] font-bold text-2xl uppercase tracking-[.2em] opacity-0 md:text-4xl">{slice.primary.tag_line}</span>
        </div>
        
      </div>
      
    </Bounded>
  );
};

export default Hero;
