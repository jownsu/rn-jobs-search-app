/* REACT */
import React from "react";
import { 
	View, 
	Text, 
	TouchableOpacity, 
	ActivityIndicator 
} from "react-native";

/* COMPONENTS */
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

/* PLUGINS */
import { useRouter } from "expo-router";

/* CONSTANTS */
import { COLORS } from "../../../constants";

/* REQUESTS */
import useFetch from "../../../hook/useFetch";

/* STYLES */
import styles from "./nearbyjobs.style";

const Nearbyjobs = () => {
	const router = useRouter();
	const { is_loading, error, data, fetchData } = useFetch("search", {
		query: "Python developer in Texas, USA",
		page: "1",
		num_pages: "1"
	});

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Nearby jobs</Text>
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
					!is_loading && !error && (
						data?.map((job) => (
							<NearbyJobCard 
								key={`nearby-job-${job?.job_id}`}
								job={job}
								handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
							/>
						))
					)
				}
			</View>
		</View>
	)
}

export default Nearbyjobs