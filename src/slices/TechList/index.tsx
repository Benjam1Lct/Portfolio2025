"use client"

import React, { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import { MdCircle } from "react-icons/md";
import Bounded from "@/components/Bounded";
import {gsap} from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger)
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList: FC<TechListProps> = ({ slice }) => {

  const component = useRef(null)

  useEffect(()=>{
    let ctx = gsap.context(()=>{

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 6,
        }
      })
      
      tl.fromTo(
        ".tech-row", 
        {
          x: (index)=>{
            return index % 2 === 0 
              ? gsap.utils.random(600, 400) 
              : gsap.utils.random(-600, -400);
          }
        },
        {
          x: (index)=>{
            return index % 2 === 0 
              ? gsap.utils.random(-600, -400) 
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut"
        }
      )


    }, component)
    return ()=> ctx.revert()
  })

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading size="xl" className="mb-8 text-slate-100" as="h2">
          {slice.primary.heading}
        </Heading>
      </Bounded>
      
      {slice.primary.repeatable_zone.map((item, index) => (
        <div 
          key={index} 
          className="tech-row mb-8 flex items-center justify-center gap-4 text-gray-300"
          aria-label={item.tech_name || undefined}
        >
          {Array.from({length: 15} , (_, index) => (
            <React.Fragment key={index}>
              <span 
              className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
              style={{
                color: index === 7 && item.tech_color ? item.tech_color : "inherit",
              }}
              >
                {item.tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle/>
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
