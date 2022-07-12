import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Buycar = () => {

    const history = useHistory(); 
    const {state, dispatch} = useContext(UserContext)
    const [saleCarsData, setSaleCarsData] = useState([]);

    const carData = async () =>{
        
        try {

            if(!state){
                window.alert("Please signin to see all available cars for sale!")
                history.push('/signin')
            }

            const res = await fetch ('/getSaleCarData', {
                method: 'GET',
            });

            const data = await res.json();
            data.map(data=>{
                setSaleCarsData(data.saleCarData)                
            })
          

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        carData();
    }, [])

    const specsDiv = document.getElementsByClassName("specsDivBuycar");
    const carDiv = document.getElementsByClassName("cardivBuycar");

    const showSpecs= (e) =>{
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
   

    const addToCart = async (e) =>{
        e.preventDefault();
        let itemId = e.target.id;
        

        const res = await fetch("/addtocart", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                itemId
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
        const res = await fetch("/searchSaleCar", {
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
            const res = await fetch ('/salecarsearchCategory', {
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

    return (
        <>

            <header className="header">

                <div id="menu-btn" className="fas fa-bars"></div>

                <NavLink className="logo" to="/"> <span>cars</span>Club </NavLink>

                <nav className="navbar">
                    <NavLink  to="/">Home</NavLink>
                    <NavLink to="/rentcar">Rent Cars</NavLink>
                    <NavLink to="/mycart">Go To Cart</NavLink>         

                    <input type="text" name="name" value={searchText} onChange={(e)=>setSearchText(e.target.value)} placeholder="Search Car" style={{ width: "30%", height: "8%"}} className="btn"/>
                    <button type="submit" onClick={searchTextBtn} className="btn"><i className="fa fa-search"></i></button>
            
                </nav>

                <div id="login-btn">
                <Loginbutton />
                </div>

            </header> 

            <div className="buycarcard">

                {saleCarsData.map((saleCarsData, index) => 
                    
                        [<div className = "cardivBuycar"  key={saleCarsData._id}>    

                            <img src={saleCarsData.filePath} alt="" style={{width: "80%", height: "70%"}}/>
                            <h4><b>{saleCarsData.brand}</b></h4>
                            <p>{saleCarsData.model}</p>

                            <div className='griddiv'>
                            <button id={index} className='cardbtn' onClick={showSpecs}>Specifications</button>
                            <form method="POST" >
                            <input type="submit" className='cardbtn' value="Add To Cart" id={saleCarsData._id} onClick={addToCart}/>
                            </form>
                            </div>

                        </div>,

                        <div className ="specsDivBuycar" key={index}>
                        
                            <p>Brand : {saleCarsData.brand}</p>
                            <p>Model : {saleCarsData.model}</p>
                            <p>Year : {saleCarsData.year}</p>
                            <p>Color : {saleCarsData.color}</p>
                            <p>Engine : {saleCarsData.enginecc}</p>
                            <p>Maxpower : {saleCarsData.maxpower}</p>
                            <p>Airbags : {saleCarsData.airbags}</p>
                            <p>RearCamera : {saleCarsData.rearcamera}</p>
                            <p>Price : {saleCarsData.price}</p>

                            <div className='griddiv'>
                            <button  className='cardbtn'><NavLink  to={{pathname: '/carreviews', state:{id: saleCarsData._id}}} >Car Reviews</NavLink></button>
                            <button className='cardbtn' id = {index} onClick={showCar}>show car</button>
                            </div>
                        </div>]
                    
                )}
            </div>

    
            
        </>
    )
}

export default Buycar
