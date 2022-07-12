import React, {useState} from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
import "../registerStyle.css"
import { NavLink, useHistory } from 'react-router-dom'


const Signup = () => {

    const history = useHistory();
    const [user, setUser] = useState({
        name : "",
        email : "",
        phone : "",
        password : "",
        cPassword : ""
    });

    let name, value;

    const handleInputs = (e) =>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }

    
    const postData = async (e) =>{
        e.preventDefault();

        const {name, phone, email, password, cPassword} = user;

        const res = await fetch("/signup", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name, phone, email, password, cPassword
            })
        })
        
        const data = await res.json();

        if(data.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } 
        else{
            window.alert("Registration successfull");
            console.log("Registration successfull");

            history.push("/");
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
</nav>

<div id="login-btn">
    <button className="btn"><NavLink className="nav-link" to="/signin">login</NavLink></button>
</div>

</header>

      
      <div className="maincontainer" >
  <div className="firstcontainer" >
    <div className="titled" >Registration</div>
    <div  className="content" >
      <form method="POST">
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} placeholder="Enter your name"  />
          </div>
          {/* <div className="input-box">
            <span className="details">Username</span>
            <input type="text" placeholder="Enter your username" required/>
          </div> */}
          <div className="input-box">
            <span className="details">Email</span>
            <input type="text" name="email" id="email" value={user.email} onChange={handleInputs} placeholder="Enter your email" />
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input type="text" name="phone" id="phone" value={user.phone} onChange={handleInputs} placeholder="Enter your number" />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} placeholder="Enter your password" />
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="password" name="cPassword" id="cPassword" value={user.cPassword} onChange={handleInputs} placeholder="Confirm your password" />
          </div>
        </div>
        {/* <div className="gender-details">
          <input type="radio" name="gender" id="dot-1"/>
          <input type="radio" name="gender" id="dot-2"/>
          <input type="radio" name="gender" id="dot-3"/>
          <span className="gender-title">Gender</span>
          <div className="category">
            <label htmlFor="dot-1">
            <span className="dot one"></span>
            <span className="gender">Male</span>
          </label>
          <label htmlFor="dot-2">
            <span className="dot two"></span>
            <span className="gender">Female</span>
          </label>
          <label htmlFor="dot-3">
            <span className="dot three"></span>
            <span className="gender">Prefer not to say</span>
            </label>
          </div>
        </div> */}
        <div className="button">
          <input type="submit" name="signup" id="signup" value="register" onClick={postData} />
        </div>
      </form>
    </div>
  </div>

  </div>





    
    {/* <section classNameNameName="vh-100" style={{backgroundColor: '#eee'}}>
    <div classNameNameName="container h-100">
    <div classNameNameName="row d-flex justify-content-center align-items-center h-100">
      <div classNameNameName="col-lg-12 col-xl-11">
        <div classNameNameName="card text-black" style={{borderRadius: '25px'}}>
          <div classNameNameName="card-body p-md-5">
            <div classNameNameName="row justify-content-center">
              <div classNameNameName="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p classNameNameName="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <htmlForm method="POST" classNameNameName="mx-1 mx-md-4">

                  <div classNameNameName="d-flex flex-row align-items-center mb-4">
                    <i classNameNameName="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div classNameNameName="htmlForm-outline flex-fill mb-0">
                      <input type="text" name="name" id="name" value={user.name} onChange={handleInputs} classNameNameName="htmlForm-control" />
                      <label classNameNameName="htmlForm-label" htmlhtmlFor="htmlForm3Example1c">Your Name</label>
                    </div>
                  </div>

                  <div classNameNameName="d-flex flex-row align-items-center mb-4">
                    <i classNameNameName="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div classNameNameName="htmlForm-outline flex-fill mb-0">
                      <input type="phone" name="phone" id="phone" value={user.phone} onChange={handleInputs} classNameNameName="htmlForm-control" />
                      <label classNameNameName="htmlForm-label" htmlhtmlFor="htmlForm3Example3c">Your Phone</label>
                    </div>
                  </div>

                  <div classNameNameName="d-flex flex-row align-items-center mb-4">
                    <i classNameNameName="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div classNameNameName="htmlForm-outline flex-fill mb-0">
                      <input type="email" name="email" id="email" value={user.email} onChange={handleInputs} classNameNameName="htmlForm-control" />
                      <label classNameNameName="htmlForm-label" htmlhtmlFor="htmlForm3Example3c">Your Email</label>
                    </div>
                  </div>

                  <div classNameNameName="d-flex flex-row align-items-center mb-4">
                    <i classNameNameName="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div classNameNameName="htmlForm-outline flex-fill mb-0">
                      <input type="password" name="password" id="password" value={user.password} onChange={handleInputs} classNameNameName="htmlForm-control" />
                      <label classNameNameName="htmlForm-label" htmlhtmlFor="htmlForm3Example4c">Password</label>
                    </div>
                  </div>

                  <div classNameNameName="d-flex flex-row align-items-center mb-4">
                    <i classNameNameName="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div classNameNameName="htmlForm-outline flex-fill mb-0">
                      <input type="password" name="cPassword" id="cPassword" value={user.cPassword} onChange={handleInputs} classNameNameName="htmlForm-control" />
                      <label classNameNameName="htmlForm-label" htmlhtmlFor="htmlForm3Example4cd">Repeat your password</label>
                    </div>
                  </div>

                  <div classNameNameName="htmlForm-check d-flex justify-content-center mb-5">
                    <input
                      classNameNameName="htmlForm-check-input me-2"
                      type="checkbox"
                      value=""
                      id="htmlForm2Example3c"
                    />
                    <label classNameNameName="htmlForm-check-label" htmlhtmlFor="htmlForm2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div classNameNameName="htmlForm-group htmlForm-button d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <input type="submit" name="signup" id="signup" classNameNameName="htmlForm-submit" value="register" onClick={postData} />
                  </div>

                </htmlForm>

              </div>
              <div classNameNameName="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png" classNameNameName="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    </section> */}

</>
    )
}

export default Signup
