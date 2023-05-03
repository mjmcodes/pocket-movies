import axios from "axios";
import { MOVIEDB_API_KEY } from "@env";
import queryString from "query-string";

import urls from "@/constants/urls";

const client = axios.create({
   baseURL: urls.baseUrl,
   params: {
      api_key: MOVIEDB_API_KEY,
      language: "en-US",
      region: "US",
   },
   paramsSerializer: {
      serialize: (params) => queryString.stringify({ ...params }),
   },
});

const get = async <T>(path: string, params?: any): Promise<T> => {
   try {
      const { data } = await client.get(path, { ...params });
      return data;
   } catch (error) {
      console.log("DEBUG: Failed to fetch" + error);
      throw Error("Failed to fetch" + error);
   }
};

export const axiosClient = {
   get,
};
