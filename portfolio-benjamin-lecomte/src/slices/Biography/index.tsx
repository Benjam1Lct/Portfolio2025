import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText, PrismicImage } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Avatar from "./Avatar";

/**
 * Props for `Biography`.
 */
export type BiographyProps = SliceComponentProps<Content.BiographySlice>;

/**
 * Component for "Biography" Slices.
 */
const Biography: FC<BiographyProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-10 gap-y-6 md:grid-cols-[2fr, 2fr]">
        <Heading as="h1" size="xl" className="col-start-1 dark:text-slate-200 text-slate-950">
          {slice.primary.heading}
        </Heading>
        <div className="prose prose-xl prose-slate prose-invert col-start-1 text-slate-800 dark:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-slate-100">
          <PrismicRichText field={slice.primary.description}></PrismicRichText>
        </div>
        <Button linkField={slice.primary.button_link} label={slice.primary.button_text} className="scale-[1.2] translate-x-3"></Button>
      
        <Avatar image={slice.primary.avatar} className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"/>
      </div>
    </Bounded>
  );
};

export default Biography;
