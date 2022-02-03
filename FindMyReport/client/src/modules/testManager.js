const baseUrl = "/api/Test";

export const getAllTests = () => {
    return fetch(baseUrl).then((res) => res.json());
};
export const getTestById = () => {
    return fetch(baseUrl).then((res) => res.json());
};
export const deleteTest = (testId) => {
    return fetch(baseUrl + `/${testId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
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

export const UpdateTest = (test) => {
    return fetch(`${baseUrl}/${test.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
    });
};