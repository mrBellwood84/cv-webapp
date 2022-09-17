export const tokenStorage = {
    get: (asBearer: boolean = true): string => {
        let token = sessionStorage.getItem("token");
        if (!token) return "";
        if (asBearer) return `Bearer ${token}`;
        return token;
    },
    set: (token: string) => {
        sessionStorage.setItem("token", token);
    },
    remove: () => {
        sessionStorage.removeItem("token");
    },
}