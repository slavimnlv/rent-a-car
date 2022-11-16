import { useState } from "react";
import { useEffect } from "react"
import Button from "react-bootstrap/esm/Button";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRentals } from "../../../utils/services/rental-http-utils";
import { RentalTableRow } from "../rental-table-row/RentalTableRow";
import './RentalsList.scss'

export function RentalsList(){

    const navigate = useNavigate();

    const [rentals, setRentals] = useState([]);

    useEffect(()=>{
        getRentals()
        .then((response)=>{
            setRentals(response.data);
        });// eslint-disable-next-line
    },[]);

    const onCreateNew = () => {
        navigate('create');
    }

    return(
        <>
        <div className="button">
            <Button onClick={onCreateNew}>Add Rental</Button>
        </div>
        <div className="table-list">
        <Table striped hover bordered>
            <thead>
                <tr style={{textAlign:'center'}}>
                    <td colSpan="3">Customer:</td>
                    <td colSpan="3">Car:</td>
                    <td colSpan="3">Rent event:</td>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>Phone</td>
                    <td>Email</td>
                    <td>Brand</td>
                    <td>Model</td>
                    <td>Year</td>
                    <td>Start date</td>
                    <td>End date</td>
                    <td>Price</td>
                </tr>
            </thead>
                <tbody>
                {rentals.map(rental => <RentalTableRow key={rental.id} rental={rental}/>)}
                </tbody>
            </Table>
        </div>
        </>
    )
}