/* REACT */
import React from "react";
import { 
	View, 
	Text,
	TouchableOpacity,
	Image 
} from "react-native";

/* STYLES */
import styles from "./popularjobcard.style";

const PopularJobCard = ({item, selected_job, handleCardPress}) => {
	return (
		<TouchableOpacity
			style={styles.container(selected_job, item)}
			onPress={() => handleCardPress(item)}
		>
			<TouchableOpacity style={styles.logoContainer(selected_job, item)}>
				<Image 
					source={{uri: item?.employer_logo || "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"}} 
					resizeMode="contain"
					style={styles.logoImage}
				/>
			</TouchableOpacity>
			<Text
				style={styles.companyName}
				numberOfLines={1}
			>
				{item.employer_name}
			</Text>


			<View style={styles.infoContainer}>
				<Text 
					style={styles.jobName(selected_job, item)}
					numberOfLines={1}
				>
					{item.job_title}
				</Text>
				<Text 
					style={styles.location}
					numberOfLines={1}
				>
					{item.job_country}
				</Text>
			</View>
		</TouchableOpacity>
	)
}

export default PopularJobCard