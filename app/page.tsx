// pages/index.js
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const dummyUserId = "hunnania";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to Farrel</h1>
        <p className="mt-3 text-2xl">
          Discover unique fashion items at unbeatable prices
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link
            href="/shop"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500"
          >
            <h3 className="text-2xl font-bold">Shop Now &rarr;</h3>
            <p className="mt-4 text-xl">
              Browse our collection of curated fashion items.
            </p>
          </Link>

          <Link
            href="/sell"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500"
          >
            <h3 className="text-2xl font-bold">Sell Your Items &rarr;</h3>
            <p className="mt-4 text-xl">
              List your pre-loved fashion items for sale.
            </p>
          </Link>

          <Link
            href="/about"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500"
          >
            <h3 className="text-2xl font-bold">An Admin? &rarr;</h3>
            <p className="mt-4 text-xl">Log in to your admin account here.</p>
          </Link>

          <Link
              href={`/topups/${dummyUserId}`}
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-white focus:text-black transition-colors duration-300 ease-in-out hover:bg-gradient-to-br from-indigo-500 to-purple-500"
          >
            <h3 className="text-2xl font-bold">Top Up &rarr;</h3>
            <p className="mt-4 text-xl">Add Funds for a Seamless Shopping Experience.</p>
          </Link>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p>Farrel &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
