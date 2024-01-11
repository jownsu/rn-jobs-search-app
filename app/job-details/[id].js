/* REACT */
import React, { useState } from "react";
import { 
    View, 
    Text, 
    SafeAreaView, 
    ScrollView, 
    RefreshControl
} from "react-native";

/* PLUGINS */
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

/* COMPONENTS */
import { 
    Company, 
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics
} from "../../components";

/* CONSTANTS */
import { COLORS, icons, SIZES } from "../../constants";

/* REQUESTS */
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {

    const params = useGlobalSearchParams();
    const router = useRouter();

    const { data, is_loading, error, fetchData } = useFetch("job-details", {
        job_id: params.id
    });

    const [active_tab, setActiveTab] = useState(tabs[0]);

    const onRefresh = () => {
        fetchData();
    };

    const displayTabContent = () => {
        switch(active_tab){
            case "About":
                return (
                    <JobAbout 
                        info={data[0].job_description ?? "No data provided"}
                    />
                );
            case "Qualifications":
                return (
                    <Specifics 
                        title={active_tab} 
                        points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                    />
                );
            case "Responsibilities":
                return (
                    <Specifics 
                        title={active_tab} 
                        points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                    />
                );
        }
    }

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen 
                options={{
                    headerTitle: "",
                    headerStyle: {backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn 
                            icon_url={icons.left}
                            dimensions="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            icon_url={icons.share}
                            dimensions="60%"
                        />
                    )
                }}
            />

            <>
                <ScrollView 
                    showsHorizontalScrollIndicator={false} 
                    refreshControl={<RefreshControl refreshing={is_loading} onRefresh={onRefresh} />}
                >

                    {
                        !is_loading && error &&
                            <Text>Something went wrong</Text>
                    }

                    {
                        !is_loading && !error && !data.length &&
                            <Text>No Data</Text>
                    }

                    {
                        !is_loading && !error && !!data.length && 
                            <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                                <Company 
                                    company_logo={data[0]?.employer_logo}
                                    job_title={data[0]?.job_title}
                                    company_name={data[0]?.employer_name}
                                    location={data[0]?.job_country}
                                />
                                
                                <JobTabs 
                                    tabs={tabs}
                                    active_tab={active_tab}
                                    setActiveTab={setActiveTab}
                                />

                                { displayTabContent() }

                            </View>
                    }
                </ScrollView>

                <JobFooter 
                    url={data[0]?.job_google_link ?? "https://careers.google.com/jobs/resutls"}
                />
            </>

        </SafeAreaView>
    )
}

export default JobDetails;