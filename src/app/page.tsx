import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Signatures } from "@/components/sections/Signatures";
import { Gallery } from "@/components/sections/Gallery";
import { Restaurant } from "@/components/sections/Restaurant";
import { Reservation } from "@/components/sections/Reservation";
import { Contact } from "@/components/sections/Contact";
import { InstagramFeed } from "@/components/sections/InstagramFeed";

export const metadata: Metadata = {
  title: "Restaurant espagnol & fruits de mer à Casablanca",
  description:
    "Pepe Luis, cuisine espagnole et fruits de mer à Casablanca : paella, poulpe grillé et assiettes à partager. Concept web de démonstration.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <Experience />
      <Signatures />
      <Gallery />
      <Restaurant />
      <Reservation />
      <Contact />
      <InstagramFeed />
    </SiteShell>
  );
}