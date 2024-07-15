"use client";

import { useFormState } from "react-dom";
import { searchMovies } from "./actions";
import { ResultCode } from "@/lib/types";
import SearchForm from "@/components/search-form";
import ResultData from "@/components/result-data";
import { useState } from "react";

const initialState = {
  data: [],
  code: ResultCode.Empty,
};

export default function Page() {
  const [state, formAction] = useFormState(searchMovies, initialState);
  const [query, setQuery] = useState<string>("");

  const onChangeQuery = (q: string) => {
    setQuery(q);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-8 py-12 text-center">
      <header>
        <h1
          onClick={() => window.location.reload()}
          className="cursor-pointer text-3xl md:text-5xl font-semibold tracking-tight text-emerald-900"
        >
          Movies Semantic Search
        </h1>
      </header>

      <form action={formAction} className="mt-10">
        <SearchForm query={query} setQuery={setQuery} />

        <div className="mt-10">
          <ResultData state={state} onChangeQuery={onChangeQuery} />
        </div>
      </form>
    </div>
  );
}
