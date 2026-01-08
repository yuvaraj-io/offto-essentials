import Header from "@/components/business/common/Header";
import { BusinessProvider } from "@/context/BusinessContext";

export default function BusinessProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <BusinessProvider>
    <Header />
    {children}
    </BusinessProvider>;
}
