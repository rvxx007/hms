export interface ConfigProps {
    apiBaseUrl: string;
    apiSecretKey: string;
    expireTime: number | string;
}

const config:ConfigProps = {
    apiBaseUrl: import.meta.env.VITE_BASE_API_URL ||  "http://localhost:4000/api/v1",
    apiSecretKey: import.meta.env.API_SECRET_KEY,
    expireTime: import.meta.env.VITE_EXPIRE_TIME || "7" // in days
}


export default Object.freeze(config);