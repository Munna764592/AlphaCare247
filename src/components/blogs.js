import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useLabContext } from "./context/globalcontext";
import { Audio } from 'react-loader-spinner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Labs = () => {
    const { isLoading, BlogData } = useLabContext();
    // mail subscription 
    const [subMail, setsubMail] = useState("");
    const notifyse = () => toast.success("SUBSCRIPTION DONE!!");
    const [sebtn, setsebtn] = useState("");

    const Subemail = async () => {
        await axios.post('/subemail', {
            email: subMail
        }, { headers: { "Content-Type": "application/json" } }).then(res => {
            setsubMail("")
            notifyse();
        })
    }
    if (isLoading) {
        {
            return (
                <>
                    <div style={{ position: "fixed", background: "rgba(0,0,0,0.7)", width: "100%", height: "100vh", zIndex: "99999", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "-128px" }}>
                        <Audio
                            height="80"
                            width="100%"
                            radius="9"
                            color="#02bdb4"
                            ariaLabel="loading"

                        />
                    </div>
                </>
            )
        }
    }
    return (
        <>
            <div className="text-center">
                <h2 className="text-center">BLOGS</h2>
                <div className="h-decor"></div>
            </div>
            <div className="contsiner-xxl mx-2 my-2 d-flex justify-content-center align-content-center">
                <div className="p-1" style={{ width: "25%", background: "#f7f7f7", borderRadius: "6px", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}>
                    <h5>SUBSCRIBE TO OUR BLOG</h5>
                    <div className="h-decor"></div>
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
                        <button type="submit" style={{ padding: "3px 15px" }} className={sebtn !== "" ? "btn-ap mt-1" : "btn-ap mt-1 d-none"} onClick={Subemail}>Subscribe</button>
                    </form>
                    <h5 className="mt-2">RECENT POSTS:</h5>
                    <div className="h-decor"></div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "black" }}>
                        <div>
                            <i style={{ color: "#23d4be" }} className="fa-solid fa-angle-right mr-1"></i>
                            FEVER CAUSE WEAKNESS
                        </div>
                        <div>
                            <i style={{ color: "#23d4be" }} className="fa-solid fa-angle-right mr-1"></i>
                            FEVER CAUSE WEAKNESSs
                        </div>
                    </div>
                    <h5 className="mt-2">CATEGORIES:</h5>
                    <div className="h-decor"></div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "black" }}>
                        <div>
                            <i style={{ color: "#23d4be" }} className="fa-solid fa-angle-right mr-1"></i>
                            ALLERGY
                        </div>
                        <div>
                            <i style={{ color: "#23d4be" }} className="fa-solid fa-angle-right mr-1"></i>
                            FEVER
                        </div>
                    </div>
                </div>
                <div className="bloggrid">
                    {BlogData?.map(res =>
                        <div key={res._id} className="text-center blog-box mx-1">
                            <div className="p-1" style={{ position: "relative" }}>
                                {/* <img style={{ width: "285px", height: "239px" }} src={res.Image1} alt="img" loading="lazy" /> */}
                                <LazyLoadImage
                                    alt={"image"}
                                    height={239}
                                    src={res.Image1}
                                    width={285}
                                    effect="blur"
                                />
                                <div style={{ position: "absolute", color: "black", fontWeight: "700", bottom: "10px", right: "20px" }}>
                                    <i style={{ color: "#ffc107", marginRight: "5px" }} className="fa-solid fa-star"></i>4.6/5</div>
                            </div>
                            <div style={{ color: "black", fontSize: "15px" }} className="p-1">
                                <Link to={"/blogdetails/" + res._id} className="ff1">{res.Heading}</Link>
                                <div><span style={{ fontWeight: "700" }}>Written by Team </span>AlphaCare247</div>
                            </div>
                            <div className="p-1 yellow-bar d-flex justify-content-around align-content-center">
                                <i style={{ cursor: "pointer" }} className="fa-solid fa-share"></i>
                                <i style={{ cursor: "pointer" }} className="fa-brands fa-facebook"></i>
                                <i style={{ cursor: "pointer" }} className="fa-brands fa-twitter"></i>
                                <i style={{ cursor: "pointer" }} className="fa-brands fa-instagram"></i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Labs;