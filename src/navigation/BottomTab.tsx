import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import { BottomTabParamList } from "@/types";
import colors from "@/constants/colors";
import DiscoverNavigator from "./DiscoverNavigator";
import Collection from "@/screens/Collection";
import SearchNavigator from "./SearchNavigator";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTab() {
   return (
      <Tab.Navigator
         screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            tabBarStyle: {
               backgroundColor: "rgba(0,0,0,0.9)",
               borderTopWidth: 0,
               position: "absolute",
               left: 0,
               right: 0,
               bottom: 0,
               height: Platform.OS == "ios" ? 85 : 50,
            },
         }}
      >
         <Tab.Screen
            name="Discover"
            component={DiscoverNavigator}
            options={{
               tabBarIcon: ({ color }) => (
                  <Ionicons name="compass" size={30} color={color} />
               ),
            }}
         />
         <Tab.Screen
            name="Search"
            component={SearchNavigator}
            options={{
               tabBarIcon: ({ color }) => (
                  <Feather name="search" color={color} size={30} />
               ),
            }}
         />
         <Tab.Screen
            name="Collection"
            component={Collection}
            options={{
               tabBarIcon: ({ color }) => (
                  <Ionicons name="folder" size={30} color={color} />
               ),
            }}
         />
      </Tab.Navigator>
   );
}
