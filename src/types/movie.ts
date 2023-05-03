import { Genre } from "./genre";

export type Movie = {
   id: number;
   backdrop_path: string;
   title: string;
   video: boolean;
   vote_average: number;
   vote_count: number;
   overview: string;
   popularity: number;
   poster_path: string;
   release_date: string;
   genres: Genre[];
   budget: number;
   homepage: string;
   revenue: number;
   runtime: number;
};
