import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10">
        <p className="mb-2 text-sm text-blue-400">Digital Marketplace Premium</p>
        <h1 className="text-4xl font-bold">Gaming Accounts, Keys, Boosting & Digital Assets</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Plateforme mono-vendeur, exécution rapide, livraison automatique des clés et support premium 24/7.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/shop" className="rounded-lg bg-[#385ac7] px-5 py-3 font-semibold hover:opacity-90">
            Explorer la boutique
          </Link>
          <Link href="/auth/register" className="rounded-lg border border-slate-700 px-5 py-3 font-semibold">
            Créer un compte
          </Link>
        </div>
      </section>
    </main>
  );
}
