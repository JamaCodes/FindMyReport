const baseUrl = "/api/Test";
export const FindTest = (TestId, CollectionDate) => {
    var date = CollectionDate.replace(/-/g, '%2F');

    return fetch(baseUrl + `/findmytest/?Id=${TestId}&CollectionDate=${date}`).then((res) => res.json());
};
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