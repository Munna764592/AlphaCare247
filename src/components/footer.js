import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NavLink, Link } from "react-router-dom";
import { toast } from 'react-toastify';

const currYear = new Date().getFullYear();
export default function Footer() {
    // mail subscription 
    const [subMail, setsubMail] = useState("");
    const notifyse = () => toast.success("SUBSCRIPTION DONE!!");
    const [sebtn, setsebtn] = useState("");

    const Subemail = async () => {
        await axios.post('/subemail', {
            email: subMail
        }, { headers: { "Content-Type": "application/json" } }).then(res => {
            setsubMail("");
            notifyse();
        })
    }
    return (
        <>
            {/* <!--footer--> */}
            < div className="mb-5 footer mt-5" >
                <div className="container">
                    <div className="row py-1 py-md-2 px-lg-0">
                        <div className="col-lg-4 footer-col1 pt-lg-3">
                            <div className="row flex-column flex-md-row flex-lg-column">
                                <div className="col-md col-lg-auto">
                                    <div className="footer-logo">
                                        <img
                                            src={require('../images/nikhil/alpha.png')}
                                            alt=""
                                            className="img-fluid width-set"
                                        />
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="footer-text mt-1 mt-lg-1">
                                        <h3>
                                            "A Network Of Trusted Labs"
                                        </h3>
                                        <p>We have a network of various labs that people trust, and we are increasing their trust in them by providing quality and time-saving servicres to people so that their belief remains the same.</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <div className="footer-text mt-1 mt-lg-1">
                                <p>
                                    To receive email releases, simply provide
                                    <br />
                                    us with your email below
                                </p>
                                <form onSubmit={(e) => e.preventDefault()}
                                    method="POST"
                                    className="footer-subscribe"
                                >
                                    <div className="input-group">
                                        <input defaultValue={subMail} onChange={(e) => { setsubMail(e.target.value); setsebtn(e.target.value) }}
                                            name="subemail"
                                            type="email"
                                            className="form-control"
                                            placeholder="Your Email" required
                                        />
                                        <span><i className="icon-black-envelope"></i></span>
                                    </div>
                                    <button type="submit" style={{ padding: "3px 15px" }} className={sebtn != "" ? "btn-ap mt-1" : "btn-ap mt-1 d-none"} onClick={Subemail}>Subscribe</button>
                                </form>
                            </div>
                            <div className="footer-social d-md-none d-lg-block">
                                <a
                                    href="https://www.facebook.com/officialalphacare247?mibextid=ZbWKwL"
                                    target="blank"
                                    className="hovicon"
                                >
                                    <i className="icon-facebook-logo"></i>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/alphacare247/"
                                    target="blank"
                                    className="hovicon"
                                >
                                    <i className="fa fa-linkedin"></i>
                                </a>
                                <a
                                    href="https://instagram.com/alphacare247"
                                    target="blank"
                                    className="hovicon"
                                >
                                    <i className="icon-instagram"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6 col-lg-4">
                            <h3>Our Contacts</h3>
                            <div className="h-decor"></div>
                            <ul className="icn-list">
                                <li>
                                    <i className="icon-placeholder2"></i>
                                    C-3/76, First Floor, New Kondli, Mayur Vihar Ph-3, Delhi-110096
                                    <br />
                                </li>
                                <li>
                                    <i className="icon-telephone"></i>
                                    <b>
                                        <span className="phone">
                                            <a href="tel:+918377895401">
                                                +918377895401
                                            </a><span>, </span>
                                            <a href="tel:+918377895404">
                                                +918377895404
                                            </a>
                                        </span>
                                    </b>
                                </li>
                                <li>
                                    <i className="icon-black-envelope"></i>
                                    <a href="mailto:carealpha247@gmail.com">
                                        carealpha247@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row text-center text-md-left">
                            <div className="col-sm">
                                Copyright © {currYear} AlphaCare247
                                <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                                <NavLink to="/privacy.js">Privacy Policy</NavLink>
                                <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                                <NavLink to="/t&c.js">Terms & Conditions</NavLink>
                            </div>
                            <div className="col-sm-auto ml-auto">
                                <span className="d-none d-sm-inline">
                                    For bookings&nbsp;&nbsp;&nbsp;
                                </span>
                                <i className="icon-telephone"></i>
                                &nbsp;&nbsp;
                                <a href="tel:+918377895401">
                                    +91-8377-895-401
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}