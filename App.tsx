import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useCachedResources } from "@/hooks";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
   const isLoadingComplete = useCachedResources();

   if (!isLoadingComplete) {
      return null;
   } else {
      return (
         <SafeAreaProvider>
            <StatusBar style="light" />
            <RootNavigator />
         </SafeAreaProvider>
      );
   }
}
