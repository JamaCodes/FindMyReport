import React, { useState } from "react";
import { FindTest } from "../../modules/testManager";



const FindMyTest = () => {
    
    const [test, setTest] = useState({
        id: "",
        dateCollected: "",
    });

    const handleControlledInputChange = (event) => {
        const newTest = { ...test };
        let selectedVal = event.target.value;
        newTest[event.target.id] = selectedVal;
        setTest(newTest);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        FindTest(test.id, test.dateCollected);
    };
    return (
        <form className="main-content">
            <h2 className="_title">Find Test:</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="dateCollected">Name:</label>
                    <input
                        type="date"
                        id="dateCollected"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={test.dateCollected}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id">Test Id Number:</label>
                    <input
                        type="text"
                        id="id"
                        required
                        autoFocus
                        rows="6"
                        className="form-control"
                        value={test.id} onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button className="btn-add-save" onClick={handleSubmit}>
                Submit
            </button>
            <button
                className="btn-add-edit"
            >
                Cancel
            </button>
        </form>
    );
};

export default FindMyTest;
