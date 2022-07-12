import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from "../App"

const ExploreRentCar = () => {

    const {state, dispatch} = useContext(UserContext)


    const Loginbutton= () =>{
        
        if(state){
            return <div> 
                <button className="btn"><NavLink className="nav-link" to="/signout">logout</NavLink></button>      
            </div>
        }
        else{
            return <div>  
                    <button className="btn"><NavLink className="nav-link" to="/signin">login</NavLink></button>
                    
                </div>
        }
    
    }



    const [saleCarsData, setSaleCarsData] = useState([]);

    const exploreRentCar = async () =>{
        try {
            const res = await fetch ('/exploreRentCarData', {
                method: 'GET',
            });

            const data = await res.json();

            setSaleCarsData(data)
          

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        exploreRentCar();
    }, [])

    

    const alertDiv = document.getElementById("alertDiv")
    const handleClick = () =>{
        if(alertDiv.style.display === "none"){
            alertDiv.style.display = "flex"
            window.alert("Please signin to rent the car!");
        }
        else{
            alertDiv.style.display = "flex"
        }
    }


    const hideAlert = () => {
        if(alertDiv.style.display === "flex"){
            alertDiv.style.display = "none"
        }
        else{
            alertDiv.style.display = "none"
        }
    }


    return (
        <>

            <header className="header">
            <div id="menu-btn" className="fas fa-bars"></div>
            <NavLink className="logo" to="/"> <span>cars</span>Club </NavLink>

            <nav className="navbar">
                <NavLink  to="/">Home</NavLink>
                <NavLink to="/buycar">Sale Cars</NavLink>
                <NavLink to="/rentcar">Rent Cars</NavLink>
            </nav>
            <div id="login-btn">
                <Loginbutton />
            </div>
            </header>

            <div id="alertDiv" >
            <p>Please signin or create an account to rent a car</p>
            <button className='btn' onClick={hideAlert}>OK</button>
        </div>


        <div className="exploreCarsDiv">

        {saleCarsData.map((saleCarsData, index) =>  
        
        <div className = "exploreCarsImg"  key={saleCarsData._id}>    

            <img src={saleCarsData.filePath} alt="" style={{width: "80%", height: "70%"}} onClick={handleClick}/>
            <h4><b>{saleCarsData.brand}</b></h4>
            <p>{saleCarsData.model}</p>
            </div>
        )}

        </div>
        </>
    )
}

export default ExploreRentCar