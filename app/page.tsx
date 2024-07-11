"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { searchMovies } from "./actions";
import { Result, ResultCode } from "@/lib/types";
import Image from "next/image";
import { cn, formatter } from "@/lib/utils";

export default function Page() {
  const [result, dispatch] = useFormState(searchMovies, {
    data: [],
    code: ResultCode.Empty,
  });

  return (
    <div className="max-w-screen-xl mx-auto px-8 py-12 text-center">
      <header>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-emerald-900">
          Movies Semantic Search
        </h1>
      </header>

      <form action={dispatch} className="mt-10">
        <SearchForm />

        <div className="mt-10">
          <ResultData result={result} />
        </div>
      </form>
    </div>
  );
}

function SearchForm() {
  const status = useFormStatus();

  return (
    <div className="flex flex-col sm:flex-row max-w-screen-md mx-auto items-center rounded-xl gap-4">
      <input
        type="search"
        name="query"
        placeholder="Search for a movie..."
        className="grow w-full sm:w-auto h-12 rounded-lg border border-emerald-500/40 px-4 text-xl"
        disabled={status.pending}
        // defaultValue="best anima from miyazaki"
      />
      <button
        type="submit"
        className={cn(
          "h-12 w-full sm:w-auto text-xl px-4 bg-emerald-500 text-white rounded-lg",
          status.pending && "opacity-50",
        )}
        disabled={status.pending}
      >
        Search
      </button>
    </div>
  );
}

function ResultData({ result }: { result: Result | undefined }) {
  const status = useFormStatus();

  if (status.pending) {
    return <div>Loading...</div>;
  }

  if (result?.code === ResultCode.UnknownError) {
    return (
      <div className="text-red-600">
        <h3>An error occurred, please try again.</h3>
      </div>
    );
  }

  if (result?.code === ResultCode.MinLengthError) {
    return (
      <div className="text-red-600">
        <h3>
          Please enter at least 2 characters to start searching for movies.
        </h3>
      </div>
    );
  }

  if (result?.code === ResultCode.Empty) {
    return (
      <ol className="mt-24 grid gap-4 text-lg font-light">
        <li>
          <h4 className="opacity-60">
            Search movies by title, genre, or description...
          </h4>
          <ul>
            <li className="">a romantic comedy set in New York</li>
          </ul>
        </li>
        <li>
          <h4 className="opacity-60">
            Find movies by plot, characters, or themes...
          </h4>
          <ul>
            <li className="">a movie where a detective solves a mystery</li>
          </ul>
        </li>
        <li>
          <h4 className="opacity-60">
            Type a movie’s storyline, genre, or cast...
          </h4>
          <ul>
            <li className="">a fantasy film with dragons</li>
          </ul>
        </li>
      </ol>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
      {result?.data.map((movie) => (
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

            <div className="mt-4 flex justify-center flex-wrap gap-1.5 text-sm">
              <KeyValue label="Release" value={movie.metadata?.release_year!} />
              <KeyValue
                label="Vote"
                value={formatter.format(parseInt(movie.metadata?.vote_count!))}
              />
              <KeyValue label="Rating" value={movie.metadata?.vote_average!} />
              <KeyValue
                label="Popularity"
                value={movie.metadata?.popularity!}
              />
              <KeyValue label="Relevance" value={movie.score.toFixed(2)} />
              <KeyValue label="Score" value={movie.total.toFixed(2)} />
              {/*formatter.format(value)*/}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function KeyValue({ label, value }: { label: string; value: number | string }) {
  return (
    <p className="bg-zinc-100 rounded-lg px-2 py-0.5">
      <span className="">{label}:</span>{" "}
      <span className="font-semibold">{value}</span>
    </p>
  );
}
