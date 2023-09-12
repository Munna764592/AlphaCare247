import React, { useState } from "react";


export default function T_C() {
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
                        <div className="mb-2 mb-md-3 mb-lg-4">
                            <div className="text-center">
                                <h1>Terms and Conditions</h1>
                                <div className="h-decor"></div>
                            </div>
                            <h3>Cancellation</h3>
                            <p><b>1.</b>Customers can cancel their booking any time before the sample collection is done. No cancellation charges will be applied.<br />
                                <b>2.</b>No cancellation will be allowed post sample collection.</p>

                            <h3>Refund Policy</h3>
                            <p><b>1.</b>If cancellation has been initiated by customers who have done the booking using online payment method, they can make the request for the refund to be credited either in their alphacare247.in wallet or the payment platform selected at the time of booking.<br />
                                <b>2.</b>Refunds may take 3-5 business days.
                                <br /> <b>3.</b>Customers need to raise their refund request either by calling 8377895404, 8377895401 or writing an email to support@alphacare247.in<br /> <b>4.</b>No refund request will be entertained once the Lab has generated the test report within TAT.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}