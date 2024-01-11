/* REACT */
import React, { useState } from "react";
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    FlatList 
} from "react-native";

/* PLUGINS */
import { useRouter } from "expo-router";

/* CONSTANTS */
import { icons, SIZES } from "../../../constants";

/* STYLES */
import styles from "./welcome.style";

const job_types = ["Full time", "Part time", "Contractor"];

const Welcome = ({search_term, setSearchTerm, handleClick}) => {

    const router = useRouter();
    const [active_job_type, setActiveJobType] = useState("Full-time");

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello Jhones</Text>
                <Text style={styles.welcomeMessage}>Find your perfect job</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput 
                        style={styles.searchInput}
                        value={search_term}
                        onChangeText={(text_value) => setSearchTerm(text_value)}
                        placeholder="What are you looking for?"
                    />
                </View>

                <TouchableOpacity 
                    style={styles.searchBtn}
                    onPress={handleClick}    
                >
                    <Image 
                        source={icons.search}
                        resizeMode="contain"
                        style={styles.searchBtnImage}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.tabsContainer}>
                <FlatList 
                    keyExtractor={item => item}
                    data={job_types}
                    renderItem={({item}) => (
                        <TouchableOpacity 
                            style={styles.tab(active_job_type, item)}
                            onPress={() => {
                                setActiveJobType(item);
                                router.push(`/search/${item}`);
                            }}
                        >
                            <Text style={styles.tabText(active_job_type, item)} >{item}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                    contentContainerStyle={{columnGap: SIZES.small}}
                />
            </View>
        </View>
    )
}

export default Welcome