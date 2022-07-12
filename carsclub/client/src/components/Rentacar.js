import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Rentacar = () => {

    const {state, dispatch} = useContext(UserContext)

    const history = useHistory(); 

    const [rentCarsData, setRentCarsData] = useState([]);

    const allRentCars = async () =>{
        try {

            if(!state){
                window.alert("Please signin to see all available cars for rent!")
                history.push('/signin')
            }

            const res = await fetch ('/getRentCarData', {
                method: 'GET',
            });

            const data = await res.json();
            setRentCarsData(data)
            
           

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        allRentCars();
    }, [])


    const specsDiv = document.getElementsByClassName("specsDivRentcar");
    const carDiv = document.getElementsByClassName("cardivRentcar");
    const formDiv = document.getElementsByClassName("formDivRentcar");

    const showDetails= (e) =>{
        let currentCar = e.target.id;
            if(specsDiv[currentCar].style.display === "none" && carDiv[currentCar].style.display === "block"){
                carDiv[currentCar].style.display = "none";
                specsDiv[currentCar].style.display = "block";
            }
            else{
                carDiv[currentCar].style.display = "block"
                specsDiv[currentCar].style.display = "none"

            }
    }

    const showCar= (e) =>{
        let currentCar = e.target.id;
            if(specsDiv[currentCar].style.display === "block" && carDiv[currentCar].style.display === "none"){
                specsDiv[currentCar].style.display = "none";
                carDiv[currentCar].style.display = "block";
            }
            else{
                specsDiv[currentCar].style.display = "block"
                carDiv[currentCar].style.display = "none"
            }
    }

    const [rentHours, setRentHours] = useState('')
    const handleInputs = (e) =>{
        let value = e.target.value;
        setRentHours(value);
    }

    const addToCart = (e) =>{
        let currentCar = e.target.id;
        if(formDiv[currentCar].style.display === "none" && specsDiv[currentCar].style.display === "none" && carDiv[currentCar].style.display === "block"){
            carDiv[currentCar].style.display = "none";
            specsDiv[currentCar].style.display = "none";
            formDiv[currentCar].style.display = "block";
        }
        else{
            formDiv[currentCar].style.display = "none"
            specsDiv[currentCar].style.display = "none"
            carDiv[currentCar].style.display = "block"
        }
    }

    const showCarAgain = (e) =>{
        let currentCar = e.target.id;
        if(formDiv[currentCar].style.display === "block" && specsDiv[currentCar].style.display === "none" && carDiv[currentCar].style.display === "none"){
            carDiv[currentCar].style.display = "block";
            specsDiv[currentCar].style.display = "none";
            formDiv[currentCar].style.display = "none";
        }
        else{
            formDiv[currentCar].style.display = "block"
            specsDiv[currentCar].style.display = "none"
            carDiv[currentCar].style.display = "none"
        }
    }

    const proceedToCart = async (e) =>{
        e.preventDefault();
        let itemId = e.target.id;
       

        const res = await fetch("/addrentcartocart", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                itemId, rentHours
            })
        })
        
        const data = await res.json();

        if(res.status === 500 || !data){
            window.alert("Something went wrong");
        }
        else{
            window.alert("Item added. Please click on Go To cart to complete the purchase");
        }

    }


   
    
    const Loginbutton= () =>{
        
        if(state){
            return <div> 
                <button ><NavLink className="btn" to="/signout">logout</NavLink></button>      
            </div>
        }
        else{
            return <div>  
                    <button ><NavLink className="btn" to="/signin">login</NavLink></button>
                    
                </div>
        }
    }



    const [searchText, setSearchText] = useState('');

    const searchTextBtn = async () =>{
        const res = await fetch("/searchRentCar", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                searchText
            })
        })

        getSearchData();
    }



    const getSearchData = async () =>{
        try {
            const res = await fetch ('/rentcarsearchCategory', {
                method: 'GET',
            });

            const data = await res.json();
            
            setRentCarsData(data)                
          
            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        
            <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>cars</span>Club </NavLink>
                <nav className="navbar">
                <NavLink className="nav-link" to="/">Home</NavLink>
                <NavLink to="/buycar">Sale Cars</NavLink>
                    
                <NavLink className="nav-link" to="/rentcarcart">Go To Cart</NavLink>
                
                <input type="text" name="name"  placeholder="Search Car" style={{ width: "30%", height: "8%"}}value={searchText} onChange={(e)=>setSearchText(e.target.value)}className="btn"/>
                <button type="submit" onClick={searchTextBtn} className="btn"><i className="fa fa-search"></i></button>
                </nav>
                <div id="login-btn">
                <Loginbutton />
                </div>

            </header> 

            <div className="buycarcard">

                {rentCarsData.map((rentCarsData, index) => 
                    
                        [<div className = "cardivRentcar"  key={rentCarsData._id}>    

                            <img src={rentCarsData.filePath} alt="" style={{width: "80%", height: "70%"}}/>
                            <h4><b>{rentCarsData.brand}</b></h4>
                            <p>{rentCarsData.model}</p>

                            <div style={{display: "flex", gap: "15px"}}>
                            <button className='cardbtn' id={index}  onClick={showDetails}>Details</button><br/>
                            <button className='cardbtn' id={index}  onClick={addToCart}>Add To Cart</button><br/>
                            </div>
                        </div>,

                        <div className ="specsDivRentcar" key={new Date}>
                        
                            <p>Brand : {rentCarsData.brand}</p>
                            <p>Model : {rentCarsData.model}</p>
                            <p>Year : {rentCarsData.year}</p>
                            <p>Color : {rentCarsData.color}</p>
                            <p>Seats : {rentCarsData.seats}</p>
                            <p>Rent Per Hour : {rentCarsData.rent}</p>
                            <p style={{color: "red"}}>Availibility : {rentCarsData.availability +" hours"}</p>
                            
                            <div style={{display: "flex", gap: "15px"}}>
                            <button className='cardbtn' ><NavLink className="nav-link" to={{pathname: '/rentcarreviews', state:{id: rentCarsData._id}}} >Car Reviews</NavLink></button>
                            <button className='cardbtn' id = {index} onClick={showCar}>show car</button>
                            </div>
                        </div>,

                        <div className = "formDivRentcar"  key={index}>

                            <form method="POST" >
                             <h3>Before click on proceed please enter for how many hours do you want to rent the car</h3><br/>   
                            <label htmlFor="lname">Rent Hours: </label><br/>
                            <input type="text"  className='cardbtn' name="rentforhours" value={rentHours} onChange={handleInputs} placeholder="Enter rent hours" /><br/>
                            
                            <input type="submit" className='cardbtn' value="Proceed" id={rentCarsData._id} onClick={proceedToCart}/>
                            </form> 
                            <button className='cardbtn' id = {index} onClick={showCarAgain}>show car</button>    
                            
                        </div>]    
                   
                )}
            </div>


        </>
    )
}

export default Rentacar
