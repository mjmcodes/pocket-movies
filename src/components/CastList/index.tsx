import dimensions from "@/constants/dimensions";
import { Image, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";

import { FlatList } from "react-native";
import { Cast } from "@/types";
import { CustomText } from "../CustomText";
import urls from "@/constants/urls";

const ITEM_SIZE = dimensions.width * 0.42;

export const CastList = ({ cast }: { cast: Cast[] }) => {
   const renderItem = ({ item }: { item: Cast }) => (
      <View style={styles.container}>
         <Image
            style={styles.image}
            source={{ uri: urls.posterUrl() + item.profile_path }}
         />
         <CustomText
            text={item.name}
            font="semiBold"
            size="sm"
            styles={{ textAlign: "center" }}
         />
         <CustomText
            text={item.character}
            maxLines={1}
            size="sm"
            color="text2"
            styles={{ textAlign: "center" }}
         />
      </View>
   );

   const memoizedCastLisItem = useMemo(() => renderItem, []);

   return (
      <View style={{ marginTop: 16 }}>
         <CustomText
            text="The Cast"
            styles={{ paddingLeft: 16, marginBottom: 12 }}
            size="lg"
            font="semiBold"
         />
         <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={cast}
            keyExtractor={(item) => `${item.id}`}
            renderItem={memoizedCastLisItem}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: ITEM_SIZE,
      overflow: "hidden",
      alignItems: "center",
   },
   image: {
      height: dimensions.height * 0.15,
      width: dimensions.height * 0.15,
      borderRadius: (dimensions.height * 0.15) / 2,
      resizeMode: "cover",
      marginBottom: 8,
   },
});
