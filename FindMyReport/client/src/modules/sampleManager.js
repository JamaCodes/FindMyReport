const baseUrl = "/api/sample";

export const getAllSamples = () => {
    return fetch(baseUrl).then((res) => res.json());
};