import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';
export default function Navbar(props) {
    const [cartView, setCartView] = useState(false)
    localStorage.setItem('temp', "first")
    let data = useCart();
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken')

        navigate("/login")
    }

    const items = useCart();
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", filter: 'blur(20)', position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 ">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link> 
                            </li>

                            <Link className="navbar-brand fs-1 fst-italic" to="/">Coffee by us</Link>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    {/* <Link className="nav-link fs-5 active" aria-current="page" to="/myOrder" >My Orders</Link>   */}
                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </div> :
                            <div>
                               
                                <div onClick={()=>{setCartView(true)}} className="btn bg-white text-success" >My cart{" "}
                                <Badge pill bg='danger' >
                                        {data.length}
                                    </Badge>
                                </div> 
                                {cartView? <Modal onClose={()=>setCartView(false)}>
                                    <Cart/>
                                </Modal>: null}
                                 <button onClick={handleLogout} className="btn bg-white text-danger m-2" >Logout</button>  
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
