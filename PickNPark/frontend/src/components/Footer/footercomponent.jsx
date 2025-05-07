import React from "react";
import PickNParkIcon from "../../assets/PickNParkIcon.png";
import {
    Box,
    FooterContainer,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./footerelements";

const Footer = () => {
    return (
        <Box>
            
            <FooterContainer>
                <Row>
                    <Column style={{}}>
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                            <h1 style={{fontSize:"3rem",color:"#008698"}}>Pick</h1>
                            <h1 style={{fontSize:"3rem",color:"#FFC53A"}}>N</h1>
                            <h1 style={{fontSize:"3rem",color:"#008698"}}>Park</h1>
                        </div>
                        <img src={PickNParkIcon} alt="" style={{width:"95%",height:"auto"}}/>
                    </Column>
                    
                    <Column>
                        <Heading>About Us</Heading>
                        <FooterLink href="#">
                            Aim
                        </FooterLink>
                        <FooterLink href="#">
                            Vision
                        </FooterLink>
                        <FooterLink href="#">
                            Testimonials
                        </FooterLink>
                    </Column>
                    <Column>
                        <Heading>Contact Us</Heading>
                        <FooterLink href="https://github.com/Alkon0st">
                            Adriane San Gaspar
                        </FooterLink>
                    </Column>
                    <Column>
                        <Heading>Social Media</Heading>
                        <FooterLink href="#">
                            <i className="fab fa-facebook-f">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Facebook
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-instagram">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Instagram
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-twitter">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Twitter
                                </span>
                            </i>
                        </FooterLink>
                        <FooterLink href="#">
                            <i className="fab fa-youtube">
                                <span
                                    style={{
                                        marginLeft: "10px",
                                    }}
                                >
                                    Youtube
                                </span>
                            </i>
                        </FooterLink>
                    </Column>
                </Row>
            </FooterContainer>
            <div style={{textAlign:"center", color:"#fff", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", marginTop:"20px"}}>
                <p>© 2025 PickNPark. All rights reserved. | </p>
                <p>Privacy Policy | Terms of Service </p>
            </div>
        </Box>
    );
};
export default Footer;
