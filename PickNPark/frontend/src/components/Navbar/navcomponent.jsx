import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./navbarelements";
import PickNPark from '../../assets/PickNPark.png'
import {useAuth} from "../../context/AuthContext.js";

const Navbar = () => {

    const { isAuthenticated, isOwner, logout } = useAuth();
    console.log(isOwner);
    console.log(isAuthenticated);
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    
                    <NavLink to="/" >
                        Home
                    </NavLink>
                    <NavLink to="/find-parking" >
                        FindPark
                    </NavLink>
                    <NavLink to="/About" >
                        About
                    </NavLink>
                    <NavLink to="/my-spots" >
                        My Spots
                    </NavLink>
                    {isOwner ? <NavLink to="/owner" >
                        Owner Dashboard
                    </NavLink> : null}
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavMenu>
                    <NavLink to="/">
                        <img src={PickNPark} alt="PickNParkTitle" style={{position: "absolute",
                        top: ".5%",
                        left: "46%",
                        // transform: "translate(-50%, -50%)" , /* Adjusts the center of the div */
                        width: "100px",
                        height: "auto"}}/>
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    { isAuthenticated ? <NavBtnLink to="/" onClick={logout}>logout</NavBtnLink> : null }
                    { !isAuthenticated ? <NavBtnLink to="/signup">Sign Up</NavBtnLink> : null}
                    { !isAuthenticated ? <NavBtnLink to="/login">Login</NavBtnLink> : null}
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;