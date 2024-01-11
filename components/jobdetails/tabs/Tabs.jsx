/* REACT */
import React from "react";
import { 
	View, 
	Text,
	TouchableOpacity,
	FlatList 
} from "react-native";

/* CONSTANTS */
import { SIZES } from "../../../constants";

/* STYLES */
import styles from "./tabs.style";

const TabButton = ({name, active_tab, onhandleSearchType}) => (
	<TouchableOpacity 
		style={styles.btn(name, active_tab)} 
		onPress={onhandleSearchType}	
	>
		<Text style={styles.btnText(name, active_tab)}>{name}</Text>
	</TouchableOpacity>
);

const Tabs = ({tabs, active_tab, setActiveTab}) => {
	return (
    	<View style={styles.container}>
			<FlatList 
				data={tabs}
				renderItem={({item}) => (
					<TabButton 
						name={item}
						active_tab={active_tab}
						onhandleSearchType={() => setActiveTab(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item}
				contentContainerStyle={{ columnGap: SIZES.small / 2 }}
			/>
    	</View>
  )
}

export default Tabs