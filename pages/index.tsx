import SearchBox from "../components/SearchBox";
import Head from "next/head";

export default function Search() {
  return (
    <>
      <Head>
        <title>Fou-khine</title>
      </Head>
      <main className="mt-5 mx-5">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Fou-khine</h1>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4 text-gray-700">Search for local weather</h2>
          <div className="mb-4">
            <SearchBox />
          </div>
        </form>
      </main>
    </>
  );
}
