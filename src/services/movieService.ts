import { Cast, Movie, MovieTile } from "@/types";
import { axiosClient } from "@/utils/axiosClient";

type MovieDBResponse = {
   page: number;
   results: any[];
};

const getMovie = async (movieID: number): Promise<Movie> => {
   return await axiosClient.get<Movie>(`/movie/${movieID}`);
};

const getMovies = async (
   category: "popular" | "upcoming" | "now_playing",
   page?: 1
): Promise<MovieTile[]> => {
   const response = await axiosClient.get<MovieDBResponse>(
      `/movie/${category}`,
      {
         page,
      }
   );
   return response.results as MovieTile[];
};

const getCast = async (movieID: number): Promise<Cast[]> => {
   const response = await axiosClient.get<any>(`/movie/${movieID}/credits`);
   return response.cast;
};

const getRecomended = async (movieID: number): Promise<MovieTile[]> => {
   const response = await axiosClient.get<MovieDBResponse>(
      `/movie/${movieID}/recommendations`
   );
   return response.results as MovieTile[];
};

const searchMovie = async (query: string) => {
   const response = await axiosClient.get<MovieDBResponse>(`/search/movie`, {
      params: { query },
   });
   return response.results as MovieTile[];
};

export const movieService = {
   getMovie,
   getMovies,
   getCast,
   getRecomended,
   searchMovie,
};
