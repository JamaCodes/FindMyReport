import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteTest } from "../../modules/testManager";
import { useParams } from "react-router-dom";


const DeleteTest = () => {

    const history = useHistory();
    const { id } = useParams();

    const handleCancel = () => {
        history.push("/test")
    }

    const handleDelete = () => {
        deleteTest(id)
        console.log(id);
        history.push("/test")
    }
    return (
        <Card>
            <CardBody>
                <p>Are you sure you want to delete this Test? </p>
                <br></br>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card >
    );
};

export default DeleteTest;
