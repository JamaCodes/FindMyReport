import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteReportTest } from "../../modules/reportTestManager";
import { useParams } from "react-router-dom";


const DeleteReportTest = () => {

    const history = useHistory();
    const { id } = useParams();

    const handleCancel = () => {
        history.push("/reportTestlist")
    }

    const handleDelete = () => {
        deleteReportTest(id)
        console.log(id);
        history.push("/reportTestlist")
    }
    return (
        <Card>
            <CardBody>
                <p>Are you sure you want to delete this ReportTest? </p>
                <br></br>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card >
    );
};

export default DeleteReportTest;
