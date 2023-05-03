import React from "react";
import { Animated, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import colors from "@/constants/colors";
import dimensions from "@/constants/dimensions";

type Props = {
   imageUrl: string;
   opacity: Animated.AnimatedInterpolation<string | number>;
};

export const CoverImage = ({ opacity, imageUrl }: Props) => {
   return (
      <Animated.View style={[styles.container, { opacity }]}>
         <LinearGradient
            style={styles.gradient}
            colors={["transparent", colors.background]}
         />
         <Image
            style={{ height: "100%", width: "100%", opacity: 0.8 }}
            source={{ uri: imageUrl }}
         />
      </Animated.View>
   );
};

export default CoverImage;

const styles = StyleSheet.create({
   container: {
      height: dimensions.height * 0.64,
      marginBottom: -dimensions.height * 0.2,
   },
   gradient: {
      position: "absolute",
      bottom: 0,
      left: 0,
      height: dimensions.height * 0.4,
      width: "100%",
      zIndex: 2,
   },
});
