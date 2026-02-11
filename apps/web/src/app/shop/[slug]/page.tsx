interface Props {
  params: { slug: string };
}

export default function ProductDetailsPage({ params }: Props) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">Produit: {params.slug}</h1>
      <p className="mt-2 text-slate-300">Détails, avis, stock, mode de livraison, CTA achat.</p>
    </main>
  );
}
