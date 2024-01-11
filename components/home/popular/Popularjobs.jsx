/* REACT */
import React, { useState } from "react";
import { 
	View, 
	Text, 
	TouchableOpacity, 
	FlatList, 
	ActivityIndicator 
} from "react-native";

/* COMPONENTS */
import PopularJobCard from "../../common/cards/popular/PopularJobCard";

/* PLUGINS */
import { useRouter } from "expo-router";

/* CONSTANTS */
import { COLORS, SIZES } from "../../../constants";

/* REQUESTS */
import useFetch from "../../../hook/useFetch";

/* STYLES */
import styles from "./popularjobs.style";

const Popularjobs = () => {
	const router = useRouter();
	const { is_loading, error, data, fetchData } = useFetch("search", {
		query: "Python developer in Texas, USA",
		page: "1",
		num_pages: "1"
	});

	const [selected_job, setSelectedJob] = useState();

	const handleCardPress = (item) => {
		router.push(`/job-details/${item.job_id}`);
		setSelectedJob(item.job_id);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Popular jobs</Text>
				<TouchableOpacity>
					<Text style={styles.headerBtn}>Show All</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.cardsContainer}>
				{
					is_loading && !error &&
						<ActivityIndicator size="large" color={COLORS.primary} />
				}

				{
					!is_loading && error && 
						<Text>Something went wrong</Text>
				}

				{
					!is_loading && !error &&
						<FlatList 
							keyExtractor={item => item?.job_id}
							data={data}
							renderItem={({item}) => (
								<PopularJobCard 
									item={item} 
									selected_job={selected_job}
									handleCardPress={handleCardPress}	
								/>
							)}
							contentContainerStyle={{columnGap: SIZES.medium}}
							horizontal
						/>
				}
			</View>
		</View>
	)
}

export default Popularjobs