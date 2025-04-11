import { Alert } from "react-native";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3/",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `${TMDB_CONFIG.BASE_URL}search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endPoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    Alert.alert("Error", `Failed to fetch movies: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};
