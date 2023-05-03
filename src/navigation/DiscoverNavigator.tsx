import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DiscoverParamList } from "@/types";
import colors from "@/constants/colors";

import Discover from "@/screens/Discover";
import MovieDetail from "@/screens/MovieDetail";
import MovieDetailModal from "@/screens/MovieDetailModal";

const Stack = createNativeStackNavigator<DiscoverParamList>();

export default function DiscoverNavigator() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            //@ts-ignore
            name="Home"
            component={Discover}
            options={{
               title: "Discover",
               headerLargeTitle: true,
               headerStyle: { backgroundColor: colors.background },
            }}
         />
         <Stack.Screen
            name="MovieDetail"
            component={MovieDetail}
            options={{
               headerBackTitle: "",
               headerTintColor: "white",
               headerTransparent: true,
            }}
         />
         <Stack.Screen
            name="MovieDetailModal"
            component={MovieDetailModal}
            options={{ presentation: "modal" }}
         />
      </Stack.Navigator>
   );
}
