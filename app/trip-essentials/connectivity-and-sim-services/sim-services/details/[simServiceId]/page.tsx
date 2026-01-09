import SimServiceClient from "./simServiceClient";

export default async function Page({
  params,
}: {
  params: Promise<{ simServiceId: string }>;
}) {
  const { simServiceId } = await params;

  return <SimServiceClient simServiceId={simServiceId} />;
}
