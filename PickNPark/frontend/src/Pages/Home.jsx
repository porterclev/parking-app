import PickNParkHomeBackground from '../assets/PickNParkHomeBackground.png';
import PickNPark from '../assets/PickNPark.png';
import { NavLink as Link } from "react-router-dom";
import "./styles/Home.style.css"


const Home = () => {
    return (
        <>
        <div className='header'>
            <div id='header-bg' > </div>
            <div id="header-text">
                    <h1>Welcome to</h1>
                    {/* <img src={PickNParkTitle} alt="" style={{filter:"drop-shadow(10px 10px 5px white)"}}/> */}
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                        <h1 style={{fontSize:"10rem",color:"#008698"}}>Pick</h1>
                        <h1 style={{fontSize:"10rem",color:"#FFC53A"}}>N</h1>
                        <h1 style={{fontSize:"10rem",color:"#008698"}}>Park</h1>
                    </div>
                    
                </div>
        </div>
        
        
        <div className='overview1' style={{
            backgroundColor:"#FFD63A", 
            padding:"5rem 2rem",
            display:"flex",
            flexDirection:"row",}}>
            <div className='overview1-text' style={{
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                width:"50%",
                padding:"2rem",
                fontSize:"1.5rem",}}>
                <h1>Find Parking <b style={{color:"#F75A5A",  textShadow:"2px 2px gray"}}>Fast</b></h1>
                <h1>Reserve with <b style={{color:"#F75A5A",  textShadow:"2px 2px gray"}}>Ease</b></h1>
                <button style={{
                    margin:"1rem 2rem",
                }}>
                    <Link to="/find-parking" style={{}} > Reserve Now </Link>
                </button>
            </div>
            <img src={PickNParkHomeBackground} alt="" style={{
                width:"30%", 
                borderRadius: "4px",
                backgroundColor:"#FFD63A",
                boxShadow:"20px 20px"}}/>   
        </div>
        <div className="overview2" style={{
            padding:"5rem 2rem",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-around",
            }}>
                <img src={PickNPark} alt="" style={{
                    width:"30%", 
                    borderRadius: "4px",
                    backgroundColor:"#F75A5A",
                    boxShadow:"20px 20px"}}/>
                <div className='overview1-text' style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"right",
                    alignItems:"c",
                    width:"50%",
                    padding:"",
                    fontSize:"1.5rem",}}>
                    <h2>What is PickNPark?</h2>
                    <p> <strong>PickNPark</strong> is your smart solution for finding and reserving parking—fast. Whether<br/>
                    you're heading to work an event, or just running errands, we connect drivers with available
                    parking spots in real time. No more circling the block or guessing where to leave your car.<br/>
                    </p>
                    <div>
                        <h3>With a few clicks, you can:</h3>
                        <ul style={{listStyleType:"", padding:"0 2rem 0 2rem"}}> 
                            <li> <b style={{color:"#F75A5A"}}>Search</b> for nearby parking.</li>
                            <li> <b style={{color:"#6DE1D2"}}>View</b> for real-time availabilty.</li>
                            <li> <b style={{color:"#FFD63A"}}>Reserve</b> your spot instantly.</li>
                            <li> <b style={{color:"#FFA955"}}>Pay</b> seamlessly online.</li>
                        </ul>
                    </div>
                </div>         
            </div>

        <div className='overview3' style={{
            backgroundColor:"#FFD63A", 
            padding:"5rem 2rem",
            display:"flex",
            flexDirection:"row",
            justifyContent:"space-around",

            }}>
            <div>
                <div style={{
                    display:"flex",
                    direction:"row",}}>
                    <h1 style={{fontSize:"5rem",lineHeight: '0.8'}}>Need to <br />earn extra </h1>
                    <h1><b style={{color:"#16C47F", fontSize:"8rem"}}>$?</b></h1>
                </div>
            <p>List your own driveway or space and start earning today</p>
            <button>List here</button>
            </div>

            <div style={{
                display:"flex",
                flexDirection:"row",
                backgroundColor:"#FFA955",
                borderRadius:"4px",
                border:"1px solid #000",
                boxShadow:"20px 20px",
                justifyContent:"center",
                paddingTop:"2rem",
                alignItems:"start",
                width:"25%",
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"start",
                    alignItems:"center",
                    fontSize:"1rem",
                    textShadow:"2px 2px gray",
                }}>
                    <h1>Pick. </h1>
                    <h1>Park.</h1>
                </div>
                <div>
                    <h1 style={{color:"#6DE1D2", fontSize:"7.25rem", textShadow:"2px 2px gray"}}>Done.</h1>
                </div>
            </div>
            
        </div>

        
        
        </>
        
    );
};

export default Home;