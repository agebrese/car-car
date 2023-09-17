import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <ul className='dropdown-menu' aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/automobiles/all">Automobiles</Link></li>
                <li><Link className="dropdown-item" to="/automobile/create">Create An AutoMobile</Link></li>
                <li><Link className="dropdown-item" to="/models/all">Models</Link></li>
                <li><Link className="dropdown-item" to="/models/new">Create a Model</Link></li>
                <li><Link className="dropdown-item" to="/manufacturer">Manufacturers</Link></li>
                <li><Link className="dropdown-item" to="/manufacturer/create">Create A Manufacturer</Link></li>
              </ul>
            </li>

            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Service
              </a>
              <ul className='dropdown-menu' aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/appointments/scheduled">Service Appointments</Link></li>
                <li><Link className="dropdown-item" to="/appointments/new">Schedule a Service Appointment</Link></li>
                <li><Link className="dropdown-item" to="/appointments/all">Service History</Link></li>
              </ul>
            </li>

            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Employees
              </a>
              <ul className='dropdown-menu' aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/technicians/all">Technicians</Link></li>
                <li><Link className="dropdown-item" to="/technicians/new">Add a Technician</Link></li>
                <li><Link className="dropdown-item" to="/salesperson">Salespeople</Link></li>
                <li><Link className="dropdown-item" to="/salesperson/create">Add A Salesperson</Link></li>
              </ul>
            </li>

            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className='dropdown-menu' aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/sale">Sales</Link></li>
                <li><Link className="dropdown-item" to="/sale/create">Add A Sale</Link></li>
                <li><Link className="dropdown-item" to="/sale/history">Sales History</Link></li>
                <li><Link className="dropdown-item" to="/customer">Customers</Link></li>
                <li><Link className="dropdown-item" to="/customer/create">Add A Customer</Link></li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
