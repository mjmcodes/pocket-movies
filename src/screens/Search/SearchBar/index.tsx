import {
   ActivityIndicator,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import React from "react";
import { Feather, Ionicons } from "@expo/vector-icons";

import colors from "@/constants/colors";
import typography from "@/constants/typography";
import { movieService } from "@/services/movieService";
import { MovieTile } from "@/types";
import { CustomText } from "@/components";

type Props = {
   onSearchCompleted: (searchQuery: string, results: MovieTile[]) => void;
};

const SearchBar = ({ onSearchCompleted }: Props) => {
   const [query, setQuery] = React.useState("");
   const [isLoading, setLoading] = React.useState(false);
   const [timer, setTimer] = React.useState<any>();

   React.useEffect(() => {
      clearTimeout(timer);
      if (!isLoading) setLoading(true);
      if (!query) {
         setLoading(false);
         onSearchCompleted("", []);
         return;
      }
      setTimer(
         setTimeout(() => {
            (async () => {
               const movies = await movieService.searchMovie(query);
               setLoading(false);
               onSearchCompleted(query, movies);
            })();
         }, 1000)
      );
   }, [query]);

   return (
      <View style={styles.container}>
         <View style={styles.inputWrapper}>
            {isLoading ? (
               <ActivityIndicator size={20} />
            ) : (
               <Feather name="search" color={colors.text2} size={20} />
            )}

            <TextInput
               style={styles.input}
               placeholder="Search..."
               placeholderTextColor={colors.text2}
               autoCapitalize="none"
               value={query}
               autoCorrect={false}
               onChangeText={(text) => setQuery(text)}
            />
            {query.trim().length > 0 && (
               <TouchableOpacity onPress={() => setQuery("")}>
                  <CustomText text="Clear" color="text2" />
               </TouchableOpacity>
            )}
         </View>
         <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="white" />
         </TouchableOpacity>
      </View>
   );
};

export default SearchBar;

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      flexDirection: "row",
      alignItems: "center",
   },
   inputWrapper: {
      backgroundColor: "rgba(255,255,255,0.1)",
      height: 48,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      flex: 1,
   },
   input: {
      flex: 1,
      color: "white",
      fontSize: 16,
      fontFamily: typography.fonts.regular,
      paddingLeft: 16,
   },
   filterButton: {
      height: 48,
      width: 32,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      marginLeft: 8,
   },
});
