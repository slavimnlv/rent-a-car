import { useState } from "react";
import { useEffect } from "react"
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { deleteCar, getCars } from "../../../utils/services/car-http-utils";
import { CarCard } from "../car-card/CarCard";
import './CarsList.scss'

export function CarsList(){

    const navigate = useNavigate();

    const [cars, setCars] = useState([]);

    useEffect(()=>{
        getCars()
        .then((response)=>{
            setCars(response.data);
        });
    },[]);

    const onDelete = (id) =>{
        deleteCar(id).then (()=> {
            setCars((prevState)=>{
                return prevState.filter(car => car.id !== id);
            });
        });
    }

    const onCreateNew = () => {
        navigate('create');
    }

    return(
        <>
        <div className="button">
            <Button onClick={onCreateNew}>Add New Car</Button>
        </div>
        <div className="list">
            {cars.map(car => <CarCard key={car.id} car={car}  onDelete={onDelete}/>)}
        </div>
        </>
    )
}