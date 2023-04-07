import logo from '../images/nikhil/alpha.png';
import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import Slider from "react-slick";
import { Modal } from 'react-fade-modal'
import axios from 'axios';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import OTPInput, { ResendOTP } from "otp-input-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';
import { useForm } from "react-hook-form"


const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <div className="action">
                        <div className="d-flex justify-content-between align-content-center" style={{ height: "40px" }}>
                            <div onClick={() => setexpand()} className='profile-login'>
                                <img src={require("../images/user.png")} />
                            </div>
                            <div className='ml-2 cart'>
                                <span className='cart-circle'>5</span>
                                <i className="fa-xl fa-solid fa-bag-shopping"></i>
                            </div>
                        </div>
                        <div className={expandprofile ? "menu-login" : "menu-login active"}>
                            <h3>{username ? username : "Username"}<br />
                                <span style={{ fontWeight: "600" }}>{userphone}</span>
                            </h3>
                            <ul>
                                <li onClick={() => setisUpdate(true)}><img src={require("../images/user.png")} /><a>My Profile</a></li>
                                <li onClick={() => setprevReport(true)}><i style={{ color: "black", fontSize: "20px" }} className="fa-solid fa-file-medical mr-1"></i><a>Previous Reports</a></li>
                                <li onClick={() => logout()}><img src={require("../images/log-out.png")} /><NavLink to="/logout.js">Logout</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div style={{ marginTop: "3px" }} className="mr-6 d-flex">
                        <a onClick={() => { setopenLogin(true) }} style={{ color: '#02bdb4', fontWeight: "700" }} className="login nav-link ">LOGIN/SIGNUP</a>
                        <div className='cart'>
                            <span className='cart-circle'>5</span>
                            <i className="fa-xl fa-solid fa-bag-shopping"></i>
                        </div>
                    </div>
                </>
            )
        }
    }

    // login form 
    const [noField, setnoField] = useState(false);
    const [otpField, setotpField] = useState(false);
    const [expandprofile, setexpandprofile] = useState(true);
    const [openLogin, setopenLogin] = useState(false);
    const [prevReport, setprevReport] = useState(false);


    const setexpand = () => {
        if (expandprofile == true) {
            setexpandprofile(false);
        } else {
            setexpandprofile(true)
        }
    }

    // logout 
    const notify2 = () => toast("LOGOUT SUCCESS!")
    const logout = () => {
        notify2();
        setexpandprofile(true);
        setotpField(false);
        setnoField(false);
        setphone("");
        setOTP("");
    }
    // Login with registration 
    // toast notifications  
    const notify = () => toast("OTP SENT!");
    const notify1 = () => toast.success("LOGIN SUCCESS!")
    const [err, seterr] = useState(false);
    const [phoneno, setphone] = useState("")
    const submitForm = (e) => {
        e.preventDefault();
    }
    const PostData = () => {
        if (phoneno.length < 13 || phoneno.length > 13) {
            seterr(true);
            setnoField(false);
        } else {
            notify();
            seterr(false);
            axios.post('/register', {
                phone: phoneno
            }, { headers: { "Content-Type": "application/json" } }).then(res => {
                setnoField(true);
                setotpField(true);
                setTimeout(() => {
                    setresendbtn(true);
                }, 54000);

            })
        }
    }

    const [resendbtn, setresendbtn] = useState(false);
    function resendotp() {
        setresendbtn(false);
        notify();
        seterr(false);
        axios.post('/register', {
            phone: phoneno
        }, { headers: { "Content-Type": "application/json" } }).then(res => {

        })
        setTimeout(() => {
            setresendbtn(true);
        }, 60000);
    }
    const [errotp, seterrotp] = useState(false);
    const [OTP, setOTP] = useState("");
    const trigger = useRef(null);
    function verifyotp() {
        // trigger.current.click();
        axios.post('/otpverify', {
            otpver: OTP
        }, { headers: { "Content-Type": "application/json" } }).then(res => {
            console.log(res.data)
            if (res.data == 0) {
                seterrotp(true);
            } else {
                callProfilesection();
                seterrotp(false);
                notify1();
                setopenLogin(false);
                window.location.reload(false);
            }
        })

    }
    // Authentication with fetch datas 

    const callProfilesection = async () => {
        try {
            const res = axios.get('/loginUser', {
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                credentials: "include"
            }).then(res => {
                setusername(res.data.name)
                setuserphone(res.data.phone)
                setupdateEmail(res.data.email)
                setupdateName(res.data.name)
                setupdatePhone(res.data.phone);
                dispatch({ type: "USER", payload: true });
            })
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        callProfilesection();
    }, [])

    //  update profile section 
    const [otpUvalue1, setotpUvalue1] = useState("")
    const [otpUvalue2, setotpUvalue2] = useState("")
    const [otpUpdate1, setotpUpdate1] = useState(false);
    const [otpUpdate2, setotpUpdate2] = useState(false);
    const [username, setusername] = useState("");
    const [userphone, setuserphone] = useState("");
    const notify4 = () => toast.success("PROFILE UPDATED!")
    const notify5 = () => toast.success("OTP SENT TO YOUR MOBILE NUMBER!")
    const notify6 = () => toast.success("OTP SENT TO YOUR EMAILID!")
    const [isUpdate, setisUpdate] = useState(false);
    const [updatePhone, setupdatePhone] = useState("");
    const [updateEmail, setupdateEmail] = useState("");
    const [updateName, setupdateName] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        window.data = data;
        if ((data.updatedphone === "" || updatePhone === data.updatedphone) && (data.updatedemail === "" || updateEmail === data.updatedemail)) {
            await axios.post('/updateProfile', {
                updatedname: data.updatedname
            }, { headers: { "Content-Type": "application/json" } }).then(res => {
                notify4();
                setotpUpdate1(false);
                setotpUpdate2(false);
                setusername(data.updatedname);
            })
        } else if (updatePhone != data.updatedphone) {
            setotpUpdate1(true);
            setotpUpdate2(false);
            notify5();
            await axios.post('/UsentOtp', {
                phonenew: data.updatedphone,
                phone: userphone
            }, { headers: { "Content-Type": "application/json" } }).then(res => {

            })
        } else if (updateEmail != data.updatedemail) {
            setotpUpdate2(true);
            setotpUpdate1(false);
            notify6();
            await axios.post('/UsentOtpte', {
                emailnew: data.updatedemail,
                phone: userphone
            }, { headers: { "Content-Type": "application/json" } }).then(res => {

            })
        }
    }
    const verifyOTPU = () => {
        if (updatePhone != window.data.updatedphone) {
            axios.post('/otpverifyU', {
                otpver: otpUvalue1
            }, { headers: { "Content-Type": "application/json" } }).then(res => {
                if (res.data == 0) {
                    seterrotp(true);
                } else {
                    axios.post('/updateProfile', {
                        updatedphone: window.data.updatedphone,
                        updatedname: window.data.updatedname
                    }, { headers: { "Content-Type": "application/json" } }).then(res => {
                        notify4();
                        setotpUpdate1(false)
                        setuserphone(window.data.updatedphone)
                        setusername(window.data.updatedname);
                    })
                    seterrotp(false);
                }
            })
        }
    }
    const verifyOTPUE = () => {
        if (updateEmail != window.data.updatedemail) {
            axios.post('/otpverifyU', {
                otpver: otpUvalue2
            }, { headers: { "Content-Type": "application/json" } }).then(res => {
                if (res.data == 0) {
                    seterrotp(true);
                } else {
                    axios.post('/updateProfile', {
                        updatedemail: window.data.updatedemail,
                        updatedname: window.data.updatedname
                    }, { headers: { "Content-Type": "application/json" } }).then(res => {
                        notify4();
                        setotpUpdate1(false)
                        setuserphone(window.data.updatedphone)
                        setusername(window.data.updatedname);
                    })
                    seterrotp(false);
                }
            })
        }
    }

    const [fix, setFix] = useState(false);
    const [toTop, settoTop] = useState(false);
    function settoTopfun() {
        if (window.scrollY >= 100) {
            settoTop(true);
        } else {
            settoTop(false);
        }
    }
    window.addEventListener("scroll", settoTopfun);

    function setFixed() {
        if (window.scrollY >= 100) {
            setFix(true);
            setexpandprofile(true);
        } else {
            setFix(false);
        }
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500
    };

    window.addEventListener("scroll", setFixed);
    return (
        <>
            <header className="header">
                <div className="header-quickLinks js-header-quickLinks d-lg-none">
                    <div className="quickLinks-top js-quickLinks-top"></div>
                    <div className="js-quickLinks-wrap-m"></div>
                </div>
                <div style={{ position: "relative", zIndex: "100" }} className='d-lg-flex justify-content-between'>
                    <div className="header-topline d-none d-lg-flex">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-auto d-flex align-items-center">

                                    <div className="header-phone">
                                        <i className="icon-telephone"></i>
                                        <a href="tel:+918377895401">
                                            +918377895401
                                        </a>
                                        <span>, </span>
                                        <a href="tel:+918377895404">
                                            +918377895404
                                        </a>
                                    </div>
                                    <div className="header-info">
                                        <i className="icon-black-envelope"></i>
                                        <a href="mailto:carealpha247@gmail.com">
                                            carealpha247@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="col-auto ml-8 d-flex align-items-center">
                                    <span className="header-social">
                                        <a rel='noreferrer' target="_blank"
                                            href="https://www.facebook.com/officialalphacare247?mibextid=ZbWKwL"
                                            className="hovicon"
                                        >
                                            <i className="icon-facebook-logo-circle"></i>
                                        </a>
                                        <a rel='noreferrer' target="_blank"
                                            href="https://www.linkedin.com/company/alphacare247/"
                                            className="hovicon"
                                        >
                                            <i className="fa fa-linkedin"></i>
                                        </a>
                                        <a rel='noreferrer' target="_blank"
                                            href="https://instagram.com/alphacare247"
                                            className="hovicon"
                                        >
                                            <i className="icon-instagram-circle"></i>
                                        </a>

                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RenderMenu />
                </div>
                <div className={fix ? 'fixednav' : 'navbarup'}>
                    <div className="header-content">
                        <div className="container">
                            <div className="row align-items-lg-center">
                                <button
                                    className="navbar-toggler collapsed"

                                >
                                    <span className="icon-menu"></span>
                                </button>
                                <div className="col-lg-auto col-lg-2 d-flex align-items-lg-center">
                                    <NavLink to="./home" className="header-logo">
                                        <img src={logo} alt="" className="img-fluid" />
                                    </NavLink>
                                </div>
                                <div className="col-lg ml-auto header-nav-wrap">
                                    <div className="header-nav js-header-nav">
                                        <nav className="navbar navbar-expand-lg btco-hover-menu">
                                            <div
                                                className="collapse navbar-collapse justify-content-end"
                                                id="navbarNavDropdown"
                                            >
                                                <ul className="navbar-nav">
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="./about.js">About Us</NavLink>
                                                    </li>
                                                    {/* <li className="nav-item">
                                                        <NavLink className="nav-link" to="./lab_details">Labs</NavLink>
                                                    </li> */}
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="./blogs.js">Blogs</NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {openLogin && <Modal
                setopenLogin={setopenLogin}
                modalCss='modal231'
                closeOnClickOutside={false}>
                <div style={{ display: 'block' }} className="modal modal-form" id="modalBookingForm">
                    <div style={{ maxWidth: "768px", borderRadius: '10px', minHeight: 'auto' }} className="modal-dialog">
                        <div className="modal-content">
                            <button style={{ zIndex: '6446' }} aria-label="Close" onClick={() => setopenLogin(false)} className=" close" >
                                <i className="icon-error"></i>
                            </button>

                            <div className="container-modal" id="container">

                                <div className="form-container sign-in-container">
                                    <form method='POST' className={noField ? "form-modal d-none" : "form-modal"} onSubmit={submitForm}>
                                        <h1 className='h1-modal'>Sign in</h1>

                                        <PhoneInput
                                            className='form-control my-1'
                                            placeholder="Phone no"
                                            defaultCountry="IN"
                                            value={phoneno}
                                            onChange={setphone} required autoComplete='off' />
                                        <div style={{ width: "100%", padding: "10px" }} className={err ? "alert alert-danger" : "alert alert-danger d-none"}>
                                            Please enter valid 10 digit Mobile number!
                                        </div>
                                        <button style={{ width: "90%" }} className="btn-ap mt-2 mb-1" type='submit' name='getotp' onClick={PostData} >Get OTP</button>
                                        <span className='mt-1'>By logging in, you agree to our
                                            <a style={{ color: "#02bdb4" }} href="./t&c.js"> Terms and Conditions</a> & <a style={{ color: "#02bdb4" }} href=",/privacy.js">Privacy Policy</a></span>

                                    </form>
                                    <form method='POST' className={otpField ? "form-modal" : "form-modal d-none"} onSubmit={submitForm}>
                                        <h1 className='h1-modal'>OTP Verification</h1>
                                        <div>Please enter the OTP sent to mobile number <span style={{ color: "red" }}>{phoneno}</span>.</div>

                                        <OTPInput className="otpinp mt-2" value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} required />
                                        <div style={{ width: "100%", padding: "10px" }} className={errotp ? "alert alert-danger" : "alert alert-danger d-none"}>
                                            Please enter valid OTP!
                                        </div>
                                        <div> Didn't get OTP</div>
                                        <ResendOTP className={resendbtn ? "Resendbtn " : "Resendbtn opacity-50"} onResendClick={() => resendotp()} />
                                        <button style={{ width: "90%" }} className="btn-ap mt-3 mb-1" type='submit' name='getotp' onClick={verifyotp} ref={trigger}>Verify OTP</button>
                                        <span className='mt-1'>By logging in, you agree to our
                                            <a style={{ color: "#02bdb4" }} href="./t&c.js"> Terms and Conditions</a> & <a style={{ color: "#02bdb4" }} href="./privacy.js">Privacy Policy</a></span>
                                    </form>
                                </div>
                                <div className="overlay-container">
                                    <Slider {...settings}>
                                        <img src={require("../images/login/login1.png")} alt="img" />
                                        <img src={require("../images/login/login2.png")} alt="img" />
                                        <img src={require("../images/login/login3.png")} alt="img" />
                                        <img src={require("../images/login/login4.png")} alt="img" />
                                        <img src={require("../images/login/login5.png")} alt="img" />
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            }
            {isUpdate && <Modal
                setIsOpen={setisUpdate}
                modalCss='modal231'
                closeOnClickOutside={false}>
                <div style={{ display: 'block' }} className="modal modal-form" id="modalBookingForm">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <button style={{ color: "#02bdb4" }} onClick={() => setisUpdate(false)} className=" close" >
                                <i className="icon-error"></i>
                            </button>
                            <div className="modal-body">
                                <div className="modal-form">
                                    <h3>My Profile</h3>
                                    <form className="mt-15" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="input-group">
                                            <span>
                                                <i className="icon-user"></i>
                                            </span>
                                            <input autoComplete="off" defaultValue={updateName} onChange={(e) => { setupdateName(e.target.value) }} type="text" name="updatedname" className="form-control" placeholder="Full Name" {...register("updatedname", {
                                                minLength: {
                                                    value: 3, message: "Please enter at least 3 character!"
                                                }
                                            })} />
                                            {errors?.updatedname && (<div style={{ width: "100%", padding: "10px" }} className="alert alert-danger">
                                                {errors?.updatedname.message}
                                            </div>)}
                                        </div>
                                        <div className="input-group">
                                            <span>
                                                <i className="icon-email2"></i>
                                            </span>
                                            <input autoComplete="off" defaultValue={updateEmail} onChange={(e) => { setupdateEmail(e.target.value) }} type="email" name="updatedemail" className="form-control" placeholder="Your Email" {...register("updatedemail", {
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Please enter valid email!"
                                                }
                                            })} />
                                            {errors?.updatedemail && (<div style={{ width: "100%", padding: "10px" }} className="alert alert-danger">
                                                {errors?.updatedemail.message}
                                            </div>)}
                                        </div>
                                        <div style={{ background: "#fff3cd", padding: "9px", borderRadius: "6px" }} className={otpUpdate2 ? "row row-xs-space mt-1" : "row row-xs-space mt-1 d-none"}>
                                            <div className="col-sm-6">
                                                <div style={{ borderColor: "red" }} className='input-group otp-inputgrp'>
                                                    <span style={{ position: "relative", zIndex: "+5", color: "#02bdb4", fontSize: "20px", top: "10px", left: "10px" }}>
                                                        <i className="fa-solid fa-key"></i>
                                                    </span>
                                                    <input defaultValue={otpUvalue2} onChange={(e) => setotpUvalue2(e.target.value)} name="otpUpdate2" autoComplete='off' type="number" className='form-control ml-2' placeholder='Enter OTP' />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 mt-1 mt-sm-0 ">
                                                <div>
                                                    <a onClick={verifyOTPUE} className="btn-otp">
                                                        Send OTP
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            <div className="input-group">
                                                <span>
                                                    <i className="icon-smartphone"></i>
                                                </span>
                                                <input autoComplete="off" defaultValue={updatePhone} onChange={(e) => { setupdatePhone(e.target.value) }} type="tel" name="updatedphone" className="form-control" placeholder="Phone no" {...register("updatedphone", {
                                                    maxLength: {
                                                        value: 13, message: "Please enter valid 10 digit mobile number!"
                                                    },
                                                    minLength: {
                                                        value: 13, message: "Please enter valid 10 digit mobile number!"
                                                    },
                                                    pattern: {
                                                        value: /^\+?([0-9]{2})\)?([0-9]{5})?([0-9]{5})$/,
                                                        message: "Please enter valid 10 digit mobile number!"
                                                    }
                                                })} />
                                                {errors?.updatedphone && (<div style={{ width: "100%", padding: "10px" }} className="alert alert-danger">
                                                    {errors?.updatedphone.message}
                                                </div>)}
                                            </div>

                                            <div style={{ background: "#fff3cd", padding: "9px", borderRadius: "6px" }} className={otpUpdate1 ? "row row-xs-space mt-1" : "row row-xs-space mt-1 d-none"}>
                                                <div className="col-sm-6">
                                                    <div style={{ borderColor: "red" }} className='input-group otp-inputgrp'>
                                                        <span style={{ position: "relative", zIndex: "+5", color: "#02bdb4", fontSize: "20px", top: "10px", left: "10px" }}>
                                                            <i className="fa-solid fa-key"></i>
                                                        </span>
                                                        <input defaultValue={otpUvalue1} onChange={(e) => setotpUvalue1(e.target.value)} name='otpUpdate1' autoComplete='off' type="number" className='form-control ml-2' placeholder='Enter OTP' />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 mt-1 mt-sm-0 ">
                                                    <div>
                                                        <a onClick={verifyOTPU} className="btn-otp">
                                                            Verify OTP
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ width: "100%", padding: "10px", marginTop: "10px" }} className={errotp ? "alert alert-danger" : "alert alert-danger d-none"}>
                                                Please enter valid OTP!
                                            </div>
                                        </div>
                                        <div className="text-right mt-2">
                                            <button style={{ width: "40%" }} type="submit" className="btn-ap">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >
            }
            {prevReport && <Modal
                setprevReport={setprevReport}
                modalCss='modal231'
                closeOnClickOutside={false}>
                <div style={{ display: 'block' }} className="modal modal-form" id="modalBookingForm">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <button style={{ zIndex: '644', color: "#23d4be" }} aria-label="Close" onClick={() => setprevReport(false)} className=" close" >
                                <i className="icon-error"></i>
                            </button>
                            <div className="modal-body">
                                <h3>My Health Records</h3>
                                <div className='d-flex justify-content-center' >
                                    <img style={{ height: "250px", width: "375px" }} src={require("../images/login/nodata2.jpg")} alt='img' />
                                </div>
                                <h1 style={{ color: "red" }} className='text-center'>NO RECORD FOUND!!</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>}
            <ToastContainer position='bottom-right' />
            <a href='#'>
                <div className={toTop ? 'backToTop visible' : 'backToTop'}>
                    <i className="icon icon-up-arrow"></i>
                </div>
            </a>
            <div className={toTop ? 'backToTop bl visible' : 'backToTop bl'}>
                <a
                    href="https://wa.me/+918377895401"
                    target="blank"
                    className="hovicon"
                >
                    <i style={{ fontSize: '40px', color: "white" }} className="fa-brands fa-whatsapp"></i>
                </a>
            </div>
        </>
    )
}

export default Navbar;