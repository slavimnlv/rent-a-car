import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { getCarById, saveCar } from '../../../utils/services/car-http-utils';
import { useNavigate, useParams } from 'react-router';
import './CarForm.scss';
import { useEffect } from 'react';

export function CarForm() {

        //add dropdown for some of the properties

    const emptyCar = {
        fuel: '',
        brand: '',
        model: '',
        year: '',
        seats: '',
        type: '',
        picture:'',
        price: '',
        count: ''
    };

    const [currentCar, setCurrentCar] = useState(emptyCar);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getCarById(params.id)
                .then((response) => {
                    setCurrentCar(response.data);
                })
        } else {
            setCurrentCar(emptyCar);
        }// eslint-disable-next-line
    }, [params.id]);
    

    const onFormChange = (event) => {
        setCurrentCar((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        saveCar(currentCar).then(() => {
            navigate('/cars');
        });
    }

    return (
        <div className="car-form-wrapper">
        <Form className="car-form" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" name="brand" placeholder="Enter brand name" onChange={onFormChange} value={currentCar.brand} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Model</Form.Label>
                <Form.Control type="text" name="model" placeholder="Enter model name" onChange={onFormChange} value={currentCar.model} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Construction year</Form.Label>
                <Form.Control type="number" name="year" placeholder="Enter construction year" onChange={onFormChange} value={currentCar.year} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Number of seats</Form.Label>
                <Form.Control type="number" name="seats" placeholder="Enter number of seats" onChange={onFormChange} value={currentCar.seats} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Fuel type</Form.Label>
                <Form.Select name="fuel" placeholder="Enter fuel type" onChange={onFormChange} value={currentCar.fuel}>
                        <option value="" disabled selected>Select your option</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel" >Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Vehicle type</Form.Label>
                <Form.Select name="type" onChange={onFormChange} value={currentCar.type}>
                        <option value="" disabled selected>Select your option</option>
                        <option value="Economy">Economy</option>
                        <option value="Estate" >Estate</option>
                        <option value="Luxury">Luxury</option>
                        <option value="SUV">SUV</option>
                        <option value="Cargo">Cargo</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Picture link</Form.Label>
                <Form.Control type="text" name="picture" placeholder="Enter picture link" onChange={onFormChange} value={currentCar.picture} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Price per day</Form.Label>
                <Form.Control type="number" name="price" placeholder="Enter price" onChange={onFormChange} value={currentCar.price} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Count</Form.Label>
                <Form.Control type="number" name="count" placeholder="Enter count of vehicles" onChange={onFormChange} value={currentCar.count} required/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
    );
}