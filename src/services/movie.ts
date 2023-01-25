import client from "~/utils/http";
import type { Movie } from "~/types/movie";

export async function get_movies(url: "popular" | "top_rated | now_playing") {
  const response = await client.get<{ results: Movie[] }>(`/movie/${url}`);
  return response.data.results;
}

export async function get_movie(id: number) {
  const response = await client.get<Movie>(`/movie/${id}`);
  return response.data;
}
