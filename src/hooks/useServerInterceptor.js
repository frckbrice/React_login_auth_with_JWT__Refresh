import { serverInterceptor } from "../api/axios";

import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useEffect } from "react";

const useServerInterceptor = () => {
  const refresh = useRefreshToken();
  const {auth} = useAuth();

  useEffect(() => {

    const requestIntercept = serverInterceptor.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    const responseInterceptor = serverInterceptor.interceptors.response.use(
      response => response,
      async(error) => {
        const prevRequest = error?.config;
        if(error?.response?.status === 403 || !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return serverInterceptor(prevRequest)
        }
        return Promise.reject(prevRequest);
      }
    );

    return () => {
      serverInterceptor.interceptors.request.eject(requestIntercept);
      serverInterceptor.interceptors.response.eject(responseInterceptor);
    }


  }, [auth, refresh])

  return serverInterceptor;
}

export default useServerInterceptor;