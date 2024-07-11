"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { searchMovies } from "./actions";
import { Result, ResultCode } from "@/lib/types";
import Image from "next/image";
import { formatter } from "@/lib/utils";

export default function Page() {
  const [result, dispatch] = useFormState(searchMovies, {
    data: [],
    code: ResultCode.Success,
  });

  return (
    <div className="max-w-screen-xl mx-auto px-8 py-12 text-center">
      <header>
        <h1 className="text-2xl md:text-4xl font-bold">
          Movies Semantic Search
        </h1>
      </header>

      <form action={dispatch} className="mt-10">
        <div className="flex items-center rounded-xl gap-4 bg-gray-100 p-2">
          <input
            type="text"
            name="query"
            placeholder="Search for a movie..."
            className="grow h-12 rounded-lg px-4 text-xl"
            // defaultValue="best anima from miyazaki"
          />
          <button
            type="submit"
            className="h-12 text-xl px-4 bg-emerald-500 text-white rounded-lg"
          >
            Search
          </button>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <ResultData result={result} />
        </div>
      </form>
    </div>
  );
}

function ResultData({ result }: { result: Result | undefined }) {
  const status = useFormStatus();

  if (status.pending) {
    return <div>Loading...</div>;
  }

  return result?.data.map((movie) => (
    <Link
      key={movie.metadata?.movie_id}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
      href={movie.metadata?.imdb_link || ""}
      target="_blank"
      prefetch={false}
    >
      <Image
        src={movie.metadata?.poster_link!}
        alt={movie.metadata?.name!}
        width={180}
        height={270}
        className="w-full object-cover object-top"
      />

      <div className="p-4">
        <h3 className="font-bold text-xl">{movie.metadata?.name}</h3>

        <div className="mt-4 flex justify-center flex-wrap gap-1 text-sm">
          <KeyValue label="Release" value={movie.metadata?.release_year!} />
          <KeyValue
            label="Vote"
            value={formatter.format(parseInt(movie.metadata?.vote_count!))}
          />
          <KeyValue label="Rating" value={movie.metadata?.vote_average!} />
          <KeyValue label="Popularity" value={movie.metadata?.popularity!} />
          <KeyValue label="Relevance" value={movie.score.toFixed(2)} />
          <KeyValue label="Score" value={movie.total.toFixed(2)} />
          {/*formatter.format(value)*/}
        </div>
      </div>
    </Link>
  ));
}

function KeyValue({ label, value }: { label: string; value: number | string }) {
  return (
    <p className="bg-zinc-100 rounded-lg px-2 py-0.5">
      <span className="opacity-50">{label}:</span> <span>{value}</span>
    </p>
  );
}
