import { appConfig } from "../../appConfig";
import { cookeHandler } from "../Utils/cookieHandler";

export const _rootAgent  ={
    get: async (subdomain: string) => {
        let url = `${appConfig.apiUrl}/${subdomain}`
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: cookeHandler.token()
            },
        })
        return response;
    },
    post: async (subdomain: string, body: {}) => {
        let url = `${appConfig.apiUrl}/${subdomain}`
        let response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json",
                Authorization: cookeHandler.token()
            },
            body: JSON.stringify(body),
        })
        return response;
    },
    put: async (subdomain: string, body: {}) => {
        let url = `${appConfig.apiUrl}/${subdomain}`
        let response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json",
                Authorization: cookeHandler.token()
            },
            body: JSON.stringify(body),
        })
        return response;
    },
    delete: async (subdomain: string, body: {}) => {
        let url = `${appConfig.apiUrl}/${subdomain}`
        let response = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type" : "application/json",
                Authorization: cookeHandler.token()
            },
            body: JSON.stringify(body),
        })
        return response;
    }
}