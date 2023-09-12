import React, { useState } from "react";

export default function Privacy() {
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
                {/* <!--section--> */}
                <div className={marginFix ? 'section page-content-first margin_about' : 'section page-content-first mt-8'}>
                    <div className="container">
                        <div className="mb-2 mb-md-3 mb-lg-4">
                            <div className="text-center">
                                <h1 style={{ color: "#02bdb4", marginBottom: "0px" }}><span style={{ color: "#ffc107" }}>Privacy </span>Policy</h1>
                                <div className="h-decor"></div>
                            </div>
                            <p>
                                Alpha Care 247 ("Alpha Care 247" or "we") takes the privacy of your information seriously. This privacy notice ("Privacy Notice") describes the types of personal information we collect from you through our website (including sub-domains and microsites). It also describes the purposes for which we collect that personal information, the other parties with whom we may share it and the measures we take to protect the security of your data.
                            </p>
                            <p>
                                The publication of this privacy statement complies with a number of laws and regulations, including Section 43A of the Information Technology Act of 2000, Regulation 4 of the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules of 2011 (the "SPI Rules"), and Regulation 3(1) of the Information Technology (Intermediaries Guidelines Rules) of 2011.
                            </p>
                            <h3>
                                What type of Personal Information we collect about you?
                            </h3>
                            <p>
                                Alpha Care 247 collects Data for various purposes set out in
                                this Privacy Notice.
                            </p>
                            <p>
                                This Data includes, without limitation, the following categories:
                            </p>
                            <p>
                                <b>A. Contact information:</b>
                                first and last name, email address, postal address, country,
                                employer, phone number and other similar contact data.
                            </p>
                            <p>
                                <b>B. Financial information:</b>
                                payment instrument information, transactions, transaction history,
                                preferences, method, mode and manner of payment, spending pattern
                                or trends, and other similar data.
                            </p>
                            <p>
                                <b>C. Technical information:</b>
                                website, device and mobile app usage, Internet Protocol (IP)
                                address and similar information collected via automated means,
                                such as cookies, pixels and similar technologies.
                            </p>
                            <p>
                                <b>D. Transaction information:</b>
                                the date of the transaction, total amount, transaction history and
                                preferences and related details.
                            </p>
                            <p>
                                <b>E.Health related information:</b>
                                such as information or records
                                relating to Your medical/ health history, health status, details
                                of treatment plans and medication prescribed by a Medical
                                Practitioner, dosage details such as frequency of dosage,
                                alternative medication, medicines ordered by You through the
                                Platform, laboratory testing results and any other information
                                inferred there from
                            </p>
                            <p>
                                <b>G. Personal information:</b>
                                Age, sex, date of birth, marital status, nationality, details of
                                government identification documents provided, occupation,
                                ethnicity, religion, travel history or any other personal
                                information provided in responses to surveys or questionnaires.
                            </p>
                            <p>
                                <b>H.Your reviews:</b>
                                feedback and opinions about our products, programmes
                                and services.
                            </p>
                            <p>
                                To the extent permitted by law, Alphacare247.in may record and monitor your communications with us to ensure compliance with our legal and regulatory obligations and our internal policies. This may include the recording of telephone conversations.
                            </p>
                            <h3>
                                We collect Data in the following ways:
                            </h3>

                            <p>
                                <b>A. Information You Give Us:</b>
                                We receive and store any information you enter on our website or
                                mobile application or give us in any other way (e.g., at outlets,
                                stores, hotels, kiosks). Please see the section titled "Data
                                Shared by You" for more information.
                            </p>
                            <p>
                                <b>B. Automatic Information We Collect:</b>
                                We use "cookies", pixels and similar technologies to receive and
                                store certain types of information whenever you interact with us.
                                Please see the section below, titled "Data that is Collected
                                Automatically" for more information.
                            </p>
                            <p>
                                <b>C. E-mail Communications:</b>
                                To help us make e-mails more relevant and interesting, we often
                                receive a confirmation (if your device supports such capabilities)
                                when you open e-mail from us or click on a link in the e-mail. You
                                can choose not to receive marketing emails from us by clicking on
                                the unsubscribe link in any marketing email.
                            </p>

                            <h3>DATA SHARED BY YOU</h3>
                            <p>
                                Alpha Care 247 may collect your Data in several ways from your
                                use of our stores, website or mobile application. For instance:
                            </p>
                            <p>
                                <b>A.</b>
                                when you register with us to receive our products and/or services;
                            </p>
                            <p>
                                <b>B.</b>
                                when you conduct a transaction with us or attempt a transaction at
                                our stores, on our website or mobile application;
                            </p>
                            <p>
                                <b>C.</b>
                                when you complete surveys conducted by or for us;
                            </p>
                            <p>
                                <b>D.</b>
                                when you elect to receive any communications (including
                                promotional offers) from us;
                            </p>
                            <h3>DATA THAT IS COLLECTED AUTOMATICALLY</h3>
                            <p>
                                <b>A.</b>
                                We automatically collect some information when you visit our
                                website or use our mobile application. This information helps us
                                to make improvements to our content and navigation. The
                                information collected automatically includes your IP address.
                            </p>
                            <p>
                                <b>B.</b>
                                Our web servers or affiliates who provide analytics and
                                performance enhancement services collect IP addresses, operating
                                system details, browsing details, device details and language
                                settings. This information is aggregated to measure the number of
                                visits, average time spent on the site, pages viewed and similar
                                information. Alpha Care 247 uses this information to measure
                                the site usage, improve content and to ensure safety and security,
                                as well as enhance performance of our website or mobile
                                application.
                            </p>
                            <p>
                                <b>C.</b>
                                We may collect your Data automatically via Cookies, pixels and
                                similar technologies in line with settings on your browser. For
                                more information about Cookies, please see the section below,
                                titled "Cookies".
                            </p>
                            <h3>OUR USE OF DATA</h3>
                            <p>
                                Any or all the above Data may be required by us from time to time
                                to provide information relating to Alpha Care 247 and to work
                                on the experience when using our website or mobile application.
                                Specifically, Data may be used by us for the following reasons:
                            </p>
                            <p>
                                <b>​ A.</b>
                                carry out our obligations arising from any contract entered into
                                between you and us;
                            </p>
                            <p>
                                <b>B.</b>
                                provide products and/or services and communicate with you about
                                products and/or services offered by us;
                            </p>
                            <p>
                                <b>C.</b>
                                enable Alpha Care 247 and Partners to offer their products
                                and/or services and communicate with you about such products
                                and/or services;
                            </p>
                            <p>
                                <b>D.</b>
                                processing, disclosing, transmitting, and/or sharing the
                                data/information with Alpha Care 247, and other third parties
                                which have business or contractual dealings with us;
                            </p>
                            <p>
                                <b>E.</b>
                                provide you with offers (including for financial products and/or
                                services), personalized services and recommendations and improve
                                your experience on our website and mobile application;
                            </p>
                            <p>
                                <b>F.</b>
                                operate, evaluate and improve our business, website and mobile
                                application;
                            </p>
                            <p>
                                <b>G.</b>
                                generate aggregated data to prepare insights to enable us to
                                understand customer behaviour, patterns and trends with a view to
                                learning more about your preferences or other characteristics;
                            </p>
                            <p>
                                <b>H.</b>
                                provide privileges and benefits to you, marketing and promotional
                                campaigns based on your profile;
                            </p>

                            <p>
                                <b>I.</b>
                                communicate with you (including to respond to your requests,
                                questions, feedback, claims or disputes) and to customize and
                                improve our services;
                            </p>
                            <p>
                                <b>J.</b>
                                enforce the terms of use of our website and mobile application;
                            </p>
                            <p>

                                <b>K.</b>
                                protect against and prevent fraud, illegal activity, harm,
                                financial loss and other legal or information security risks; and
                            </p>
                            <p>
                                <b>L.</b>
                                serve other purposes for which we provide specific notice at the
                                time of collection, and as otherwise authorized or required by
                                applicable law.
                            </p>
                            <p>
                                We treat these inferences as personal information (or sensitive
                                personal information, as the case may be), where required under
                                applicable law. Some of the above grounds for processing will
                                overlap and there may be several grounds which justify our use of
                                your personal information.
                            </p>
                            <p>
                                Where required under applicable law, we will only use your
                                personal information (including sensitive personal information)
                                with your consent; as necessary to provide you with products
                                and/or services; to comply with a legal obligation; or when there
                                is a legitimate interest that necessitates the use.
                            </p>
                            <h3>MINORS</h3>
                            <p>
                                Our website and mobile application do not offer products or
                                services for use by minors. If you are under 18, you may use our
                                website or mobile application only with the involvement of a
                                parent or guardian.
                            </p>
                            <h3>SHARING OF DATA</h3>

                            <p>We may share your Data with/ for:</p>
                            <p>
                                <b>A. Partners:</b>
                                We may make available to you services, products, or applications
                                provided by Partners for use on or through our website or mobile
                                application. If you choose to use such service, customer
                                information related to those transactions may be shared with such
                                Partner. Such Partners will be required to respect the security of
                                your Data and to treat it in accordance with this privacy policy
                                and applicable law.
                            </p>
                            <p>
                                <b>B. Service Providers:</b>
                                We may share your Data with Service Providers. Examples include
                                storing and analyzing Data, protecting and securing our systems,
                                providing search results and links, providing customer service,
                                credit analysis, processing your information for profiling, user
                                analysis and payment processing.
                            </p>
                            <p>
                                <b>C. Protecting Alpha Care 247:</b>
                                We may release Data when we believe release is appropriate to
                                comply with applicable law or legal process, enforce or apply the
                                Terms of Use of our website or mobile application and other
                                agreements, protect Alpha Care 247 against harm or financial
                                loss, when we believe disclosure is necessary to protect
                                individuals’ vital interests, or in connection with an
                                investigation of suspected or actual fraudulent or illegal
                                activity. This may include exchanging information with other
                                companies and organizations for fraud protection, risk management
                                and dispute resolution. This does not include selling or otherwise
                                disclosing personal information of users for commercial purposes
                                in violation of this Privacy Notice.
                            </p>
                            <p>
                                <b>D. Business Transfers:</b>
                                As we continue to develop our business, we might sell or buy
                                subsidiaries or business units. Your Data (including in relation
                                to loyalty programs) may be transferred as part of such
                                transaction. Any Data that we receive from a third party pursuant
                                to such transactions will be processed in accordance with this
                                Privacy Notice and applicable law.
                            </p>
                            <p>
                                <b>E. Third Parties:</b>
                                We may also share your Data with other third parties where: You
                                request or authorize us to do so; We need to comply with
                                applicable law or respond to valid legal process; or We need to
                                operate and maintain the security of our website or mobile
                                application, including to prevent or stop an attack on our
                                computer systems or networks.
                            </p>
                            <p>
                                We require these third parties by contract to only process
                                sensitive personal data in accordance with our instructions and as
                                necessary to perform services on our behalf or in compliance with
                                applicable law. We also require them to safeguard the security and
                                confidentiality of the sensitive personal data they process on our
                                behalf by implementing appropriate confidentiality, technical and
                                organizational security measures.
                            </p>
                            <p>
                                Please note that Alpha Care 247 Pvt. Ltd. and Partners may have privacy
                                practices that differ from those of Alpha Care 247. The use of
                                your Data will be governed by their privacy statements when you
                                provide Data on their websites.
                            </p>

                            <h3>RETENTION OF DATA</h3>

                            <p>
                                Alpha Care 247 retains Data for as long as necessary for the
                                use of our products and/or services or to provide access to and
                                use of our website or mobile application, or for other essential
                                purposes such as complying with our legal obligations, resolving
                                disputes, enforcing our agreements and as long as processing and
                                retaining your Data is necessary and is permitted by applicable
                                law. Because these needs can vary for different data types and
                                purposes, actual retention periods can vary significantly.
                            </p>
                            <p>
                                Even if we delete your Data, including on account of exercise of
                                your right under Clause 10 below, it may persist on backup or
                                archival media for audit, legal, tax or regulatory purposes.
                            </p>
                            <h3>YOUR RIGHTS AND CHOICES</h3>
                            <p>
                                When we process Data about you, we do so with your consent and/or
                                as necessary to operate our business, meet our contractual and
                                legal obligations, protect the security of our systems and our
                                customers, or fulfil other legitimate interests of Alpha Care 247
                                as described in this Privacy Notice.
                            </p>
                            <p>
                                You have the following rights in relation to your sensitive
                                personal information and you can exercise it by submitting a
                                request as described in the "How to Contact Us" section below.
                            </p>
                            <p>
                                Right to Access, Review and Modify Right to Correction Right to
                                Withdraw Consent
                            </p>
                            <p>
                                It is important that the Data we hold about you is accurate and
                                current. Please keep us informed if your personal information
                                changes during the period for which we hold it.
                            </p>
                            <h3>CHANGES TO THIS PRIVACY NOTICE</h3>
                            <p>
                                Our business changes constantly and our Privacy Notice may also
                                change . We may e-mail periodic reminders of our notices and
                                conditions, unless you have instructed us not to, but you should
                                check our website and mobile application frequently to see recent
                                changes. The updated version will be effective as soon as it is
                                accessible. Any changes will be immediately posted on our website
                                and mobile application and you are deemed to have accepted the
                                terms of the updated Privacy Notice on your first use of our
                                website or mobile application or first purchase of the products
                                and/or services following the alterations. We encourage you to
                                review this Privacy Notice frequently to be informed of how we are
                                protecting your information.
                            </p>
                            <h3>HOW TO CONTACT US</h3>
                            <p>
                                To request to access, review, update, or withdraw your consent for your personal information or to otherwise reach us, please submit a request by e-mailing us at support@alphacare247.in. You may contact us for information on Service Providers, Partners with whom we may share your Data in compliance with this Privacy Notice and applicable law. We will respond to your request within 30 days.
                            </p>
                            <h3>GRIEVANCE OFFICER</h3>
                            <h6>Alphacare247 Private Limited</h6>
                            <p><b>Phone:</b>+91-8527521464</p>
                            <p>
                                <b>Email:</b>
                                support@alphacare247.in
                            </p>
                            <p>
                                <b>Address:</b>
                                C-3/76, New Kondli, Mayur Vihar Phase-3, New Delhi, East Delhi DL 110096
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}