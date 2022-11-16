import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';
import { CustomersList } from './components/customers/customers-list/CustomersList';
import { CustomerForm } from './components/customers/customer-form/CustomerForm';
import {CarsList} from './components/cars/cars-list/CarsList'
import { CarForm } from './components/cars/car-form/CarForm';
import './App.scss';
import { RentalsList } from './components/rentals/rentals-list/RentalsList';
import { RentalForm } from './components/rentals/rental-form/RentalForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Layout /> }>
        <Route path="" element={<CarsList />} />
        <Route path="customers" element={<CustomersList />} />
        <Route path="customers/create" element={<CustomerForm />} />
        <Route path="customers/edit/:id" element={<CustomerForm />} />
        <Route path="cars" element={<CarsList/>} />
        <Route path="cars/create" element={<CarForm/>} />
        <Route path="cars/edit/:id" element={<CarForm/>} />
        <Route path="rentals" element={<RentalsList/>} />
        <Route path="rentals/create" element={<RentalForm/>} />
        <Route path="rentals/edit/:id" element={<RentalForm/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
