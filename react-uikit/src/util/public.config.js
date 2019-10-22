/**
 * Created by dell on 2017/6/21.
 */
import {baseURL} from './common.dev';

import React from 'react';

export const AxiosRequestConfig=(getParams)=> {
    //console.log();
    return {
        withCredentials: true,
        baseURL: baseURL,
        params: getParams?getParams:{},
        headers: {
            "Content-Type": "application/json",
        }
    }
}
