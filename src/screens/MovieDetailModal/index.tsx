import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { Cast, Movie, DiscoverScreenNavigationProps } from "@/types";
import { movieService } from "@/services/movieService";
import urls from "@/constants/urls";
import { CastList, MovieInfo } from "@/components";
import dimensions from "@/constants/dimensions";

const MovieDetailModal = ({
   navigation,
   route,
}: DiscoverScreenNavigationProps) => {
   const [movie, setMovie] = useState<Movie>();
   const [cast, setCast] = useState<Cast[]>([]);

   useEffect(() => {
      navigation.setOptions({
         title: movie?.title,
      });
   }, [navigation, movie]);

   useFocusEffect(
      useCallback(() => {
         (async () => {
            const id = route.params.id;
            const results = await Promise.all([
               movieService.getMovie(id),
               movieService.getCast(id),
            ]);
            setMovie(results[0]);
            setCast(results[1]);
         })();
      }, [])
   );

   if (!movie) return null;
   return (
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
         <Image
            style={styles.image}
            source={{ uri: urls.backdropUrl() + movie.backdrop_path }}
         />

         <MovieInfo movie={movie} />

         <CastList cast={cast} />
      </ScrollView>
   );
};

export default MovieDetailModal;

const styles = StyleSheet.create({
   image: {
      height: dimensions.height * 0.3,
      width: "100%",
      marginBottom: 16,
   },
});
