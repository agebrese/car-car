import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <NavLink className="navbar-brand" to="/manufacturer">Manufacturers</NavLink>
        <NavLink className="navbar-brand" to="/manufacturer/create">Create A Manufacturer</NavLink>
        <NavLink className="navbar-brand" to="/automobile/create">Create An AutoMobile</NavLink>
        <NavLink className="navbar-brand" to="/sale">Sales</NavLink>
        <NavLink className="navbar-brand" to="/sale/create">Add A Sale</NavLink>
        <NavLink className="navbar-brand" to="/sale/history">Sales History</NavLink>
        <NavLink className="navbar-brand" to="/salesperson">Salespeople</NavLink>
        <NavLink className="navbar-brand" to="/salesperson/create">Add A Salesperson</NavLink>
        <NavLink className="navbar-brand" to="/customer">Customers</NavLink>
        <NavLink className="navbar-brand" to="/customer/create">Add A Customer</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
