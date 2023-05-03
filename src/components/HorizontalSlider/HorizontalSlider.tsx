import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";

import { CustomText } from "../CustomText";
import { Cast, MovieTile } from "@/types";
import { FlatList } from "react-native";

import styles from "./HorizontalSlider.styles";
import urls from "@/constants/urls";

type Props = {
   title: string;
   items: MovieTile[];
   onPressItem: (id: number) => void;
};

export function HorizontalSlider({ title, items = [], onPressItem }: Props) {
   const handlePress = useCallback((id: number) => () => onPressItem(id), []);

   const renderItem = ({ item, index }: { item: MovieTile; index: number }) => {
      return (
         <Pressable
            onPress={handlePress(item.id)}
            style={[styles.tileContainer, { marginLeft: index == 0 ? 16 : 13 }]}
         >
            <Image
               source={{ uri: urls.posterUrl() + item.poster_path }}
               style={styles.tileImage}
            />
            <CustomText
               text={item.title}
               size="sm"
               maxLines={1}
               font="semiBold"
            />
            <CustomText
               text={item.release_date.slice(0, 4)}
               size="sm"
               color="text2"
               font="semiBold"
            />
         </Pressable>
      );
   };

   const memoizedItem = useMemo(() => renderItem, []);

   return (
      <View style={{ marginBottom: 24 }}>
         <CustomText
            text={title}
            size="lg"
            font="semiBold"
            styles={{ paddingLeft: 16, marginBottom: 8 }}
         />
         <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={items}
            keyExtractor={(item) => `${item.id}`}
            maxToRenderPerBatch={6}
            renderItem={memoizedItem}
         />
      </View>
   );
}
