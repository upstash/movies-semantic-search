import { Result, ResultCode } from "@/lib/types";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { formatter } from "@/lib/utils";
import KeyValue from "@/components/tag";

export default function ResultData({
  state,
  onChangeQuery = () => {},
}: {
  state: Result | undefined;
  onChangeQuery: (q: string) => void;
}) {
  const status = useFormStatus();

  const handleClick = (query: string) => {
    onChangeQuery(query);
  };

  if (status.pending) {
    return <div>Loading...</div>;
  }

  if (state?.code === ResultCode.UnknownError) {
    return (
      <div className="text-red-600">
        <h3>An error occurred, please try again.</h3>
      </div>
    );
  }

  if (state?.code === ResultCode.MinLengthError) {
    return (
      <div className="text-red-600">
        <h3>
          Please enter at least 2 characters to start searching for movies.
        </h3>
      </div>
    );
  }

  if (state?.code === ResultCode.Empty) {
    return (
      <ol className="mt-24 grid gap-6 text-lg font-light">
        <li>
          <h4 className="opacity-60">
            Search movies by title, genre, or description...
          </h4>
          <button
            type="submit"
            className="underline"
            onClick={() => handleClick("a romantic comedy set in New York")}
          >
            a romantic comedy set in New York
          </button>
        </li>

        <li>
          <h4 className="opacity-60">
            Find movies by plot, characters, or themes...
          </h4>
          <button
            type="submit"
            className="underline"
            onClick={() =>
              handleClick("a movie where a detective solves a mystery")
            }
          >
            a movie where a detective solves a mystery
          </button>
        </li>

        <li>
          <h4 className="opacity-60">
            Type a movie’s storyline, genre, or cast...
          </h4>
          <button
            type="submit"
            className="underline"
            onClick={() => handleClick("a fantasy film with dragons")}
          >
            a fantasy film with dragons
          </button>
        </li>
      </ol>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
      {state?.data.map((movie) => (
        <Link
          key={movie.metadata?.movie_id}
          className="hover:shadow-2xl hover:border-gray-500 transition bg-white border border-gray-200 rounded-2xl overflow-hidden"
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
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
