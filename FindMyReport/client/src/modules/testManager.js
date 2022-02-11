const baseUrl = "/api/Test";
export const FindTest = (TestId, CollectionDate) => {
    var date = CollectionDate.replace(/-/g, '%2F');

    return fetch(baseUrl + `/findmytest/?Id=${TestId}&CollectionDate=${date}`).then((res) => res.json());
};
export const getAllTests = (id) => {
    return fetch(baseUrl + `/provider/${id}`).then((res) => res.json());
};
export const getTestById = (id) => {
    return fetch(`${baseUrl}/TestsById/${id}`).then((res) => res.json());
};
export const getTestForEdit = (id) => {
    return fetch("/" + id).then((res) => res.json());
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
    console.log(test)
    if(test.results == "true"){
        test.results = true
    }
    else{
        test.results = false
    }
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
    });
};

export const UpdateTest = (test) => {
    console.log(test)
    if(test.results == "true"){
        test.results = true
    }
    else{
        test.results = false
    }
    return fetch(baseUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(test),
    });
};