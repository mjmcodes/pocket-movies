import { DarkTheme, NavigationContainer } from "@react-navigation/native";

import colors from "@/constants/colors";
import BottomTab from "./BottomTab";

export default function RootNavigator() {
   return (
      <NavigationContainer
         theme={{
            ...DarkTheme,
            colors: {
               ...DarkTheme.colors,
               background: colors.background,
            },
         }}
      >
         <BottomTab />
      </NavigationContainer>
   );
}
