import { BusinessProvider } from "@/context/BusinessContext";

export default function BusinessProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <BusinessProvider>{children}</BusinessProvider>;
}
