import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router';


import './CarCard.scss'

export function CarCard( {car, onDelete} ){

    const navigate = useNavigate();

    const onDeleteClicked = () => {
        onDelete(car.id);
    }

    const navigateToUpdate = () => {
        navigate(`/cars/edit/${car.id}`)
    }

    //if there is 0 left, dont show the car

    return (
        <Card>
            <div className='image'>
                <Card.Img variant="top" src={car.picture} />
            </div>
            <Card.Body>
                <Card.Title>{car.brand} {car.model} {car.year}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Type: <span>{car.type}</span></ListGroup.Item>
                <ListGroup.Item>Seats:<span>{car.seats}</span></ListGroup.Item>
                <ListGroup.Item>Fuel: <span>{car.fuel}</span></ListGroup.Item>
                <ListGroup.Item>Price Per Day: <span>{car.price}$</span></ListGroup.Item>
            </ListGroup>
            <Card.Body className='buttons'>
                <Button className='smallButton' onClick={navigateToUpdate} >Update</Button>
                <Button className='smallButton' onClick={onDeleteClicked}>Delete</Button>
            </Card.Body>
        </Card>
    );
}