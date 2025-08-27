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

  // Choisir un background au hasard parmi ceux du dossier public/background
  const backgrounds = [
    '/background/dark-green.jpg',
    '/background/green.jpg',
    '/background/dark-red.jpg',
    '/background/dark-orange.jpg',
    '/background/orange.jpg'
  ];
  const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];

  return (
    <html lang="en" className="text-slate-100 m-0 p-0" style={{height: '100%', minHeight: '100vh'}}>
      <body
        className={clsx(urbanist.className, "min-h-screen w-full relative")}
        style={{
          minHeight: '100vh',
          height: '100%',
          width: '100%',
          background: 'transparent',
        }}
      >
        {/* Background image en fixed pour couvrir tout le scroll */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -2,
            backgroundImage: `url('${randomBg}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Calque noir semi-transparent pour assombrir le background */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: -1,
            background: 'rgba(0,0,0,0.45)',
            pointerEvents: 'none',
          }}
        />
        <Header/>
        {children}
        <Footer/>
      </body>
      <PrismicPreview repositoryName={repositoryName}/>
      <Analytics/>
    </html>
  );
}
