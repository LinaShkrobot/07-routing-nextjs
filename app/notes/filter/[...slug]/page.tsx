type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function FilterPage({ params }: Props) {
  await params;
  return null;
}
