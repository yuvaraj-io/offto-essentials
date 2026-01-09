import Header from "@/components/business/common/Header";
import { BusinessProvider } from "@/context/BusinessContext";

export default function BusinessProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <BusinessProvider>
    <Header />
    <div className="mx-auto max-w-7xl items-center justify-between px-6">
      {children}
    </div>
    </BusinessProvider>;
}
