import colors from "@/constants/colors";
import dimensions from "@/constants/dimensions";
import { StyleSheet } from "react-native";

const ITEM_WIDTH = dimensions.width * 0.4;

export default StyleSheet.create({
   tileContainer: {
      width: ITEM_WIDTH,
      position: "relative",
   },
   tileImage: {
      height: ITEM_WIDTH * 1.55,
      width: ITEM_WIDTH,
      borderRadius: 4,
      marginBottom: 4,
      overflow: "hidden",
   },
   ratingBox: {
      position: "absolute",
      bottom: 6,
      right: 6,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary,
      padding: 3,
      borderRadius: 4,
   },
});
