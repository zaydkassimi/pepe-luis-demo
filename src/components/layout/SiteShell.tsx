import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileReservationBar } from "@/components/layout/MobileReservationBar";

/**
 * Page shell shared by `/` and `/menu`.
 *
 * The navbar is fixed, so `pt` on <main> reserves its initial height and stops
 * the hero heading from starting underneath it.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="contenu" className="pt-20 lg:pt-24">
        {children}
      </main>
      <Footer />
      <MobileReservationBar />
    </>
  );
}