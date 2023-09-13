import Link from 'next/link';

export default function StoreMenuNav() {
  return (
    <nav className="fixed bottom-0 left-0 flex w-full h-16 items-center justify-center bg-white shadow-xl">
      <Link
        href="/cart"
        type="button"
        className="btn btn-xl bg-yellow-400 hover:bg-yellow-300 duration-300 px-10 text-lg"
      >
        장바구니/결제
      </Link>
    </nav>
  );
}
