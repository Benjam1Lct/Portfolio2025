"use client"

import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ButtonProject from "@/components/ButtonProject";

/**
 * Props for `ExternalLink`.
 */
export type ExternalLinkProps = SliceComponentProps<Content.ExternalLinkSlice>;

/**
 * Component for "ExternalLink" Slices.
 */
const ExternalLink: FC<ExternalLinkProps> = ({ slice }) => {
  return (
    <ButtonProject
      linkField={slice.primary.link}
      label={slice.primary.title}
      className="w-full h-[70px] my-4"
    />
  );
};

export default ExternalLink;
