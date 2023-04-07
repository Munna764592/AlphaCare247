import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useLabContext } from "./context/globalcontext";

const Labs = () => {
    const { id } = useParams();
    const { isLoading, BlogData } = useLabContext();
    // post comment  
    const [Comment, setcomment] = useState("");
    const notifyC = () => toast.success("COMMENT POSTED!!")
    const PostComment = async (heading) => {
        await axios.post("/blogComment", {
            comment: Comment,
            blogHeading: heading
        }, { headers: { "Content-Type": "application/json" } }).then(res => {
            notifyC();
        })
    }
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

    return (
        <>
            <div className="contsiner-xxl mx-2 my-2 d-flex justify-content-center align-content-center">
                <div className="p-1" style={{ width: "25%", background: "#f7f7f7", borderRadius: "6px", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", maxHeight: "600px" }}>
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
                        <button type="submit" style={{ padding: "3px 15px" }} className={sebtn != "" ? "btn-ap mt-1" : "btn-ap mt-1 d-none"} onClick={Subemail}>Subscribe</button>
                    </form>
                    <h5 className="mt-2">RELATED POSTS:</h5>
                    <div className="h-decor"></div>
                    <div className="d-flex justify-content-center mb-1">
                        <img src={require("../images/blog/blog-post-featured-2.jpg")} alt="img" />
                        <div className="ml-1" style={{ color: "black", fontSize: "14px", lineHeight: "17px", fontWeight: "700" }}>UP DOWN Counter instruction is used to counting up/down function</div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <img src={require("../images/blog/blog-post-featured-2.jpg")} alt="img" />
                        <div className="ml-1" style={{ color: "black", fontSize: "14px", lineHeight: "17px", fontWeight: "700" }}>UP DOWN Counter instruction is used to counting up/down function</div>
                    </div>
                </div>
                {/* blog details  */}
                {BlogData.filter((filtervalue) => {
                    if (filtervalue._id === id) {
                        return filtervalue;
                    }
                }).map(res =>
                    <div key={res._id} className="mx-1" style={{ width: "75%", boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px", borderRadius: "6px" }}>
                        <h3 style={{ fontFamily: '"Poppins", sans-serif' }} className="text-center mt-2 mb-0">{res.Heading}</h3>
                        <div style={{ fontWeight: "700" }} className="text-center my-1">Written by -<span> </span>
                            <Link style={{ color: "#02bdb4" }} to="/blogs.js">Team AlphaCare247</Link></div>
                        <div style={{ fontSize: "25px", background: "#ffc107", borderRadius: "6px", color: "white", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset" }} className=" mx-2 p-1 d-flex justify-content-around align-content-center">
                            <i style={{ cursor: "pointer" }} className="fa-solid fa-share"></i>
                            <i style={{ cursor: "pointer" }} className="fa-brands fa-facebook"></i>
                            <i style={{ cursor: "pointer" }} className="fa-brands fa-twitter"></i>
                            <i style={{ cursor: "pointer" }} className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="p-2">
                            <h5 className="my-1">Skin Allergies - Overview</h5>
                            <div style={{ fontSize: "14px", color: "black" }}>
                                <p>{res.Part1}</p>
                                <p>Allergy is an immune response to substances that are usually harmless. The substances that cause allergic reactions are Allergens. The common Allergens are</p>
                                <ul>
                                    <li>Animals, especially furry animals</li>
                                    <li>Food, such as milk, gluten</li>
                                    <li>Pollen</li>
                                    <li>Bites of wasps and bees</li>
                                    <li>Pollution and Dust</li>
                                </ul>
                                <img className="blogimg" src={require("../images/nikhil/blogimg.png")} alt="img" />
                                <h5 className="my-1">Skin Allergies - Overview</h5>
                                <p>Skin allergies are a reaction to an allergen or irritant and can be caused by a variety of factors. When an allergen is responsible for triggering an immune system response, then it is an allergic skin condition.</p>
                                <p>During an immune system response, the body makes an antibody called immunoglobulin E (IgE). These antibodies respond to allergens. The symptoms that result are an allergic reaction.</p>
                                <img className="blogimg" src={require("../images/nikhil/blogimg.png")} alt="img" />
                                <h5 className="my-1">Skin Allergies - Overview</h5>
                                <p>Skin allergies are a reaction to an allergen or irritant and can be caused by a variety of factors. When an allergen is responsible for triggering an immune system response, then it is an allergic skin condition.</p>
                                <p>During an immune system response, the body makes an antibody called immunoglobulin E (IgE). These antibodies respond to allergens. The symptoms that result are an allergic reaction.</p>
                                <img className="blogimg" src={require("../images/nikhil/blogimg.png")} alt="img" />
                                <h5 className="my-1">Skin Allergies - Overview</h5>
                                <p>Skin allergies are a reaction to an allergen or irritant and can be caused by a variety of factors. When an allergen is responsible for triggering an immune system response, then it is an allergic skin condition.</p>
                                <p>During an immune system response, the body makes an antibody called immunoglobulin E (IgE). These antibodies respond to allergens. The symptoms that result are an allergic reaction.</p>
                                <img className="blogimg" src={require("../images/nikhil/blogimg.png")} alt="img" />
                                <img className="blogimg" src={require("../images/nikhil/blogimg.png")} alt="img" />
                                <div style={{ fontSize: "20px", fontWeight: "600", background: "#ffc107", borderRadius: "6px", color: "white", boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset" }} className="ff1 p-1">
                                    <div className="text-center">Leave a comment :</div>
                                    <form onSubmit={(e) => { e.preventDefault(); PostComment(res.Heading) }}>
                                        <div className="my-1 d-flex justify-content-center">
                                            <input type="text" className="inputs1 form-control" defaultValue={Comment} onChange={(e) => { setcomment(e.target.value) }} required />
                                            <button type="submit" style={{ borderRadius: "0 4px 4px 0", height: "44px", boxShadow: "none" }} className="btn-lab btn-lab3 btn-b" >Post</button>
                                        </div>
                                    </form>
                                    <div className="texts1">
                                        <i className="fa-solid fa-door-open mr-1"></i>
                                        You must be logged in to post a comment.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Labs;