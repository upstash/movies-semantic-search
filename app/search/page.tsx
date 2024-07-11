'use client';

import { useState } from 'react';
import Link from 'next/link';
import { queryMovies } from '../../lib/upstash';


export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const data = await queryMovies(searchTerm);
            setMovies(data);
        } catch (err) {
            setError('Failed to fetch movies. Please try again later.');
            console.error("Error fetching movies:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Movie Search Engine</h1>
            <form onSubmit={handleSearch} className="mb-8">
                <div className="flex items-center border-b border-gray-300 py-2">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 mr-4 px-2 focus:outline-none"
                    />
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Search
                    </button>
                </div>
            </form>
            {loading && <p className="text-center text-gray-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {movies.map((movie) => (
                    <div key={movie.metadata.movie_id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <Link href={movie.metadata.imdb_link} target="_blank" prefetch={false}>
                            <img
                                src={movie.metadata.poster_link}
                                alt={movie.metadata.name}
                                className="w-full h-[300px] object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2">{movie.metadata.name}</h3>
                                <p>Release Date: {movie.metadata.release_year}</p>
                                <p>Id: {movie.id}</p>
                                <p>Vote Count: {movie.metadata.vote_count}</p>
                                <p>Rating: {movie.metadata.vote_average}</p>
                                <p>Popularity: {movie.metadata.popularity}</p>
                                <p>Relevance: {movie.score.toFixed(2)}</p>
                                <p>Score: {movie.total.toFixed(2)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
