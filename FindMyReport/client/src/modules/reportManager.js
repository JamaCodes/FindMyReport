const baseUrl = "/api/Report";

export const getAllReports = () => {
    return fetch(baseUrl).then((res) => res.json());
};
export const getReportById = () => {
    return fetch(baseUrl).then((res) => res.json());
};
export const deleteReport = (reportId) => {
    return fetch(baseUrl + `/${reportId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

export const addReport = (report) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
    });
};

export const UpdateReport = (report) => {
    return fetch(`${baseUrl}/${report.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
    });
};