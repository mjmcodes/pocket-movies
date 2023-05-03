import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchBar from "./SearchBar";
import { MovieTile, SearchParamList } from "@/types";

import urls from "@/constants/urls";
import dimensions from "@/constants/dimensions";
import { CustomText } from "@/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const Search = ({
   navigation,
}: NativeStackScreenProps<SearchParamList, "Home">) => {
   const [data, setData] = React.useState<{
      query: string;
      movies: MovieTile[];
   }>();

   return (
      <SafeAreaView>
         <SearchBar
            onSearchCompleted={(query, movies) => {
               setData({ query, movies });
            }}
         />

         {data?.query != "" && data?.movies.length == 0 && (
            <View style={{ paddingVertical: 30 }}>
               <CustomText
                  styles={{ textAlign: "center" }}
                  text={`Sorry coundn't find anything on ${data.query}`}
               />
            </View>
         )}

         <FlatList
            data={data?.movies}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => (
               <Pressable
                  onPress={() =>
                     navigation.navigate("MovieDetail", { id: item.id })
                  }
               >
                  <Image
                     style={styles.posterImage}
                     source={{ uri: urls.posterUrl() + item.poster_path }}
                  />
               </Pressable>
            )}
         />
      </SafeAreaView>
   );
};

export default Search;

const styles = StyleSheet.create({
   title: {
      alignSelf: "center",
      marginTop: 28,
      marginBottom: 30,
   },
   posterImage: {
      width: dimensions.width / 3 - 16,
      height: dimensions.height * 0.2,
      marginBottom: 8,
   },
});
