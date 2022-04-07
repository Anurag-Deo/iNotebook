import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        });
        const json = await response.json()
        console.log(json);
        //Redirecting the user to the home page
        if (json.success) {
            //Saving the auth-token to the local storage for further use and redirect
            localStorage.setItem('token', json.authtoken)
            history.push("/");
            props.showAlert("Logged in Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e) => {
        //This is a special syntax used to say that add the listed property after the note
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        // <div>
        //     <form onSubmit={handleSubmit}>
        //         <div className="mb-3">
        //             <label htmlhtmlFor="email" className="form-label">Email address</label>
        //             <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
        //             <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        //         </div>
        //         <div className="mb-3">
        //             <label htmlhtmlFor="password" className="form-label">Password</label>
        //             <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" />
        //         </div>
        //         <button type="submit" className="btn btn-primary" >Submit</button>
        //     </form>
        // </div>
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid" alt="Sample image" />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <h2 style={{margin:'50px'}}>Login to iNotebook</h2>
                        <form onSubmit={handleSubmit}>
                            
                            {/* <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-linkedin-in"></i>
                                </button>
                            </div> */}

                            {/* <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div> */}

                            {/* <!-- Email input --> */}
                            <div className="form-outline mb-4">
                                <input type="email" id="email" className="form-control form-control-lg"
                                    placeholder="Enter a valid email address" name='email' value={credentials.email} onChange={onChange} required minLength={1}/>
                                <label className="form-label" htmlFor="form3Example3">Email address</label>
                            </div>

                            {/* <!-- Password input --> */}
                            <div className="form-outline mb-3">
                                <input type="password" id="password" className="form-control form-control-lg"
                                    placeholder="Enter password" name='password' value={credentials.password} onChange={onChange} required minLength={1}/>
                                <label className="form-label" htmlFor="form3Example4">Password</label>
                            </div>

                            {/* <div className="d-flex justify-content-between align-items-center">
                                {/* <!-- Checkbox --> */}
                            {/* <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div> */}
                            {/* <a href="#!" className="text-body">Forgot password?</a>
                            </div> */}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/signup"
                                    className="link-danger">Register</Link></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <div
                className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
                {/* <!-- Copyright --> */}
                <div className="text-white mb-3 mb-md-0">
                    Copyright © 2022. All rights reserved.
                </div>
                {/* <!-- Copyright --> */}

                {/* <!-- Right --> */}
                <div>
                    <a href="https://www.facebook.com/profile.php?id=100073726186171" className="text-white me-4">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#!" className="text-white me-4">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="mailto:anuragdeo3@gmail.com" className="text-white me-4">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/anurag-deo-8b30b422b/" className="text-white">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                {/* <!-- Right --> */}
            </div>
        </section>
    )
}

export default Login