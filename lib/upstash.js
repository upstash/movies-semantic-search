import { Index } from "@upstash/vector";

const index = new Index({
  url: process.env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_URL,
  token: process.env.NEXT_PUBLIC_UPSTASH_VECTOR_REST_TOKEN,
});

export async function queryMovies(query) {
  try {
    const response = await index.query({
      data: query,
      topK: 50,
      includeVectors: false,
      includeMetadata: true,
    });

    if (!response || !Array.isArray(response)) {
      console.error('Unexpected response structure:', response);
      return [];
    }

    const filteredResponse = response.filter(movie =>
        movie.metadata.poster_link !== null && !movie.metadata.poster_link.endsWith("null")
        && movie.metadata.imdb_link !== 'IMDb link not available');


    // Extract vote counts and ratings for normalization
    const popularity = filteredResponse.map(movie => movie.metadata.popularity ?? 0);
    const ratings = filteredResponse.map(movie => movie.metadata.vote_average ?? 0);


    console.log('popularity:', popularity);

    const minPopularity = Math.min(...popularity);
    const maxPopularity = Math.max(...popularity);
    const minRating = Math.min(...ratings);
    const maxRating = Math.max(...ratings);

    const normalize = (value, min, max) => (value - min) / (max - min);

    const movies = filteredResponse.map((match) => {
      const normalizedPopularity = normalize(match.metadata.popularity, minPopularity, maxPopularity);
      const normalizedRating = normalize(match.metadata.vote_average, minRating, maxRating);
      const relevance = match.score; // Assuming this is already normalized between 0 and 1
      console.log('normalizedPopularity:', normalizedPopularity);
      console.log('max:', maxPopularity);
      console.log('min:', minPopularity)
      const total = (0.5 * normalizedPopularity) + (0.2 * normalizedRating) + (0.3 * relevance);
      return {
        ...match,
        total,
      };
    });

    movies.sort((a, b) => b.total - a.total);

    return movies;
  } catch (error) {
    console.error("Error querying Upstash:", error);
    return [];
  }
}