import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

type Props = {
   onPress?: () => void;
   icon: JSX.Element;
};

export function IconButton({ onPress, icon }: Props) {
   return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
         {icon}
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      height: 52,
      width: 52,
      borderRadius: 52 / 2,
      backgroundColor: "rgba(255,255,255,0.1)",
      alignItems: "center",
      justifyContent: "center",
   },
});
