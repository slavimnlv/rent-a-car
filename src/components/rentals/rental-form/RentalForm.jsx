import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { getCustomers } from '../../../utils/services/customer-http-utils';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { getRentals, saveRental } from '../../../utils/services/rental-http-utils';
import { getCars } from '../../../utils/services/car-http-utils';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import './RentalForm.scss'

export function RentalForm() {

    const emptyRental = {
        customerId: '',
        carId: '',
        startDate: '',
        endDate: '',
        price: 0,
        returned: false,
        taken: false
    };

    const [currentRental, setCurrentRental] = useState(emptyRental);

    const [rentals, setRentals] = useState([]);

    const [customers, setCustomers] = useState([]);

    const [cars, setCars] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        
        setCurrentRental(emptyRental);
        
        getCustomers().then((response)=>{
            setCustomers(response.data);
        });
    
        getCars().then((response)=>{
            setCars(response.data);
        });

        getRentals().then((response)=>{
            setRentals(response.data);
        });
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(isFormValid())
            calcPrice();
        else
            setPrice(0);
            // eslint-disable-next-line
    }, [currentRental]);

    const calcPrice = () => {
        if(Date.parse(currentRental.endDate)>Date.parse(currentRental.startDate)){
            const car  = cars.find(car => car.id === Number.parseInt(currentRental.carId));
            const customer = customers.find(customer => customer.id === Number.parseInt(currentRental.customerId));
            const customerRentals = rentals.filter(rental => (Number.parseInt(rental.customerId) === Number.parseInt(customer.id) && (Math.floor(new Date() - Date.parse(rental.endDate))/ (24*60*60*1000)) <= 60));
            const carPrice = Number.parseFloat(car.price);
            const days = Math.ceil((Date.parse(currentRental.endDate)-Date.parse(currentRental.startDate))/ (24*60*60*1000));
            const price = carPrice*days;

            if(customerRentals.length >= 3)
                setPrice(price - price*15/100);

            else if(days > 10)
                setPrice(price  - price*10/100);

            else if(days > 5)
               setPrice(price  - price*5/100);

            else if (days > 3)
               setPrice(price  - price*3/100);

            else{
                if(days >=1)
                    setPrice(price);
                else    
                  setPrice(carPrice);
            }
        }
        else {
            setPrice(0);
        }
    }
    
    const setPrice = (num) => {
        if(currentRental.price!==num){
            setCurrentRental((prevState) => ({
                ...prevState,
                price: num
            }));
        }
    }

    const isFormValid = () => {  
        return currentRental.customerId && currentRental.carId && currentRental.startDate && currentRental.endDate;
    }

    const onFormChange = (event) => {
        setCurrentRental((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        saveRental(currentRental).then(() => {
            navigate('/rentals')
        });
    }

    return (
        <div className="rental-form-wrapper">
        <Form className="rental-form" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Customer</Form.Label>
                <Form.Select name="customerId" onChange={onFormChange} value={currentRental.customerId}>
                        <option value="" disabled selected>Select your option</option>
                        {customers.map(customer => <option key={customer.id} value={customer.id}>{ customer.fullName + " " +customer.phone}</option>)}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Car</Form.Label>
                <Form.Select name="carId" onChange={onFormChange} value={currentRental.carId}>
                        <option value="" disabled selected>Select your option</option>
                        {cars.map(car => {if(car.count>0) return <option key={car.id} value={car.id}>{car.brand + " " + car.model + " " + car.year}</option>})}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="datetime-local" min={new Date().toISOString().slice(0,16)} name="startDate" placeholder="Enter start date" onChange={onFormChange} value={currentRental.startDate} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="datetime-local" min={new Date().toISOString().slice(0,16)} name="endDate" placeholder="Enter end date" onChange={onFormChange} value={currentRental.endDate} required />
            </Form.Group>
            <FormGroup>
                <Form.Label>Price: {parseFloat(currentRental.price).toFixed(2)}$</Form.Label>
                <Form.Label></Form.Label>
            </FormGroup>
            <Button disabled={currentRental.price ? false:true}  variant="primary" type="submit">Submit</Button>
        </Form>
    </div>
    );
}