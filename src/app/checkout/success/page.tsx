import Link from "next/link";

interface SuccessPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { order } = await searchParams;

  return (
    <main className="mx-auto max-w-lg p-6 text-center">
      <h1 className="text-2xl font-bold">Thank you for your order!</h1>
      {order && <p className="mt-2">Your order number is {order}.</p>}
      <Link href="/" className="mt-6 inline-block underline">
        Continue shopping
      </Link>
    </main>
  );
}