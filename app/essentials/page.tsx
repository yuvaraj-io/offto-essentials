
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Discuss
        </h1>

        <p className="mt-4 text-muted-foreground">
          Next.js + Tailwind + shadcn/ui starter
        </p>

        <div className="mt-8">
  
          <Button size="lg">Get Started</Button>
        </div>
      </main>
    </>
  );
}