import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      <section className="mx-auto max-w-6xl px-8 py-24 text-center">
        <h2 className="text-5xl font-bold">Welcome to Salt & Swell</h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-600">
          Every garment is designed with the Australian coastline in mind — premium quality,
          timeless design and made for those who live for weekends by the ocean.
        </p>
      </section>

      <Footer />
    </main>
  );
}
