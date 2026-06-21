"use client";

import { useEffect, useState } from "react";
import { getLenis } from "@/lib/lenis";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Testimonial from "@/components/Testimonial";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // Lock scroll while the preloader is on screen.
  useEffect(() => {
    const lenis = getLenis();
    if (!loaded) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
  }, [loaded]);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <Navbar start={loaded} />

      <main>
        <Hero start={loaded} />
        <About />
        <Services />
        <Marquee />
        <Work />
        <Stats />
        <Process />
        <Testimonial />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
