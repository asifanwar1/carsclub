import React, {useState, useEffect, useContext} from 'react'
import { NavLink, useLocation, useHistory } from "react-router-dom";

import { UserContext } from "../App"

const Carreviews = () => {

    const {state, dispatch} = useContext(UserContext)

    let location = useLocation();
    const selectedCarId = location.state
    const [userData, setUserData] = useState({id:"", name:"", email:"", message:""});
    const [saleCarsData, setSaleCarsData] = useState({
        id: "",
        brand : "",
        model : "",
        year : "",
        color : "",
        enginecc : "",
        maxpower : "",
        airbags : "",
        rearcamera : "",
        price : "",
        retailprice : "",
        quantity : "",
        fileName : "",
        filePath : "",
        fileType : "",
        fileSize : ""
    });
    const [allSaleCarReviews, setAllSaleCarReviews] = useState([]);
   

    const sendId = async () =>{
        try {
            const res = await fetch("/sendReviewCarId", {
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    selectedCarId
                })
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
        sendId();
    }, [])

    const reviewCarData = async () =>{
        try {
            const res = await fetch ('/getSaleCarReviews', {
                method: 'GET',
            });

            const data = await res.json();
            setSaleCarsData({
            id : data.findCar._id,
            brand : data.findCar.brand,
            model : data.findCar.model,
            year : data.findCar.year,
            color : data.findCar.color,
            enginecc : data.findCar.enginecc,
            maxpower : data.findCar.maxpower,
            airbags : data.findCar.airbags,
            rearcamera : data.findCar.rearcamera,
            price : data.findCar.price,
            retailprice : data.findCar.retailprice,
            quantity : data.findCar.quantity,
            fileName : data.findCar.fileName,
            filePath : data.findCar.filePath,
            fileType : data.findCar.fileType,
            fileSize : data.findCar.fileSize
            })
            
            setUserData({...userData, id:data.findUser._id, name:data.findUser.name, email:data.findUser.email})

            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        reviewCarData();
    }, [])


    const getallreviews = async () =>{
        try {
            const res = await fetch ('/getallreviewsforselectedcar', {
                method: 'GET',
            });

            const data = await res.json();

            setAllSaleCarReviews(data.allReviews);

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getallreviews();
    }, [])

    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });
    }

  
    
    const submitReviews = async (e) =>{
        e.preventDefault();

        const {id, name, email, message}= userData;

        const res = await fetch('/postcarreviews',{
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id, name, email, message, selectedCarId
            })
        });

        const data = await res.json();


        if(data.status === 500 || !data){
            window.alert("reviews not submited");
            console.log("reviews not submited");
        }
        else if(data.status===201){
            window.alert("reviews submited");
            setUserData({...userData, message:""});
        }
        else{
            window.alert("reviews submited");
            setUserData({...userData, message:""});
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


    return (
        <>
             <header className="header">
                <div id="menu-btn" className="fas fa-bars"></div>
                <NavLink className="logo" to="/"> <span>cars</span>Club </NavLink>
                <nav className="navbar">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/buycar">Sale Cars</NavLink>
                    <NavLink to="/rentcar">Rent Cars</NavLink>
                </nav>
                <div id="login-btn">
                <Loginbutton />
                </div>
            </header>

            
            <div className = "reviewsdiv">    

                <img src={saleCarsData.filePath} alt="" style={{width: "80%", height: "70%"}}/>
                <h4><b>{saleCarsData.brand}</b></h4>
                <p>Model : {saleCarsData.model}</p>
                <p>Year : {saleCarsData.year}</p>
                <p>Color : {saleCarsData.color}</p>
                <p>Engine : {saleCarsData.enginecc}</p>
                <p>Maxpower : {saleCarsData.maxpower}</p>
                <p>Airbags : {saleCarsData.airbags}</p>
                <p>RearCamera : {saleCarsData.rearcamera}</p>
                <p>Price : {saleCarsData.price}</p>

            </div>
                   
            
        <section className="contact" id="contact">
            <h1 className="heading"><span>Reviews</span></h1>

            {allSaleCarReviews.map((allSaleCarReviews) => 
                    <div className = "reviewsli"  key={allSaleCarReviews._id} >
                            <ul>
                                <li style={{wordSpacing: "10px"}}>{allSaleCarReviews.name} :- {allSaleCarReviews.comments}</li>
                            </ul> 
                        </div>
                     
            )}

            <div className="row">
                <form method="POST">
                    <h3>write your reviews</h3>
                    <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box"/>
                    <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box"/>
                    <textarea placeholder="your reviews" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
                    <input type="submit" value="submit reviews" onClick={submitReviews} className="btn"/>
                </form>

            </div>

        </section>
        
        </>
    )
}

export default Carreviews
