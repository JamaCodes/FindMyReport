const baseUrl = "/api/ReportTest/ReportTestById?id=";

export const getReportTestById = (id) => {
    return fetch(baseUrl +`${id}`).then((res) => res.json());
};

export const addReportTest = (report) => {
    return fetch("/api/ReportTest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
    });
};