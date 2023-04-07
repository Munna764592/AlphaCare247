import React, { useState } from "react";
import CountUp from 'react-countup';

export default function About() {
    const [marginFix, setMargin] = useState(false);

    function setMarginfun() {
        if (window.scrollY >= 100) {
            setMargin(true);
        } else {
            setMargin(false);
        }
    }
    window.addEventListener("scroll", setMarginfun);
    return (
        <>

            <div className="page-content">
                <div className={marginFix ? 'section page-content-first margin_about' : 'section page-content-first mt-8'}>
                    <div className="container">
                        <div className="text-center">
                            <h1 style={{ color: "#02bdb4", marginBottom: "0px" }}><span style={{ color: "#ffc107" }}>About </span>AlphaCare247</h1>
                            <div className="h-decor"></div>
                        </div>
                    </div>
                    <img src={require("../images/nikhil/about us.png")} />
                </div>
                <div style={{ color: "black" }} className='container-xxl'>
                    <div className='mt-3 p-2 text-center con_about'>
                        Network of your Trusted Labs—We take care of patient choice. It is a single platform where a patient can obtain all blood and radiology tests. We are providing services in several cities and are still trying to cover more so that patient do not need to go far from their home. Patient will get trusted and certified labs at their door step.
                        <br /><br />
                        We also respect Patient time by reducing the amount of time they spend standing in long lines or running around for tests. We are finally going to relieve their anxiety about reports on which they rely for complete accuracy.
                        <br /><br />
                        We have a network of fully automated laboratories for blood tests and radiology tests and a large team of highly skilled phlebotomists who specialize in sample collection from homes. We offer a user-friendly website where patient can easily book any test.
                        <br /><br />
                        We are still not stop we are tirelessly trying to provide slot timing as per their convenience. Our staff takes care of all the needs of the patient, trying to get their test done without any pain of time or money, and we will provide them the best service as promised.
                        <h1 style={{ color: "#02bdb4", marginBottom: "0px" }}><span style={{ color: "#ffc107" }}>Our </span>Mission</h1>
                        <div className="h-decor"></div>
                        <br />
                        It is our mission to exceed expectations by providing exceptional physical care to our patients and, at the same time, building relationships of trust with them.
                        <br /><br />
                        "Zero Complaints" Our mission is to receive zero complaints from our patients, and we are day by day improving our services to reach that goal.
                    </div>
                </div>
                <div className="section my-5">
                    <div className="container">
                        <div
                            className="row js-icn-carousel icn-carousel flex-column flex-sm-row text-center text-sm-left"            >
                            <div className="col-md">
                                <div className="icn-text">
                                    <div>
                                        <h1><CountUp duration={10} end={947} />+</h1>
                                        <h5 className="icn-text-title">Happy Users</h5>
                                    </div>
                                    <div style={{ height: "70px", overflow: "hidden", display: "flex", alignItems: "center" }}>
                                        <img style={{ width: "120px", height: "120px" }} src={require("../images/svg/13.png")} alt="img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="icn-text">
                                    <div>
                                        <h1><CountUp duration={10} end={1169} />+</h1>
                                        <h5 className="icn-text-title">Test Booked</h5>
                                    </div>
                                    <div style={{ height: "70px", overflow: "hidden", display: "flex", alignItems: "center" }}>
                                        <img style={{ width: "120px", height: "120px" }} src={require("../images/svg/14.png")} alt="img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="icn-text">
                                    <div>
                                        <h1><CountUp duration={5} end={15} />+</h1>
                                        <h5 className="icn-text-title">Trusted Labs</h5>
                                    </div>
                                    <div style={{ height: "70px", overflow: "hidden", display: "flex", alignItems: "center" }}>
                                        <img style={{ width: "120px", height: "120px" }} src={require("../images/svg/15.png")} alt="img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md">
                                <div className="icn-text">
                                    <div>
                                        <h1><CountUp duration={5} end={10} />+</h1>
                                        <h5 className="icn-text-title">Phlebotomist</h5>
                                    </div>
                                    <div style={{ height: "70px", overflow: "hidden", display: "flex", alignItems: "center" }}>
                                        <img style={{ width: "120px", height: "120px" }} src={require("../images/svg/16.png")} alt="img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}