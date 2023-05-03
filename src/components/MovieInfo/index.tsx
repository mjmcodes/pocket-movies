import React from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

import { Movie } from "@/types";
import { CustomText } from "../CustomText";
import { IconButton } from "../IconButton";
import movieHelpers from "@/utils/movieHelpers";
import colors from "@/constants/colors";

export const MovieInfo = ({ movie }: { movie: Movie }) => {
   const [showFullOverview, setShowFullOverview] = React.useState(false);

   return (
      <View style={{ paddingHorizontal: 16 }}>
         <CustomText text={movie.title} size="xl" font="semiBold" />

         <View style={[styles.row, { marginTop: 12 }]}>
            <CustomText
               text={movie.release_date.slice(0, 4)}
               size="sm"
               color="text2"
               styles={{ marginRight: 12 }}
            />
            <CustomText
               text={movieHelpers.formatRunTime(movie.runtime)}
               size="sm"
               color="text2"
               styles={{ marginRight: 12 }}
            />
            <View style={styles.ratingBox}>
               <Ionicons name="star" color="white" size={12} />
               <CustomText
                  text={`${movieHelpers.formatRating(movie.vote_average)}`}
                  size="xs"
                  styles={{ marginLeft: 4 }}
               />
            </View>
         </View>

         <View style={[styles.row, { marginTop: 12 }]}>
            {movie.genres.map((genre, index) => {
               const genreIndex = movie.genres.indexOf(genre);
               return (
                  <CustomText
                     key={genre.id}
                     text={`${genre.name} ${
                        genreIndex !== movie.genres.length - 1 ? " • " : ""
                     }`}
                  />
               );
            })}
         </View>

         {movie.overview != "" && (
            <Pressable onPress={() => setShowFullOverview((prev) => !prev)}>
               <CustomText
                  text={movie.overview}
                  styles={{ marginTop: 16 }}
                  color="text2"
                  maxLines={showFullOverview ? undefined : 4}
               />
            </Pressable>
         )}

         <View style={styles.actionRow}>
            <IconButton
               icon={<Ionicons name="heart-outline" color="white" size={22} />}
            />
            <IconButton
               icon={<Ionicons name="share-outline" color="white" size={22} />}
            />
            <IconButton
               icon={
                  <MaterialCommunityIcons
                     name="playlist-plus"
                     color="white"
                     size={22}
                  />
               }
            />
            <TouchableOpacity style={styles.button}>
               <Ionicons name="play" color="white" size={20} />
               <CustomText
                  text="Play trailler"
                  font="semiBold"
                  styles={{ marginLeft: 4 }}
               />
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   row: {
      flexDirection: "row",
      alignItems: "center",
   },
   ratingBox: {
      paddingVertical: 2,
      backgroundColor: colors.primary,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 4,
      paddingHorizontal: 6,
   },
   actionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
   },
   button: {
      height: 52,
      alignContent: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: colors.primary,
      borderRadius: 35,
      flexDirection: "row",
      alignItems: "center",
   },
});
