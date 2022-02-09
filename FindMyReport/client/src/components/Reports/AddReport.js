import React, { useState } from "react";
import { useHistory } from "react-router";
import { addReport } from "../../modules/reportManager";



const AddReport = () => {
    const history = useHistory();
    let today = new Date(Date.now())
    const [report, setReport] = useState({
        name: "",
        description: "",
        createdDate:  formatDate(today)
    });
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }


    const handleControlledInputChange = (event) => {
        const newReport = { ...report };
        let selectedVal = event.target.value;
        newReport[event.target.id] = selectedVal;
        setReport(newReport);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addReport(report).then(() => history.push(`/reportlist`));;
    };
    return (
        <form className="main-content">
            <h2 className="_title">Add Report:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={report.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        type="date"
                        id="description"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={report.description}
                    />
                </div>
            </fieldset>
            <button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.push(`/reportlist`)}
            >
                Cancel
            </button>
        </form>
    );
};

export default AddReport;
