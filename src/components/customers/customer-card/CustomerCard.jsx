import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';
import Button from "react-bootstrap/esm/Button";
import './CustomerCard';

export function CustomerCard( {customer, onDelete} ){

    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(customer.id);
    }

    const navigateToUpdate = () => {
        navigate(`/customers/edit/${customer.id}`)
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>{customer.fullName}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Email: <span>{customer.email}</span> </ListGroup.Item>
                <ListGroup.Item>Phone: <span>{customer.phone}</span></ListGroup.Item>
            </ListGroup>
            <Card.Body className='buttons'>
            <Button className='smallButton' onClick={navigateToUpdate} >Update</Button>
            <Button className='smallButton' onClick={onDeleteClicked}>Delete</Button>
            </Card.Body>
        </Card>
    );
}