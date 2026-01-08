import Header from "@/components/business/common/Header";
import { Button } from "@/components/ui/button";
import AddressForm from "@/components/business/common/AddressForm";

export default function Home() {

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Discuss
        </h1>

        <p className="mt-4 text-muted-foreground">
          Next.js + Tailwind + shadcn/ui starter
        </p>

        <div className="mt-8">
          <AddressForm />
          <Button size="lg">Get Started</Button>
        </div>
      </main>
    </>
  );
}