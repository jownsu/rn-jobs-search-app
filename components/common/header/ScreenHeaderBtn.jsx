/* REACT */
import React from "react";
import { TouchableOpacity, Image } from "react-native";

/* STYLES */
import styles from "./screenheader.style";

const ScreenHeaderBtn = ({icon_url, dimensions, handlePress}) => {
    return (
        <TouchableOpacity 
            style={styles.btnContainer}
            onPress={handlePress}
        >
            <Image 
                source={icon_url}
                resizeMode="cover"
                style={styles.btnImg(dimensions)}
            />
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn