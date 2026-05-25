"use client";
import Hero from "../components/heroSection";
import LatestMaterials from "../components/latestvideos";
import Loading from "../components/loading";
import Testimonials from "../components/testimonials";
import { AppData } from "../context/AppContext";

export default function Home() {
  const { latest, loading } = AppData();

  if (loading) return <Loading />;

  return (
    <div>
      <Hero />
      <Testimonials />
      <LatestMaterials projects={latest} />
    </div>
  );
}
