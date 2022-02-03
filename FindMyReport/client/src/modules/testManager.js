const baseUrl = "/api/Test";

export const getAllTests = () => {
    return fetch(baseUrl).then((res) => res.json());
};


export const addTest = (test) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
    });
};