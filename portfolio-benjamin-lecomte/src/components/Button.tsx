import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { MdArrowOutward } from "react-icons/md";



type ButtonProps = {
    linkField: LinkField;
    label: KeyTextField;
    showIcon?: boolean;
    className?: string;
}

export default function Button ({linkField, label,showIcon = true,className}: ButtonProps){
    return (
        <PrismicNextLink 
            field={linkField}
            className={clsx("group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-x-slate-900 bg-slate-50 px-4 py-2 font-bold transition-transform ease-out hover:scale-105", className)}
        >
            <span className="absolute inset-0 z-0 h-full translate-y-9 dark:bg-yellow-300 bg-green-600 transition-transform duration-30 ease-in-out group-hover:translate-y-0"></span>
            <span className="relative flex items-center justify-center gap-2 text-slate-900">
                {label} {showIcon && <MdArrowOutward className="inline-block"/>}
            </span>
        </PrismicNextLink>
    )
}