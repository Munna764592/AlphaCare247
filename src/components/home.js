import Slider from "react-slick";
import { Modal } from 'react-fade-modal';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import PhoneInput from 'react-phone-number-input'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useLabContext } from "./context/globalcontext";
import Cookies from 'js-cookie';
import { useFilterContext } from "./context/filtercontext";
// import Modal from 'react-modal';


const Icons = ({ val, setFaqIsOpen2, setclickedFaq }) => {
    const [expandIcon, setexpandIcon] = useState(false);
    function expandIconfun() {
        if (expandIcon === false) {
            setexpandIcon(true);
        } else if (expandIcon === true) {
            setexpandIcon(false);
        }
    }
    return (
        <div className="kf">
            <img className={expandIcon ? "cbt-icon1 cbt-icon11" : "cbt-icon1"} src={require("../images/radiology_pathology/1.png")} alt="img" />
            <img className={expandIcon ? "cbt-icon2 cbt-icon21" : "cbt-icon2"} src={require("../images/radiology_pathology/3.png")} alt="img" onClick={() => { setFaqIsOpen2(1); setclickedFaq(val) }} />
            <img className={expandIcon ? "cbt-icon3 cbt-icon31" : "cbt-icon3"} src={require("../images/radiology_pathology/4.png")} alt="img" />
            <img className={expandIcon ? "cbt-icon4 cbt-icon41" : "cbt-icon4"} src={require("../images/radiology_pathology/2.png")} alt="img" onClick={() => { expandIconfun() }} />
            <img style={{ width: "250px", height: "250px" }} src={val.link} alt="img" />
            <h1>{val.category}</h1>
            <div className="MostBText">{val.content}</div>
        </div>
    )
}
const FaqCommon = ({ res }) => {
    const [hideFaq, sethideFaq] = useState(true);

    function hideFaqiconfun() {
        if (hideFaq === false) {
            sethideFaq(true);
        } else if (hideFaq === true) {
            sethideFaq(false);
        }
    }
    return (
        <ul style={{ paddingLeft: "1rem", margin: "0px" }}>
            <li>
                <div className="faqheading" onClick={() => { hideFaqiconfun() }}>
                    {res.q} <i style={{ cursor: "pointer", color: "#02bdb4" }} className={hideFaq ? "fa-solid fa-angle-down rotr " : "fa-solid fa-angle-down rotr rotateFaqicon"} ></i>
                </div>
                <div className={hideFaq ? "hideText hideText1 mt-1" : "hideText mt-1"}>{res.a}</div>
                <hr style={{ marginTop: "0px", marginBottom: "10px", padding: "0px", width: "100%", height: "0.3px", backgroundColor: "black" }} />
            </li>
        </ul>
    )
}

