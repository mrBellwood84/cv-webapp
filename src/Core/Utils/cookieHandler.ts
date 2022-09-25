import { appConfig } from "../../appConfig";

// export const tokenStorage = {
//     get: (asBearer: boolean = true): string => {
//         let token = sessionStorage.getItem("token");
//         if (!token) return "";
//         if (asBearer) return `Bearer ${token}`;
//         return token;
//     },
//     set: (token: string) => {
//         sessionStorage.setItem("token", token);
//     },
//     remove: () => {
//         sessionStorage.removeItem("token");
//     },
// }

export const cookeHandler = {
    set: (tokenstring: string, role: string) => setCookie(tokenstring, role),
    token: () => getToken(),
    expireIso: () => getExpireISO(),
    remove: () => removeCookieValues()
}

const setCookie = (tokenString: string, role: string) => {

    const token = `token=Bearer ${tokenString}`;
    
    const now = new Date();

    const add = (role === "admin") ? appConfig.sessionExpireExtended : appConfig.sessionExpire;
    now.setMinutes(now.getMinutes() + add);
    const expireISO = `expireISO=${now.toISOString()}`
    const expires = `expires=${now.toUTCString()}`

    document.cookie = `${token};${expires}`
    document.cookie = `${expireISO};${expires}`

}

const getToken = () => {
    const values = document.cookie.split(";")
    let token = values.find(x => x.includes("token="))?.trim()
    return token ? token.substring(6) : "";
}

const getExpireISO = () => {
    const values = document.cookie.split(";")
    let datestring = values.find(x => x.includes("expireISO="))?.trim()
     return datestring ? datestring.substring(10) : "";
}

const removeCookieValues = () => {
    const now = new Date()

    document.cookie = `token=;expires=${now.toUTCString()}`
    document.cookie = `expireISO=;expires=${now.toUTCString()}`

}