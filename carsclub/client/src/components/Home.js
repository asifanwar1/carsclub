import React, {useState, useEffect, useContext} from 'react'
import { NavLink } from "react-router-dom";

import { UserContext } from "../App"

const Home = () => {
    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});
    

    
    const {state, dispatch} = useContext(UserContext)

    

    const userContact = async () =>{
        try {
            const res = await fetch ('/getdata', {
                method: 'GET',
                headers:{
                    "Content-Type" : "application/json"
                },
            });

            const data = await res.json();
            
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});


            if(!res.status === 200){
                const error = new Error(res.error);
                throw error;
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
       userContact();
    }, [])

    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value });
    }

    const sendMessage = async (e) =>{
        e.preventDefault();

        const {name, email, phone, message}= userData;

        const res = await fetch('/contact',{
            method:'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if(!data){
            console.log("message not sent");
        }
        else{
            alert("Message send")
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
                <NavLink  to="/">Home</NavLink>
                <NavLink  to="/exploreSaleCars">Explore-Sale-Cars</NavLink>
                <NavLink  to="/exploreRentCars">Explore-Rent-Cars</NavLink>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
            <div id="login-btn">
                    <Loginbutton />
            </div>

        </header> 


        

<section className="home" id="home">

<h3 data-speed="-2" className="home-parallax">find your car</h3>

<img data-speed="5" className="home-parallax" src="/image/home-img.png" alt=""/>

<NavLink className="btn" to="/exploreSaleCars">Explore-Sale-Cars</NavLink>{" "}
<NavLink className="btn" to="/exploreRentCars">Explore-Rent-Cars</NavLink>

</section>

<section className="icons-container">

<div className="icons">
    <i className="fas fa-home"></i>
    <div className="content">
        <h3>150+</h3>
        <p>branches</p>
    </div>
</div>

<div className="icons">
    <i className="fas fa-car"></i>
    <div className="content">
        <h3>4770+</h3>
        <p>cars sold</p>
    </div>
</div>

<div className="icons">
    <i className="fas fa-users"></i>
    <div className="content">
        <h3>320+</h3>
        <p>happy clients</p>
    </div>
</div>

<div className="icons">
    <i className="fas fa-car"></i>
    <div className="content">
        <h3>1500+</h3>
        <p>news cars</p>
    </div>
</div>

</section>

<section className="services" id="services">

<h1 className="heading"> our <span>services</span> </h1>

<div className="box-container">

    <div className="box">
        <i className="fas fa-car"></i>
        <h3>Buy your dream car</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <button className="btn"><NavLink to="/buycar">Check Cars</NavLink></button>
    </div>

    <div className="box">
        <i className="fas fa-car"></i>
        <h3>Rent A Car</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <button className="btn"><NavLink to="/rentcar">Check Cars</NavLink></button>
    </div>


    <div className="box">
    <i className="fas fa-car"></i>
        <h3>Sale your old car</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis, nisi.</p>
        <button className="btn"><NavLink to="/saleyourcar">Check Cars</NavLink></button>
    </div>

</div>

</section>





<section className="contact" id="contact">

<h1 className="heading"><span>contact</span> us</h1>

<div className="row">

    {/* <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30153.788252261566!2d72.82321484621745!3d19.141690214227783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287dfa3b!2sJogeshwari%20West%2C%20Mumbai%2C%20Maharashtra%20400047!5e0!3m2!1sen!2sin!4v1632137920043!5m2!1sen!2sin" allowFullScreen="" loading="lazy"></iframe> */}

    <form method="POST">
        <h3>get in touch</h3>
        <input type="text" name="name" value={userData.name} onChange={handleInputs} placeholder="your name" className="box"/>
        <input type="email" name="email" value={userData.email} onChange={handleInputs} placeholder="your email" className="box"/>
        <input type="tel" name="phone" value={userData.phone} onChange={handleInputs} placeholder="your phone" className="box"/>
        <textarea placeholder="your message" name="message" value={userData.message} onChange={handleInputs} className="box" cols="30" rows="10"></textarea>
        <input type="submit" value="send message" onClick={sendMessage} className="btn"/>
    </form>

</div>

</section>

<section className="footer" id="footer">

<div className="box-container">

    <div className="box">
        <h3>our branches</h3>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Pakistan </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> japan </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> france </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> russia </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> USA </a>
    </div>

    <div className="box">
        <h3>quick links</h3>
        <a href="#"> <i className="fas fa-arrow-right"></i> home </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> vehicles </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> services </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> featured </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> reviews </a>
        <a href="#"> <i className="fas fa-arrow-right"></i> contact </a>
    </div>

    <div className="box">
        <h3>contact info</h3>
        <a href="#"> <i className="fas fa-phone"></i> +123-456-7890 </a>
        <a href="#"> <i className="fas fa-phone"></i> +111-222-3333 </a>
        <a href="#"> <i className="fas fa-envelope"></i> asifkhan@gmail.com </a>
        <a href="#"> <i className="fas fa-map-marker-alt"></i> Karachi, Pakistan - 27400 </a>
    </div>

    <div className="box">
        <h3>contact info</h3>
        <a href="#"> <i className="fab fa-facebook-f"></i> facebook </a>
        <a href="#"> <i className="fab fa-twitter"></i> twitter </a>
        <a href="#"> <i className="fab fa-instagram"></i> instagram </a>
        <a href="#"> <i className="fab fa-linkedin"></i> linkedin </a>
        <a href="#"> <i className="fab fa-pinterest"></i> pinterest </a>
    </div>

</div>

<div className="credit"> created by asif anwar | all rights reserved </div>

</section>





        </>
    )
    
}



export default Home