export default function Home() {
    const navigate = useNavigate();
    const { isLoading, LabDatas, PinCodes, MostBookedPathology, MostBookedRadiology, FaqRadiology, FaqPathology, FaqSample, OpenLoginFun } = useLabContext();
    const { handlesrchfilter, filters: { text }, filterData, filterlabData, Cookielen, datalabs, sorting } = useFilterContext();
    const [srchsuggest, setsrchsuggest] = useState(true);
    const [FaqIsOpen2, setFaqIsOpen2] = useState(0);
    const [clickedFaq, setclickedFaq] = useState([]);
    const [marginFix, setMargin] = useState(false);
    const [quickLinks, setQuicklinks] = useState(false);
    const [stucks, setStuck] = useState(false);
    const [call1, setcall1] = useState(true);
    const [call2, setcall2] = useState(false);
    const [faqcall1, setfaqcall1] = useState(true);
    const [faqcall2, setfaqcall2] = useState(false);
    const [faqcall3, setfaqcall3] = useState(false);

    function sendval(val) {
        if (val === 1) {
            setcall1(true);
            setcall2(false);

        } else if (val === 2) {
            setcall1(false);
            setcall2(true);

        }
    }
    function sendfaqval(val) {
        if (val === 1) {
            setfaqcall1(true);
            setfaqcall2(false)
            setfaqcall3(false)
        } else if (val === 2) {
            setfaqcall1(false);
            setfaqcall2(true)
            setfaqcall3(false)
        } else if (val === 3) {
            setfaqcall1(false);
            setfaqcall2(false)
            setfaqcall3(true)
        }
    }
    function setMarginfun() {
        if (window.scrollY >= 100) {
            setMargin(true);
        } else {
            setMargin(false);
        }
    }
    function setQuicklinksfun() {
        if (window.scrollY >= 800) {
            setQuicklinks(true);
        } else {
            setQuicklinks(false);
            setStuck(false);
        }
    }
    function addStuck(val) {
        setStuck(val);
        if (window.scrollY >= 800 && val == true) {
            setStuck(true);
        }
    }
    window.addEventListener("scroll", setQuicklinksfun);
    window.addEventListener("scroll", setMarginfun);

    // Upload prescription 
    const [LoginUsr, setLoginUsr] = useState(false);
    const notify2 = () => toast("PRESCRIPTION UPLODED. WE WILL GET BACK TO YOU SHORTLY!!")
    const [Prescription, setPrescription] = useState("");
    const [uploadPres, setuploadPres] = useState(false);
    const [phoneNo, setphoneNo] = useState("");
    const Checklogin = () => {
        if (LoginUsr === false) {
            OpenLoginFun(true);
        }
    }
    const callProfilesection = async () => {
        await axios.get('/loginUser', {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            credentials: "include"
        }).then(res => {
            setLoginUsr(true);
            setphoneNo(res.data.phone);
        })
    }
    useEffect(() => {
        callProfilesection();
    }, [])

    const UploadPrescription = async () => {
        const formData = new FormData();
        formData.append('phone', phoneNo);
        formData.append('prescription', Prescription)
        if (LoginUsr === true) {
            await axios.post('/uploadprescription', formData).then(res => {
                notify2()
                setPrescription("")
                setuploadPres(false)
            })
        } else if (LoginUsr === false) {
            OpenLoginFun(true);
        }
    }
    // feedback form 
    const notifyff = () => toast.success("FEEDBACK SENT!!");
    const [nameff, setnameff] = useState("");
    const [phoneff, setphoneff] = useState("");
    const [emailff, setemailff] = useState("");
    const [feedbackff, setfeedbackff] = useState("");
    const FeedbackPost = async () => {
        await axios.post('/feedback', {
            name: nameff,
            phone: phoneff,
            email: emailff,
            feedback: feedbackff
        }, { headers: { "Content-Type": "application/json" } }).then(res => {
            notifyff()
            setnameff("")
            setemailff("")
            setphoneff("")
            setfeedbackff("")
        })
    }
    // get a callback 
    const notify = () => toast("YOU WILL RECEIVE A CALL AFTER SOME TIME!");
    const [err, seterr] = useState(false);
    const [phoneno, setphone] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
    }
    const PostData = async () => {
        if (phoneno.length < 13 || phoneno.length > 13) {
            seterr(true);
        } else {
            await axios.post('/callback', {
                phone: phoneno
            }, { headers: { "Content-Type": "application/json" } }).then(res => {
                setphone("")
                notify();
                seterr(false);
            })
        }
    }

    // check pincode available 
    const [pincode, setpincode] = useState("")
    const [Tick, setTick] = useState(false);
    const [Xmark, setXmark] = useState(false);
    const CheckDigit = (pin) => {
        if (pin.length >= 6) {
            CheckPincode(pin);
        } else {
            setTick(false);
            setXmark(false);
        }
    }
    const CheckPincode = (pin) => {
        setpincode(pin);
        const code = PinCodes.filter(res => {
            if (res.Pincodes === pin) {
                return pin;
            }
        })
        if (code.filter(res => { return res.Pincodes })[0]) {
            setTick(true);
            setXmark(false);

        } else {
            setTick(false);
            setXmark(true);

        };
    }
    // cookie 
    const [myArray, setMyArray] = useState([]);
    const getCookie = () => {
        if (Cookies.get("tests") !== undefined) {
            setMyArray(JSON.parse(Cookies.get("tests")));

            if (JSON.parse(Cookies.get("tests")).length === 0) {
                setbookbtn(true);
            } else {
                setbookbtn(false)
            }
            Cookielen(JSON.parse(Cookies.get("tests")).length)
        } else {
            setbookbtn(true);
            Cookies.set("tests", JSON.stringify(myArray), {
                expires: 10,
                secure: true,
                sameSite: 'strict',
                path: '/'
            })
        }
    }
    useEffect(() => {
        getCookie();
    }, [])
    const setCookie = (id, name) => {
        setsrchsuggest(true);
        window.newArray = [...myArray, { 'id': id, 'test': name }];
        setMyArray(window.newArray);
        Cookies.set("tests", JSON.stringify(window.newArray), {
            expires: 1,
            secure: true,
            sameSite: 'strict',
            path: '/'
        })
        getCookie();

    }
    const [bookbtn, setbookbtn] = useState(false);
    const setbookfun = () => {
        // setbookbtn(true);
    }
    const deleteTest = function (id, test) {
        const cookieData = JSON.parse(Cookies.get("tests"))
        const updatedData = cookieData.filter(item => item.id !== id);
        Cookies.set('tests', JSON.stringify(updatedData));
        getCookie();
    }
    const [availabletest, setavailabletest] = useState(false)
    const SelectTest = () => {
        if (datalabs === undefined) {
            setavailabletest(true);
        } else {
            setavailabletest(false);
            navigate("/select-tests")
        }
    }
    // models 
    var settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    var settings2 = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    var settings4 = {
        dots: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,

    };
    var settings3 = {
        dots: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    var settings6 = {
        autoplay: true,
        infinite: true,
        speed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplaySpeed: 1500,
        responsive: [{
            breakpoint: 856,
            settings: {
                slidesToShow: 4,
                infinite: true
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                infinite: true
            }
        }
        ]
    };
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style, borderColor: "#02bdb4"
                }
                }
                onClick={onClick}
            >
                <i style={{ zIndex: "+5", position: "relative" }} className="fa-regular fa-circle-right"></i>
            </div >
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, borderColor: "#02bdb4" }}
                onClick={onClick}
            />
        );
    }
    var settings7 = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        autoplay: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 1500,
        responsive: [{
            breakpoint: 856,
            settings: {
                slidesToShow: 2,
                infinite: true
            }
        },
        {
            breakpoint: 550,
            settings: {
                slidesToShow: 1,
                infinite: true
            }
        },
        {
            breakpoint: 1100,
            settings: {
                slidesToShow: 3,
                infinite: true
            }
        }
        ]
    };
    if (isLoading) {
        {
            return (
                <>
                    <div style={{ position: "fixed", background: "rgba(0,0,0,0.7)", width: "100%", height: "110vh", zIndex: "99999", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-105px" }}>
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <div className={marginFix ? 'main-home fixed' : 'main-home'}>
                <h1 className="m-homeh1">A Network Of Your Trusted Lab</h1>
                <div className="srch-main" >
                    <div className="srch-loca">
                        <div className={Xmark ? "tooltipcss tooltipop" : "tooltipcss"}>Presently this pincode is not serviceable</div>
                        <span className="icon-location">
                            <i className="fa-solid fa-1x fa-location-dot"></i>
                        </span>
                        <input style={{ width: "100%" }} className="form-control drp-srchbar " type="number" defaultValue={pincode} onChange={(e) => { CheckDigit(e.target.value) }}></input>
                        <i style={{ position: "absolute", zIndex: "+4", right: "7px", top: "17px", fontSize: "20px", color: "#4BB543" }} className={Tick ? 'fa-solid fa-check' : 'fa-solid fa-check d-none'}></i>
                        <i style={{ position: "absolute", zIndex: "+4", right: "7px", top: "17px", fontSize: "20px", color: "red" }} className={Xmark ? 'fa-solid fa-xmark' : 'fa-solid fa-xmark d-none'}></i>
                    </div>
                    <div className="srch-test" >
                        <form onSubmit={(e) => e.preventDefault()}>
                            <input className="form-control srch-bar" type="text" name="text" value={text} onChange={(e) => { handlesrchfilter(e); setsrchsuggest(false) }} autoComplete="off" />
                        </form>
                        <span className="icon-srchtest">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <div className={srchsuggest ? "d-none srch_suggest" : "srch_suggest"}>
                            {filterData && (filterData.map(res => {
                                return (
                                    <div key={res._id}><span className="listtest" onClick={() => { setCookie(res._id, res.name); setsrchsuggest(true) }}>{res.name}</span>
                                    </div>
                                )
                            }))
                            }
                        </div>
                    </div>
                    <select className="form-select drp-srchbar2" onClick={sorting} >
                        <option className="srch-drpdown" defaultValue>All</option>
                        <option className="srch-drpdown" value="pathology">Pathology</option>
                        <option className="srch-drpdown" value="radiology">Radiology</option>
                    </select>
                    <div className="prescription" onClick={() => { LoginUsr ? setuploadPres(true) : Checklogin() }}>
                        <span className="or-srch">or</span><img className="ml-1 img-up" src={require("../images/prescription.png")} alt="img" /><span className="up-word">Upload<br />Prescription<i className="fa-solid fa-caret-right"></i></span>
                    </div>
                </div>
                <div style={{ display: "flex" }}>
                    <img className="img-home" src={require("../images/scooter12.png")} alt="img" />
                    <div style={{ width: "50%" }} className="text-center">
                        <div className="mb-1">
                            {(Cookies.get("tests") !== undefined) ? JSON.parse(Cookies.get("tests"))?.map(res => {
                                return (
                                    <span key={res?.id} className="testselect" >{res?.test}<i style={{ cursor: "pointer" }} className="fa-regular fa-circle-xmark ml-1" onClick={() => { deleteTest(res?.id, res?.test) }}></i></span>
                                )
                            }) : setbookfun()}
                        </div>
                        <div style={{ padding: "7px", width: "70%", margin: "auto" }} className={availabletest ? "alert alert-danger text-center" : "d-none alert alert-danger text-center"}>
                            This combination of tests is not available in any lab!
                        </div>
                        <button onClick={() => SelectTest()} style={{ borderRadius: "50px", padding: "13px 30px", fontSize: "25px" }} className={bookbtn ? 'd-none btn-lab btn-book mt-1' : 'btn-lab mt-1 btn-book'}>Book</button>
                    </div>
                </div>
                <div className="labname-slider">
                    <div className="slider-head">15+ LABS TO <br />CHOOSE FROM...<i className="arr-slider ml-3 fa-solid fa-play"></i></div>
                    <Slider className="logo-slider" {...settings6}>
                        <img className="img-slider" src={require("../images/HCPL.png")} alt="img" />
                        <img className="img-slider" src={require("../images/HEALTHFIRST.png")} alt="img" />
                        <img className="img-slider" src={require("../images/KANTVAM.png")} alt="img" />
                        <img className="img-slider" src={require("../images/KRISHNA.png")} alt="img" />
                        <img className="img-slider" src={require("../images/LDPL.png")} alt="img" />
                        <img className="img-slider" src={require("../images/midas (1).png")} alt="img" />
                        <img className="img-slider" src={require("../images/midas.png")} alt="img" />
                        <img className="img-slider" src={require("../images/MYLAB.png")} alt="img" />
                        <img className="img-slider" src={require("../images/pathkind.png")} alt="img" />
                        <img className="img-slider" src={require("../images/SRL.png")} alt="img" />
                        <img className="img-slider" src={require("../images/alpha_invitro.png")} alt="img" />
                    </Slider>
                </div>
            </div>
            <div className="page-content">
                {/* <!--section slider--> */}
                <div className="section" >
                    <div className="quickLinks-wrap js-quickLinks-wrap-d d-none d-lg-flex">
                        <div className={stucks ? 'quickLinks stuck closed' : 'quickLinks closed'} >
                            <div className="container">
                                <div className="row no-gutters">
                                    <div className="col">
                                        <a className="link">
                                            <i className="icon-calendar"></i>
                                            <span>Feedback Form</span>
                                        </a>
                                        <div className="link-drop">
                                            <h5 className="link-drop-title">
                                                <i className="icon-calendar"></i>
                                                Feedback Form
                                            </h5>
                                            <form method="POST" onSubmit={(e) => { e.preventDefault() }}>
                                                <div className="input-group">
                                                    <span>
                                                        <i className="icon-user"></i>
                                                    </span>
                                                    <input defaultValue={nameff} onChange={(e) => setnameff(e.target.value)}
                                                        name="nameff"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Your Name*"
                                                        required
                                                    />
                                                </div>
                                                <div className="row row-sm-space mt-1">
                                                    <div className="col">
                                                        <div className="input-group">
                                                            <span>
                                                                <i className="icon-email2"></i>
                                                            </span>
                                                            <input defaultValue={emailff} onChange={(e) => setemailff(e.target.value)}
                                                                name="emailff"
                                                                type="email"
                                                                className="form-control"
                                                                placeholder="Your Email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="input-group">
                                                            <span>
                                                                <i className="icon-smartphone"></i>
                                                            </span>
                                                            <input
                                                                name="phoneff" defaultValue={phoneff} onChange={(e) => setphoneff(e.target.value)}
                                                                type="tel" maxLength="10" minLength="10"
                                                                className="form-control"
                                                                placeholder="Your Phone*"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row row-sm-space mt-1">
                                                    <div className="col-sm-12">
                                                        <div className="input-group flex-nowrap">
                                                            <span>
                                                                <i className="icon-pencil-writing"></i>
                                                            </span>
                                                            <input
                                                                type="text" defaultValue={feedbackff} onChange={(e) => setfeedbackff(e.target.value)}
                                                                name="feedbackff"
                                                                className="form-control"
                                                                placeholder="feedback" required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right mt-2">
                                                    <button style={{ padding: "3px 15px" }} type="submit" className="btn-ap" onClick={FeedbackPost}>
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col col-close">
                                        <a className="js-quickLinks-close" onClick={() => addStuck(false)}>
                                            <i
                                                className="icon-top"
                                                title="Close panel"
                                            ></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={quickLinks ? 'quickLinks-open showquicklinks' : 'quickLinks-open'} >
                                <span
                                    title="Open panel"
                                    onClick={() => addStuck(true)}>
                                    +
                                </span>
                            </div>
                        </div>
                    </div>
                    <div id="mainSliderWrapper">
                        <div
                            className="arrows-white arrows-bottom"
                            id="mainSlider">
                            <Slider className="mt-1" {...settings3}>
                                <img src={require("../images/Carousel/1.png")} alt="img" />
                                <img src={require("../images/Carousel/2.png")} alt="img" />
                                <img src={require("../images/Carousel/3.png")} alt="img" />
                                <img src={require("../images/Carousel/4.png")} alt="img" />
                                <img src={require("../images/Carousel/5.png")} alt="img" />
                                <img src={require("../images/Carousel/6.png")} alt="img" />
                            </Slider>
                        </div>
                    </div>
                </div>

                {/* <!--//section slider-->
                <!--section departments--> */}
                <div className="section text-center bg-bottom bg-right bg-norepeat bg-md-none bg-fixed image1">
                    <h2 className="font-weight-bold hiw">How it Works</h2>
                    <h1 className="Gstw">Get Safe Testing with <span style={{ color: "#02bdb4" }}>AlphaCare247</span></h1>
                    <div className="hiw-slider d-flex mt-4">
                        <div className="hiw-width">
                            <img className="hiw-img" src={require("../images/How it works/11.png")} alt="img" />
                            <div style={{ color: "black", fontWeight: "500" }}><div className="hiw-text1" >Book Your Test</div><span className="hiw-text2">Call us or visit our website to book your your lab test with our simple booking process.</span></div>
                        </div>
                        <img className="hiw-imgbtn" src={require("../images/heart_rate.gif")} alt="img" />
                        <div className="hiw-width">
                            <img className="hiw-img" src={require("../images/How it works/21.png")} alt="img" />
                            <div style={{ color: "black", fontWeight: "500" }}><div className="hiw-text1" >Safe Home Sample Collection</div><span className="hiw-text2">Our phlebotomists are well trained and certified to collect your sample from your home.</span></div>
                        </div>
                        <img className="hiw-imgbtn" src={require("../images/heart_rate.gif")} alt="img" />
                        <div className="hiw-width">
                            <img className="hiw-img" src={require("../images/How it works/31.png")} alt="img" />
                            <div style={{ color: "black", fontWeight: "500" }}><div className="hiw-text1" >High Quality Lab Testing</div><span className="hiw-text2">We are committed to ensure that you always get the best possible results.</span></div>
                        </div>
                        <img className="hiw-imgbtn" src={require("../images/heart_rate.gif")} alt="img" />
                        <div className="hiw-width">
                            <img className="hiw-img" src={require("../images/How it works/41.png")} alt="img" />
                            <div style={{ color: "black", fontWeight: "500" }}><div className="hiw-text1" >Get Online Reports</div><span className="hiw-text2">Once reports become available. we will send it to you via email and whatsapp.</span></div>
                        </div>
                    </div>
                    <div className="department-tabs2-bg">
                        <img src={require('../images/bg-department.png')} alt="image" />
                    </div>
                    <div style={{ background: "rgb(199 199 199 / 19%)" }} id="tab-content" className="tab-content mt-2 mt-sm-4">
                        <div>
                            <h2 className="wri-heading font-weight-bold">We are in</h2>
                            <div className="d-flex justify-content-center mb-4">
                                <button className={call1 ? 'btn-bt active-color' : ' btn-bt'}
                                    onClick={() => { sendval(1) }} >Pathology</button>
                                <button className={call2 ? 'active-color btn-bt' : 'btn-bt'} onClick={() => sendval(2)} >Radiology</button>
                            </div>
                        </div>
                        <div id="tab-A" className={call1 ? '' : 'tab-pane'} role="tabpanel">
                            <div className="tab-bg">
                                <img src={require('../images/content/bg-map.png')} alt="" />
                            </div>
                            <div className="row pb-4">
                                <h1 className="mbb-test" style={{ color: "#02bdb4" }}>Most Booked Blood Tests</h1>
                                <Slider className="RP" {...settings7}>
                                    {MostBookedPathology?.map(val => {
                                        return (
                                            <Icons key={val._id} val={val} setFaqIsOpen2={setFaqIsOpen2} setclickedFaq={setclickedFaq} />
                                        )
                                    })}
                                </Slider>
                            </div>
                        </div>
                        <div id="tab-B" className={call2 ? '' : 'tab-pane'} role="tabpanel">
                            <div className="tab-bg">
                                <img src={require('../images/content/bg-map.png')} alt="" />
                            </div>
                            <div className="row">
                                <h1 className="mbb-test" style={{ color: "#02bdb4" }}>Most Booked Health Scans and Imaging Tests</h1>
                                <Slider className="RP mb-2" {...settings7}>
                                    {MostBookedRadiology?.map(val => {
                                        return (
                                            <Icons key={val._id} val={val} setFaqIsOpen2={setFaqIsOpen2} setclickedFaq={setclickedFaq} />
                                        )
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!--//section-->
                <!--section special offers--> */}
                <div className="section" id="specialOffer">
                    <div className="container">
                        <div className="title-wrap text-center">
                            <h2 className="h1">Special Offers</h2>
                            <div className="h-decor"></div>
                        </div>
                        <div className="row">
                            <Slider {...settings4}>

                                <div className="special-card">
                                    <div className="special-card-photo">
                                        <img src={require('../images/nikhil/SO1.jpg')} alt="" />
                                    </div>

                                </div>

                                <div className="special-card">
                                    <div className="special-card-photo">
                                        <img src={require('../images/nikhil/SO2.jpg')} alt="" />
                                    </div>

                                </div>
                                <div className="special-card">
                                    <div className="special-card-photo">
                                        <img src={require('../images/nikhil/SO3.jpg')} alt="" />
                                    </div>

                                </div>

                                <div className="special-card">
                                    <div className="special-card-photo">
                                        <img src={require('../images/nikhil/SO4.jpg')} alt="" />
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
                {/*<!--section faq--> */}
                <div className="section mt-8">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="container-shift-left mb-3 mb-md-4">
                                <div className="title-wrap text-center text-lg-left">
                                    <h2
                                        className="h1 double-title double-title--vcenter"
                                        data-title="FAQ"
                                    >
                                        <span>
                                            Frequently Asked
                                            <span className="theme-color"> Questions</span>
                                        </span>
                                    </h2>
                                </div>
                            </div>
                            <div className="image-shift-right">
                                <img src={require('../images/FAQ.png')} alt="" className="w-md-100" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="faq-wrap-bg">
                                <div className="faq-wrap faq-wrap--pad-md">
                                    <h2 className="h1 bg-title">Questions</h2>
                                    <div className="nav nav-pills nav-pills--noborder" role="tablist">
                                        <a
                                            className={faqcall1 ? "nav-link active" : "nav-link"}
                                            role="tab"
                                            onClick={() => sendfaqval(1)}>
                                            <i className="icon-labinstrument"></i>
                                            Radiology
                                        </a>
                                        <a
                                            className={faqcall2 ? "nav-link active" : "nav-link"}
                                            role="tab"
                                            onClick={() => sendfaqval(2)}>
                                            <i className="icon-labinstrument"></i>
                                            Pathology
                                        </a>
                                        <a
                                            className={faqcall3 ? "nav-link active" : "nav-link"}
                                            role="tab" onClick={() => sendfaqval(3)}
                                        >
                                            <i className="icon-billing"></i>
                                            Sample collection Questions
                                        </a>
                                    </div>
                                    <div id="tab-content-2" className="tab-content mt-2">
                                        <div className={faqcall1 ? "tab-pane fade show active" : "tab-pane fade"}
                                            role="tabpanel">
                                            <div style={{ width: "100%" }}>
                                                {FaqRadiology?.map(val => {
                                                    return Object.values(val.faq).slice(0, 3).map(res =>
                                                        <FaqCommon key={res.q} res={res} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className={faqcall2 ? "tab-pane fade show active" : "tab-pane fade"}
                                            role="tabpanel">
                                            <div style={{ width: "100%" }}>
                                                {FaqPathology?.map(val => {
                                                    return Object.values(val.faq).slice(0, 3).map(res =>
                                                        <FaqCommon key={res.q} res={res} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className={faqcall3 ? "tab-pane fade show active" : "tab-pane fade"}
                                            role="tabpanel">
                                            <div style={{ width: "100%" }}>
                                                {FaqSample?.map(val => {
                                                    return Object.values(val.faq).slice(0, 3).map(res =>
                                                        <FaqCommon key={res.q} res={res} />
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--//section specialists-->
                <!--section testimonials--> */}
                <div className="bg-grey pb-4" >
                    <div className="title-wrap">
                        <div className="h-sub theme-color text-center pt-4">Testimonials</div>
                        <h2
                            className="h1 double-title double-title--white text-center">
                            <span>
                                What Our
                                Customers Say
                            </span>
                        </h2>
                        <img className="t-img" style={{ width: "13%", position: "absolute", left: "", zIndex: "+5" }} src={require("../images/reviews/1.png")} alt="img" />
                        <img className="t-img" style={{ width: "10%", position: "absolute", top: "370px", left: "90px", zIndex: "+5" }} src={require("../images/reviews/2.png")} alt="img" />
                        <img className="t-img" style={{ width: "7%", position: "absolute", top: "270px", left: "240px", zIndex: "+5" }} src={require("../images/reviews/3.png")} alt="img" />
                        <div className="g-slide" >
                            <Slider className="g-review" {...settings}>
                                <div className="review">
                                    <img src={require("../images/search.png")} alt="img" />
                                    <div className="d-flex justify-content-center"><img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" /></div>
                                    <div className="text-gdrive">
                                        <span><img src={require("../images/left-quote.png")} alt="img" /></span> Providing the best service at the cheapest cost possible. Great experience!<span className="d-flex justify-content-end"><img src={require("../images/right-quote.png")} alt="img" /></span>
                                        <div className="text2"> - Rachana Joshi<br />(East Delhi)</div>
                                    </div>
                                </div>
                                <div className="review">
                                    <img src={require("../images/search.png")} alt="img" />
                                    <div className="d-flex justify-content-center"><img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" /></div>
                                    <div className="text-gdrive"><span><img src={require("../images/left-quote.png")} alt="img" /></span> PTimely collection of blood sample and reports were delivered on time too. Keep up the good work.<span className="d-flex justify-content-end"><img src={require("../images/right-quote.png")} alt="img" /></span>
                                        <div className="text2"> - Richa Verma <br />(East Delhi)</div>
                                    </div>
                                </div>
                                <div className="review">
                                    <img src={require("../images/search.png")} alt="img" />
                                    <div className="d-flex  justify-content-center"><img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" /></div>
                                    <div className="text-gdrive"><span><img src={require("../images/left-quote.png")} alt="img" /></span>  I had booked the slot for RT-PCR test, the service was quite fast and affordable too.
                                        <span className="d-flex justify-content-end"><img src={require("../images/right-quote.png")} alt="img" /></span>
                                        <div className="text2"> - Deep Aggarwal<br /> ( East Delhi)</div></div>

                                </div>
                                <div className="review">
                                    <img src={require("../images/search.png")} alt="img" />
                                    <div className="d-flex justify-content-center"><img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" /></div>
                                    <div className="text-gdrive"><span><img src={require("../images/left-quote.png")} alt="img" /></span>They offer the best price and provide service that is always on time. good behaviour of Phlebotomist Rohit, who came for sample collection.
                                        <span className="d-flex justify-content-end"><img src={require("../images/right-quote.png")} alt="img" /></span>
                                        <div className="text2"> - Yatin Singhania</div></div>

                                </div>
                                <div className="review">
                                    <img src={require("../images/search.png")} alt="img" />
                                    <div className="d-flex justify-content-center"><img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" /></div>
                                    <div className="text-gdrive"><span><img src={require("../images/left-quote.png")} alt="img" /></span>Very friendly and helpful staff. It's very simple for me to select a nearby lab for my x-ray test.
                                        <span className="d-flex justify-content-end"><img src={require("../images/right-quote.png")} alt="img" /></span>
                                        <div className="text2"> - Rishabh Arora <br />(Dilshad Garden)
                                        </div></div>
                                </div>
                                <div className="review">
                                    <img src={require("../images/search.png")} alt="img" />
                                    <div className="d-flex justify-content-center">
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                        <img src={require("../images/star.png")} alt="img" />
                                    </div>
                                    <div className="text-gdrive"><span><img src={require("../images/left-quote.png")} alt="img" /></span>They deliver reports and services on time.I'm glad to use the service!
                                        <span className="d-flex justify-content-end"><img src={require("../images/right-quote.png")} alt="img" /></span>
                                        <div className="text2"> - Jatin Singh <br />(Ghaziabad)</div></div>
                                </div>
                            </Slider>
                        </div>
                        <img className="t-img" style={{ width: "13%", position: "absolute", right: "0", top: "130px", zIndex: "+5" }} src={require("../images/reviews/5.png")} alt="img" />
                        <img className="t-img" style={{ width: "7%", position: "absolute", top: "270px", right: "240px", zIndex: "+5" }} src={require("../images/reviews/4.png")} alt="img" />
                        <img className="t-img" style={{ width: "10%", position: "absolute", top: "370px", right: "90px", zIndex: "+5" }} src={require("../images/reviews/6.png")} alt="img" />
                    </div>
                </div >
                {/* <!--//section testimonials-->

                <!--section news & achieved--> */}
                <div className="section" >
                    <div className="row no-gutters row-shift">
                        <div className="col-lg-6 ">
                            <div className="container-shift-left">
                                <div className="title-wrap">
                                    <h2
                                        className="double-title double-title--white double-title--vcenter"
                                        data-title="News"
                                    >
                                        <span>Health & Wellness Tips</span>
                                    </h2>
                                </div>
                                <div className="blog-post-sm-vertical">
                                    <div className="blog-post-sm">
                                        <div className="blog-post-sm-photo">
                                            <img
                                                src={require('../images/content/news-01.webp')}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="blog-post-sm-text">
                                            <div className="blog-post-sm-date">September 25, 2022</div>
                                            <div className="blog-post-sm-title">
                                                <a
                                                    href="https://navbharattimes.indiatimes.com/metro/delhi/other-news/scrub-typhus-cases-rise-in-delhi-ncr-symptoms-how-different-from-dengue-and-malaria/articleshow/94428209.cms"
                                                    target="_blank"
                                                >
                                                    Coming cases of scrub typhus in Delhi, doctors alerted... if such symptoms are seen, do not consider it as normal fever
                                                </a>
                                            </div>
                                            <a
                                                href="https://navbharattimes.indiatimes.com/metro/delhi/other-news/scrub-typhus-cases-rise-in-delhi-ncr-symptoms-how-different-from-dengue-and-malaria/articleshow/94428209.cms"
                                                target="_blank"
                                                className="blog-post-sm-readmore"
                                            >
                                                ...
                                            </a>
                                        </div>
                                    </div>
                                    <div className="blog-post-sm">
                                        <div className="blog-post-sm-photo">
                                            <img
                                                src={require('../images/content/news-02.jpg')}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="blog-post-sm-text">
                                            <div className="blog-post-sm-date">September 25, 2022</div>
                                            <div className="blog-post-sm-title">
                                                <a
                                                    href="https://www.indiatvnews.com/news/india/delhi-reports-75-new-covid-cases-today-no-deaths-2022-09-25-811418"
                                                    target="_blank"
                                                >
                                                    Delhi reports 75 new Covid cases today, no deaths
                                                </a>
                                            </div>
                                            <a
                                                href="https://www.indiatvnews.com/news/india/delhi-reports-75-new-covid-cases-today-no-deaths-2022-09-25-811418"
                                                target="_blank"
                                                className="blog-post-sm-readmore"
                                            >
                                                ...
                                            </a>
                                        </div>
                                    </div>
                                    <div className="blog-post-sm">
                                        <div className="blog-post-sm-photo">
                                            <img
                                                src={require('../images/content/news-03.jpg')}
                                                alt=""
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="blog-post-sm-text">
                                            <div className="blog-post-sm-date">September 20, 2022</div>
                                            <div className="blog-post-sm-title">
                                                <a
                                                    href="https://health.economictimes.indiatimes.com/news/diagnostics/delhi-monkeypox-count-reaches-9-patient-in-hospital/94317133"
                                                    target="_blank"
                                                >
                                                    Delhi: Monkeypox count reaches 9, patient in hospital
                                                </a>
                                            </div>
                                            <a
                                                href="https://health.economictimes.indiatimes.com/news/diagnostics/delhi-monkeypox-count-reaches-9-patient-in-hospital/94317133"
                                                target="_blank"
                                                className="blog-post-sm-readmore"
                                            >
                                                ...
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="blog-post-sm-carousel js-blog-grid-carousel-full">
                                    <Slider {...settings2}>
                                        <div className="blog-post-sm">
                                            <div className="blog-post-sm-photo">
                                                <img
                                                    src={require('../images/content/news-01.webp')}
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="blog-post-sm-text">
                                                <div className="blog-post-sm-date">Mar 16, 2020</div>
                                                <div className="blog-post-sm-title">
                                                    <a href="blog-post-page.html">
                                                        Biochemical Receptor Reverses Bone Degradation Caused by
                                                        Osteoporosis
                                                    </a>
                                                </div>
                                                <a href="blog-post-page.html" className="blog-post-sm-readmore">
                                                    ...
                                                </a>
                                            </div>
                                        </div>
                                        <div className="blog-post-sm">
                                            <div className="blog-post-sm-photo">
                                                <img
                                                    src={require('../images/content/news-02.jpg')}
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="blog-post-sm-text">
                                                <div className="blog-post-sm-date">Mar 28, 2020</div>
                                                <div className="blog-post-sm-title">
                                                    <a href="blog-post-page.html">
                                                        Ammonia Fuel Cell is More Powerful, Cost-Effective Than
                                                        Hydrogen
                                                    </a>
                                                </div>
                                                <a href="blog-post-page.html" className="blog-post-sm-readmore">
                                                    ...
                                                </a>
                                            </div>
                                        </div>
                                        <div className="blog-post-sm">
                                            <div className="blog-post-sm-photo">
                                                <img
                                                    src={require('../images/content/news-03.jpg')}
                                                    alt="image"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="blog-post-sm-text">
                                                <div className="blog-post-sm-date">Apr 16, 2020</div>
                                                <div className="blog-post-sm-title">
                                                    <a href="blog-post-page.html">
                                                        Nanopore Optofluidic Device Controls Delivery of
                                                        Individual Biomolecules
                                                    </a>
                                                </div>
                                                <a href="blog-post-page.html" className="blog-post-sm-readmore">
                                                    ...
                                                </a>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-shift-left">
                            <div className="container-shift-right">
                                <div className="title-wrap text-center text-md-left"></div>
                            </div>
                            <div>
                                <img src={require('../images/news_update.png')} alt="img" className="w-sm-100" />
                            </div>
                        </div>
                    </div>
                </div >
            </div >
            {/* <!--footer--> */}
            {
                FaqIsOpen2 && <Modal setIsOpen={setFaqIsOpen2}
                    modalCss='modal231'
                    closeOnClickOutside={false}>
                    <div style={{ display: 'block' }} className=" modal modal-form" id="modalPackageForm">
                        <div style={{ maxWidth: "700px" }} className="modal-dialog">
                            <div className="modal-content">
                                <button style={{ color: "#02bdb4", padding: "5px" }} aria-label="Close" onClick={() => setFaqIsOpen2(0)} className="close" >
                                    <i className="icon-error"></i>
                                </button>
                                <div style={{ padding: "20px" }} className="modal-body">
                                    <h2 style={{ fontSize: "30px", padding: "0px", color: "#02bdb4" }}>Frequently Asked <span style={{ color: "#ffc107" }}>Questions</span></h2>
                                    <div style={{ width: "100%" }}>
                                        {Object.values(clickedFaq.faq).map(res =>
                                            <FaqCommon key={res.q} res={res} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal >
            }
            {/* upload prescription */}
            {
                uploadPres && <Modal
                    setuploadPres={setuploadPres}
                    modalCss='modal231'
                    closeOnClickOutside={false}>
                    <div style={{ display: 'block' }} className="modal modal-form" id="modalBookingForm">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <button style={{ zIndex: '644', color: "#23d4be" }} aria-label="Close" onClick={() => setuploadPres(false)} className=" close" >
                                    <i className="icon-error"></i>
                                </button>
                                <div className="modal-body">
                                    <h3>Upload Prescription</h3>
                                    <div className='uploadDes p-2'>
                                        <label htmlFor="Pres" style={{ fontSize: "18px", textShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", cursor: "pointer", textAlign: "center" }} className="btn-lab btn-lab2 py-1">Upload<i className="fa-solid fa-circle-plus ml-1"></i></label>
                                        <input className="d-none" id="Pres" type="file" onChange={(e) => { setPrescription(e.target.files[0]) }} />

                                        <div className={(Prescription != "") ? "alert alert-success mt-1 p-1" : "alert alert-success mt-1 p-1 d-none"}>
                                            {(Prescription != "") ? Prescription.name : ""}
                                        </div>
                                        <div style={{ fontSize: "14px", fontWeight: "700" }} className="text-center">Support files - PDF, JPG, PNG</div>
                                        <button style={{ fontSize: "17px", textShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} className="btn-lab from-bottom mt-1 py-1" onClick={() => UploadPrescription()}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            }
            {/* call back  */}
            <div className="callback">
                {/* <h2 style={{ fontSize: "25px", color: "white" }}>Get a call back</h2> */}
                <form method='POST' className="callbackForm mt-1 mb-1" onSubmit={submitForm}>
                    <PhoneInput className='call-backno form-control ff1' placeholder="Please enter your mobile no." defaultCountry="IN"
                        value={phoneno} onChange={setphone} required autoComplete='off' />
                    <button className="btn-lab btn-lab2 btn-b" type='submit' name='getotp' onClick={PostData} >Get a free call</button>
                </form>
                <div style={{ width: "30%", padding: "10px" }} className={err ? "alert alert-danger" : "alert alert-danger d-none"}>
                    Please enter valid 10 digit Mobile number!
                </div>
            </div>
        </>
    )
}

