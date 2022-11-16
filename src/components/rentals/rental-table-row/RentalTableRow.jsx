import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { getCarById, saveCar } from '../../../utils/services/car-http-utils';
import { getCustomerById } from '../../../utils/services/customer-http-utils';
import { saveRental } from '../../../utils/services/rental-http-utils';

export function RentalTableRow( {rental} ){

    const [customer, setCustomer] = useState({});

    const [car, setCar] = useState({});

    const usef = useRef(false);

    useEffect(()=>{
        getCarById(rental.carId).then((response)=>{
            setCar(response.data);
            carManagement(response.data);
        });
    
        getCustomerById(rental.customerId).then((response)=>{
            setCustomer(response.data);
        });
    // eslint-disable-next-line
    },[]);

    const carManagement = (car) => {
        if(usef.current===false){
            usef.current=true;
            const startDate = Date.parse(rental.startDate);
            const endDate = Date.parse(rental.endDate);
            const today = Date.parse(new Date())
            if(startDate < today && rental.taken === false && endDate < today&& rental.returned === false){
                rental.taken = true;
                rental.returned = true;
                saveRental(rental).then(()=>{
                    console.log("updated");
                });
            }
            else if(startDate < today && rental.taken === false){
                car.count = Number.parseInt(car.count)-1+"";
                rental.taken = true;
                saveCar(car).then(()=>{
                    saveRental(rental).then(()=>{
                        console.log("updated")
                    });

                });
            }
            else if (endDate < today&& rental.returned === false){
                car.count = Number.parseInt(car.count)+1+"";
                rental.returned = true;
                saveCar(car).then(()=>{
                    saveRental(rental).then(()=>{
                        console.log("updated")
                    });

                });
            }
        }
    }

    return (
        <>
        <tr key={rental.id}>
            <td>{customer.fullName}</td>
            <td>{customer.phone}</td>
            <td>{customer.email}</td>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{car.year}</td>
            <td>{rental.startDate.substring(0,10) + ", " + rental.startDate.substring(11, 16)}</td>
            <td>{rental.endDate.substring(0,10) + ", " + rental.endDate.substring(11, 16)}</td>
            <td>{parseFloat(rental.price).toFixed(2)}$</td>
        </tr>
        </>
    );
}