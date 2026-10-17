import proxy from "express-http-proxy";
export const proxyHeader = (serviceUrl) => {
    return proxy(serviceUrl)
}