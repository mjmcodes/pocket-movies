import React from "react";
import { StyleSheet, Animated, View, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

import { Cast, Movie, MovieTile } from "@/types";
import {
   CustomText,
   MovieInfo,
   CastList,
   HorizontalSlider,
   CoverImage,
} from "@/components";
import colors from "@/constants/colors";
import urls from "@/constants/urls";
import { movieService } from "@/services/movieService";

type Props = NativeStackScreenProps<any>;

type InitialData = {
   movie: Movie;
   cast: Cast[];
   recomended: MovieTile[];
};

export default function MovieDetail({ navigation, route }: Props) {
   const [loading, setLoading] = React.useState(true);
   const [data, setData] = React.useState<InitialData>();

   const yOffset = React.useRef(new Animated.Value(0)).current;

   const fadeOutImage = yOffset.interpolate({
      inputRange: [0, 250],
      outputRange: [1, 0],
      extrapolate: "clamp",
   });

   const headerOpacity = yOffset.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: "clamp",
   });

   React.useEffect(() => {
      navigation.setOptions({
         headerTitle: () => (
            <Animated.View style={{ opacity: headerOpacity }}>
               <CustomText
                  text={movieHeaderTitle()}
                  color="text"
                  styles={{
                     position: "relative",
                  }}
                  font="semiBold"
                  maxLines={1}
               />
            </Animated.View>
         ),
         headerBackground: () => (
            <Animated.View
               style={{
                  backgroundColor: "rgba(0,0,0,0.9)",
                  ...StyleSheet.absoluteFillObject,
                  opacity: headerOpacity,
               }}
            />
         ),
      });
   }, [data, headerOpacity, navigation]);

   useFocusEffect(
      React.useCallback(() => {
         (async () => {
            setLoading(true);
            const results = await Promise.all([
               movieService.getMovie(route.params?.id),
               movieService.getCast(route.params?.id),
               movieService.getRecomended(route.params?.id),
            ]);
            setData({
               movie: results[0],
               cast: results[1],
               recomended: results[2],
            });
            setLoading(false);
         })();
      }, [])
   );

   const movieHeaderTitle = () => {
      if (!data?.movie?.title) return "";
      if (data?.movie.title.length > 30) {
         return `${data?.movie.title.slice(0, 30)}...`;
      }
      return data?.movie.title;
   };

   if (loading)
      return (
         <View
            style={{
               flex: 1,
               justifyContent: "center",
            }}
         >
            <ActivityIndicator />
         </View>
      );

   const movie = data!.movie;

   return (
      <Animated.ScrollView
         onScroll={Animated.event(
            [
               {
                  nativeEvent: {
                     contentOffset: {
                        y: yOffset,
                     },
                  },
               },
            ],
            { useNativeDriver: true }
         )}
         scrollEventThrottle={16}
      >
         <CoverImage
            imageUrl={urls.backdropUrl() + data?.movie.backdrop_path}
            opacity={fadeOutImage}
         />

         <MovieInfo movie={movie} />

         <CastList cast={data!.cast} />

         {data!.recomended.length > 0 && (
            <View style={{ marginTop: 16 }}>
               <HorizontalSlider
                  title="You might also like"
                  items={data!.recomended}
                  onPressItem={(id) =>
                     navigation.navigate("MovieDetailModal", { id })
                  }
               />
            </View>
         )}
      </Animated.ScrollView>
   );
}
