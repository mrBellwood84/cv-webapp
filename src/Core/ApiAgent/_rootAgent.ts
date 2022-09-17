import { appConfig } from "../../appConfig";
import { tokenStorage } from "../Utils/storageTools";

export const _rootAgent  ={
    get: async (subdomain: string) => {
        let url = `${appConfig.apiUrl}/${subdomain}`
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: tokenStorage.get()
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
                Authorization: tokenStorage.get()
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
                Authorization: tokenStorage.get()
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
                Authorization: tokenStorage.get()
            },
            body: JSON.stringify(body),
        })
        return response;
    }
}