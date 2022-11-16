import { useState } from "react";
import { useEffect } from "react"
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { deleteCustomer, getCustomers } from "../../../utils/services/customer-http-utils";
import { CustomerCard } from "../customer-card/CustomerCard";

export function CustomersList(){

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    useEffect(()=>{
        getCustomers()
        .then((response)=>{
            setCustomers(response.data);
        });
    },[]);

    const onDelete = (id) =>{
        deleteCustomer(id).then (()=> {
            setCustomers((prevState)=>{
                return prevState.filter(customer => customer.id !== id);
            });
        });
    }

    const onCreateNew = () => {
        navigate('create');
    }

    return(
        <>
        <div className="button">
            <Button onClick={onCreateNew}>Add New Customer</Button>
        </div>
        <div className="list">
            {customers.map(customer => <CustomerCard key={customer.id} customer={customer}  onDelete={onDelete}/>)}
        </div>
        </>
    )
}