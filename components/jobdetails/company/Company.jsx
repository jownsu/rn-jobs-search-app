/* REACT */
import React from "react";
import { View, Text, Image } from "react-native";

/* CONSTANTS */
import { icons } from "../../../constants";

/* STYLES */
import styles from "./company.style";

const Company = ({company_logo, job_title, company_name, location}) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image 
                    source={{uri: company_logo || "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"}}
                    style={styles.logoImage}
                />
            </View>

            <View style={styles.jobTitleBox}>
                <Text style={styles.jobTitle}>{job_title}</Text>
            </View>

            <View style={styles.companyInfoBox}>
                <Text style={styles.companyName}>{company_name} / </Text>
                <View style={styles.locationBox}>
                    <Image 
                        source={icons.location}
                        resizeMode="contain"
                        style={styles.locationImage}
                    />
                    <Text style={styles.locationName}>{location}</Text>
                </View>
            </View>
        </View>
    )
}

export default Company