import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { getCustomerById, getCustomers, saveCustomer } from '../../../utils/services/customer-http-utils';
import { useNavigate, useParams } from 'react-router';
import './CustomerForm.scss';
import { useEffect } from 'react';

export function CustomerForm() {

    const emptyCustomer = {
        fullName: '',
        email: '',
        phone: ''
    };

    const [currentCustomer, setCurrentCustomer] = useState(emptyCustomer);

    const [error, setError] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getCustomerById(params.id)
                .then((response) => {
                    setCurrentCustomer(response.data);
                })
        } else {
            setCurrentCustomer(emptyCustomer);
        }// eslint-disable-next-line
    }, [params.id]);
    

    const onFormControlChange = (event) => {
        setError("");
        setCurrentCustomer((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        getCustomers().then((response)=>{
            const customers = response.data;
            const customer = customers.find(customer => customer.email === currentCustomer.email || customer.phone === currentCustomer.phone);
            if(customer){
                setError( "Email or phone number already in use!");
            }
            else {
                saveCustomer(currentCustomer).then(() => {
                    navigate('/customers');
                });
            }
        })
    }

    return (
        <div className="customer-form-wrapper">
        <Form className="customer-form" onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullName" placeholder="Enter full name" onChange={onFormControlChange} value={currentCustomer.fullName} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="Enter email" onChange={onFormControlChange} value={currentCustomer.email} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" placeholder="Enter phone" onChange={onFormControlChange} value={currentCustomer.phone} required />
            </Form.Group>
            <p className='error'>{error}</p>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
    );
}