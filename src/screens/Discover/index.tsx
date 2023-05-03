import React, { memo, useCallback } from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";

import { MovieTile, DiscoverScreenNavigationProps } from "@/types";
import { CustomText, HorizontalSlider } from "@/components";
import { useFocusEffect } from "@react-navigation/native";
import { movieService } from "@/services/movieService";
import { useMemo } from "react";

type MoviesRowCarousel = {
   title: string;
   movies: MovieTile[];
};

export default function Discover({
   navigation,
}: DiscoverScreenNavigationProps) {
   const [sectionList, setSectionList] = React.useState<MoviesRowCarousel[]>(
      []
   );

   useFocusEffect(
      useCallback(() => {
         (async () => {
            let sectionList: MoviesRowCarousel[] = [];

            const results = await Promise.all([
               movieService.getMovies("popular"),
               movieService.getMovies("now_playing"),
               movieService.getMovies("upcoming"),
            ]);

            sectionList.push({ title: "Popular", movies: results[0] });
            sectionList.push({ title: "In Theatres", movies: results[1] });
            sectionList.push({ title: "Comming Soon", movies: results[2] });
            setSectionList(sectionList);
         })();
      }, [])
   );

   const renderItem = ({
      item,
      index,
   }: {
      item: MoviesRowCarousel;
      index: number;
   }) => {
      return (
         <HorizontalSlider
            key={index}
            title={item.title}
            onPressItem={(id) => navigation.navigate("MovieDetail", { id })}
            items={item.movies}
         />
      );
   };

   const memoizedItem = useMemo(() => renderItem, []);

   return (
      <>
         {sectionList.length == 0 ? <CustomText text="Loading.." /> : null}
         <FlatList
            data={sectionList}
            contentInsetAdjustmentBehavior="always"
            keyExtractor={(item) => item.title}
            renderItem={memoizedItem}
         />
      </>
   );
}

const styles = StyleSheet.create({});
