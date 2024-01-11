/* REACT */
import { useCallback } from "react";

/* PLUGINS */
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const Layout = () => {

    const [ fonts_loaded, fonts_error ] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf")
    });

    const onLayout = useCallback(async () => {
        if(fonts_loaded || fonts_error){
            SplashScreen.hideAsync();
        }
    }, [fonts_loaded, fonts_error]);

    if(!fonts_loaded && !fonts_error){
        return null;
    }

    return <Stack onLayout={onLayout} />
}

export default Layout;
