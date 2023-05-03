import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SearchParamList } from "@/types";
import MovieDetail from "@/screens/MovieDetail";
import Search from "@/screens/Search";
import MovieDetailModal from "@/screens/MovieDetailModal";

const Stack = createNativeStackNavigator<SearchParamList>();

export default function SearchNavigator() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Home"
            component={Search}
            options={{
               headerShown: false,
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
