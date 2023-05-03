const baseUrl = "https://api.themoviedb.org/3";

const posterUrl = (size?: "w185" | "w342" | "w500" | "w780") =>
   `https://image.tmdb.org/t/p/${size || "w342"}`;

const backdropUrl = (size?: "w300" | "w780" | "w1280" | "original") =>
   `https://image.tmdb.org/t/p/${size || "w1280"}`;

export default {
   baseUrl,
   posterUrl,
   backdropUrl,
};
