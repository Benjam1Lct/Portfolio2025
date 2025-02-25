import { isFilled, DateField, Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";

export default async function ContentBody({page}: {
    page: Content.BlogPostDocument | Content.ProjectDocument
}) {
 
    function formatDate(date: DateField){
        if (isFilled.date(date)){

            const dateOptions: Intl.DateTimeFormatOptions = {
                weekday:"long",
                year: "numeric",
                month: "long",
                day:"numeric",
            }

            return new Intl.DateTimeFormat("en-US", dateOptions).format(new Date(date))
        }

        
    }

    const formattedDate = formatDate(page.data.date)

    

    return (
        <Bounded as="article">

            <div className="rounded-2xl bg-black/75 px-4 py-10 md:px-8 md:py-12 z-1000 border-2 border-slate-600">
                <div className="relative rounded max-w-fit">
                {/* Ombre gauche */}
                <div className="z-10 absolute left-0 top-0 rounded h-full w-4 bg-gradient-to-r from-white via-white to-transparent pointer-events-none"></div>

                {/* Liste avec scroll horizontal */}
                <div className="flex gap-4 text-black max-w-fit bg-white px-4 rounded-[10px] py-2 text-xl font-bold overflow-x-auto scrollbar-hide relative">
                    {page.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                    ))}
                </div>

                {/* Ombre droite */}
                <div className="z-10 absolute right-0 top-0 rounded h-full w-4 bg-gradient-to-l from-white via-white to-transparent pointer-events-none"></div>
                </div>


                <Heading as="h1" className="mt-8">
                    {page.data.title}
                </Heading>
                
                <p className="py-4 mt-4 border-b-2 border-slate-600 text-xl font-medium text-slate-300">
                    {formattedDate}
                </p>
                <div className="prose prose-lg prose-invert mt-8 w-full max-w-none md:mt-12 text-slate-300 prose-strong:text-slate-50 prose-headings:text-slate-50 ">
                    <SliceZone slices={page.data.slices} components={components} />
                </div>
            </div>
        </Bounded>
    );
}