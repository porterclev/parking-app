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

const Navbar = () => {
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
                   <NavBtnLink to="/signup">
                        Sign Up
                    </NavBtnLink>
                    <NavBtnLink to="/login">
                        Log In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};

export default Navbar;