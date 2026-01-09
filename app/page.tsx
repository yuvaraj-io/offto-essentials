import Header from "@/components/static/Header";
import TripEssential from "./trip-essentials/page";

export default function Home() {

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Trip essentials
        </h1>
        <h4>Our Catagories</h4>
        <TripEssential />
      </main>
    </>
  );
}