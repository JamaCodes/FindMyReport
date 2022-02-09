import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteReport } from "../../modules/reportManager";
import { useParams } from "react-router-dom";


const DeleteReport = () => {

    const history = useHistory();
    const { id } = useParams();

    const handleCancel = () => {
        history.push("/reportlist")
    }

    const handleDelete = () => {
        deleteReport(id)
        console.log(id);
        history.push("/reportlist")
    }
    return (
        <Card>
            <CardBody>
                <p>Are you sure you want to delete this Report? </p>
                <br></br>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card >
    );
};

export default DeleteReport;
