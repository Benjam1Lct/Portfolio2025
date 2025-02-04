import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from '@/components/Header'
import Footer from "@/components/Footer";
import clsx from "clsx";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName, createClient } from "@/prismicio";
import ToggleTheme from "@/components/toggleTheme";
import { Analytics } from "@vercel/analytics/react";
import GradientEffect from "@/components/GradientEffect";

const urbanist = Urbanist({subsets: ['latin']})

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const settings = await client.getSingle("settings")

  return {
    title: settings.data.meta_title,
    description: settings.data.meta_description
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="bg-black dark:text-slate-100 text-slate-900 m-0 p-0">
      <body
        className={clsx(urbanist.className, "absolute min-h-screen w-full")}
      >
        <Header/>
        {children}
        <Footer/>
        <GradientEffect/>
      </body>
      <PrismicPreview repositoryName={repositoryName}/>
      <Analytics/>
    </html>
  );
}
