"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { searchMovies } from "./actions";
import { Result, ResultCode } from "@/lib/types";

export default function Page() {
  const [result, dispatch] = useFormState(searchMovies, {
    data: [],
    code: ResultCode.Success,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movie Search Engine</h1>

      <form action={dispatch}>
        <div className="flex items-center border-b border-gray-300 py-2">
          <input
            type="text"
            name="query"
            placeholder="Search for a movie..."
            className="flex-1 mr-4 px-2 focus:outline-none"
            defaultValue="best anima from miyazaki"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>

        <ResultData result={result} />
      </form>
    </div>
  );
}

function ResultData({ result }: { result: Result | undefined }) {
  const status = useFormStatus();

  if (status.pending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {result?.data.map((movie) => (
        <div
          key={movie.metadata?.movie_id}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <Link
            href={movie.metadata?.imdb_link || ""}
            target="_blank"
            prefetch={false}
          >
            <img
              src={movie.metadata?.poster_link}
              alt={movie.metadata?.name}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{movie.metadata?.name}</h3>
              <p>Release Date: {movie.metadata?.release_year}</p>
              <p>Id: {movie.id}</p>
              <p>Vote Count: {movie.metadata?.vote_count}</p>
              <p>Rating: {movie.metadata?.vote_average}</p>
              <p>Popularity: {movie.metadata?.popularity}</p>
              <p>Relevance: {movie.score.toFixed(2)}</p>
              <p>Score: {movie.total.toFixed(2)}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
