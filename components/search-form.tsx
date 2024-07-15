import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export default function SearchForm({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) {
  const status = useFormStatus();

  return (
    <div className="flex flex-col sm:flex-row max-w-screen-md mx-auto items-center rounded-xl gap-4">
      <input
        type="search"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="grow w-full sm:w-auto h-12 rounded-lg border border-emerald-500/40 px-4 text-xl"
        disabled={status.pending}
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
