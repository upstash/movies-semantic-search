import React from "react";
import { cn } from "@/lib/utils";

export const Info = ({ className }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "rounded-2xl grid gap-4 max-w-2xl mx-auto text-sm bg-indigo-900 text-indigo-100 p-4 sm:p-6",
        className,
      )}
    >
      <p>
        This project is an experiment to demonstrate the scalability of Upstash
        Vector with large datasets. We vectorized <b>23M Wikipedia articles</b>{" "}
        in <b>11 languages</b> and stored <b>4324234 vectors</b> in a single
        Upstash Vector index.
      </p>

      <p>
        <b>
          👉 Check out the{" "}
          <a
            className="underline"
            target="_blank"
            href="https://github.com/upstash/wikipedia-semantic-search"
          >
            github repo
          </a>{" "}
          or the{" "}
          <a
            className="underline"
            target="_blank"
            href="https://upstash.com/blog/indexing-wikipedia"
          >
            blog post
          </a>{" "}
          for more.
        </b>
      </p>
    </div>
  );
};
