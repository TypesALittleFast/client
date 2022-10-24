import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { setAuthentication, isAuthenticated } from "./helper/authorize.js";
const Navbar = () => {
  const [showbtn, setShowbtn] = useState(false);
  return (
    <>
      <section className="nav-bg pt-2">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <NavLink className="navbar-brand" to="#">
              <img src="" alt="LOGO" />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShowbtn(!showbtn)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${showbtn ? "show" : ""}`}
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Inicio
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    Sobre Nosotros
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/missions">
                    Misiones
                  </NavLink>
                </li>
                <li  className='nav-item'>
                  <NavLink className="nav-link" to="/information/:file">
                    Información
                  </NavLink>
                </li>

                <li className={`${isAuthenticated() && isAuthenticated().role === "admin" ? 'nav-item':' nav-item d-none'}`}>
                  <NavLink className="nav-link" to="/allUsers/:file">
                    Usuarios
                  </NavLink>
                </li>
                
                <li className={`${isAuthenticated() && isAuthenticated().role === "user" ? 'nav-item':' nav-item d-none'}`}>
                  <NavLink className="nav-link" to="/myData/:file">
                  My Data
                  </NavLink>
                </li>



                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contacto
                  </NavLink>
                </li>

               
              </ul>
              <NavLink to="/login">
                <button className="btn  btn-style" type="submit">
                  Ingresar
                </button>
              </NavLink>

              <NavLink to="/signup">
                <button className="btn btn-style" type="submit">
                  Crear
                </button>
              </NavLink>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
