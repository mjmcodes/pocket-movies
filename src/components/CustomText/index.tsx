import typography from "@/constants/typography";
import { StyleProp, Text, TextStyle } from "react-native";
import colors from "@/constants/colors";

type Props = {
   text: string;
   color?: keyof typeof colors;
   font?: keyof typeof typography.fonts;
   size?: keyof typeof typography.sizes;
   styles?: StyleProp<TextStyle>;
   maxLines?: number;
};

export function CustomText({
   color,
   font,
   size,
   styles,
   text,
   maxLines,
}: Props) {
   return (
      <Text
         numberOfLines={maxLines}
         style={[
            {
               fontFamily: typography.fonts[font || "regular"],
               color: colors[color || "text"],
               fontSize: typography.sizes[size || "base"],
            },
            styles,
         ]}
      >
         {text}
      </Text>
   );
}
