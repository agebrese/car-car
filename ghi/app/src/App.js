import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPersonList from './SalesPersonList';
import SalesPersonForm from './SalePersonForm';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SaleForm from './SalesForm';
import SalesList from './SalesList';
import SalesHistory from './SalesHistory';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileForm from './AutomobileForm';

import TechnicianList from './TechnicianList';
import NewTechnicianForm from './NewTechnicianForm';
import ScheduledAppointmentList from './ScheduledAppointmentList';
import ModelList from './ModelList';
import NewModelForm from './NewModelForm';
import AutomobileList from './AutomobileList';
import NewAppointmentForm from './NewAppointmentForm';
import ServiceHistory from './ServiceHistoryList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='automobiles'>
            <Route path="all" element={<AutomobileList />} />
          </Route>
          <Route path="models">
            <Route path="all" element={<ModelList />} />
            <Route path="new" element={<NewModelForm />} />
          </Route>
          <Route path="technicians">
            <Route path="all" element={<TechnicianList />} />
            <Route path="new" element={<NewTechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route path="scheduled" element={<ScheduledAppointmentList />} />
            <Route path="new" element={<NewAppointmentForm />} />
            <Route path="all" element={<ServiceHistory />} />
          </Route>
          <Route path="/salesperson" element={<SalesPersonList />} />
          <Route path="/salesperson/create" element={<SalesPersonForm />} />
          <Route path="/customer/create" element={<CustomerForm />} />
          <Route path="/customer" element={<CustomerList />} />
          <Route path="/sale" element={<SalesList />} />
          <Route path="/sale/create" element={<SaleForm />} />
          <Route path="/sale/history" element={<SalesHistory />} />
          <Route path="/manufacturer" element={<ManufacturerList />} />
          <Route path="/manufacturer/create" element={<ManufacturerForm />} />
          <Route path="/automobile/create" element={<AutomobileForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
