import * as Font from "expo-font";
import {
   Poppins_400Regular,
   Poppins_600SemiBold,
   Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export function useCachedResources() {
   const [isLoadingComplete, setLoadingComplete] = useState(false);

   useEffect(() => {
      async function loadResourcesAndDataAsync() {
         try {
            SplashScreen.preventAutoHideAsync();

            // Load fonts
            await Font.loadAsync({
               Poppins_400Regular,
               Poppins_600SemiBold,
               Poppins_700Bold,
            });
         } catch (e) {
            // We might want to provide this error information to an error reporting service
            console.warn(e);
         } finally {
            setLoadingComplete(true);
            SplashScreen.hideAsync();
         }
      }

      loadResourcesAndDataAsync();
   }, []);

   return isLoadingComplete;
}
