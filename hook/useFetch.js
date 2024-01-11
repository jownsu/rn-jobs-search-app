import { useState, useEffect } from "react";
import axios from "axios";
import { RAPID_API_KEY } from "@env";

const rapid_api_key = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [is_loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const options = {
        method: "GET",
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {...query},
        headers: {
          "X-RapidAPI-Key": rapid_api_key,
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
        }
    };

    const fetchData = async (options_params = null) => {
        setIsLoading(true);
        setError(null);

        try{
            let request_options = options;
            
            if(options_params){
                request_options = {
                    ...request_options,
                    new_options: options_params
                }
            }

            const response = await axios.request(request_options);
            setData(response.data.data);
        } 
        catch(error){
            setError(error);
            alert("There is an error");            
        }
        finally{
            setIsLoading(false);
        }
    }

    return {
        data,
        is_loading,
        error,
        fetchData
    };
}

export default useFetch;

/* params: {
    query: "Python developer in Texas, USA",
    page: "1",
    num_pages: "1"
  }, */