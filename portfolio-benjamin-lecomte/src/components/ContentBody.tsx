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

            <div className="rounded-2xl bg-black/75 px-4 py-10 md:px-8 md:py-20">
                <Heading as="h1" className="">
                    {page.data.title}
                </Heading>
                <div className="flex gap-4 mt-6 text-[#7D79D9] text-xl font-bold">
                    {page.tags.map((tag) =>(
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
                <p className="py-4 border-b dark:border-slate-600 border-slate-500 text-xl font-medium dark:text-slate-300 text-slate-600">
                    {formattedDate}
                </p>
                <div className="prose prose-lg prose-invert mt-8 w-full max-w-none md:mt-12 dark:text-slate-300 dark:prose-strong:text-slate-50 dark:prose-headings:text-slate-50 text-slate-700 prose-strong:text-slate-950 prose-headings:text-slate-950">
                    <SliceZone slices={page.data.slices} components={components} />
                </div>
            </div>
        </Bounded>
    );
}