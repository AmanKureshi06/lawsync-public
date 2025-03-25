import React from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import './Style/Terms.css';

const Terms = () => {
    const date = '15th January 2025'
    document.title = 'Terms & Conditions';
    return (
        <>
            <Navbar />
            <div className="terms-overflow-hidden custom-font" id="privacy">
                <div className="terms-privacy">
                    <div>
                        <h1 className="terms-heading-main">
                            Terms and Conditions
                        </h1>
                        <blockquote className="terms-blockquote">
                            Effective Date: {date}
                        </blockquote>
                        <p className="terms-paragraph">
                            These Terms and Conditions ("Terms") govern your use of LawSync ("we," "us," or "our"), an online platform that facilitates booking appointments with lawyers and managing legal services ("Service"). By accessing or using LawSync, you ("User" or "you") agree to be bound by these Terms. If you do not agree to these Terms, do not use our Service.
                        </p>
                        <p className="terms-paragraph">
                            By using the LawSync, you agree to comply with and be bound by the following Terms and Conditions, which govern the relationship between you and LawSync. If you do not agree with these Terms, you must discontinue using the services immediately.
                        </p>
                        <h2 className="terms-heading-secondary">1.  Definitions</h2>
                        <p className="terms-paragraph">
                            To ensure clarity and understanding, the following terms are defined as used in these Terms and Conditions. These definitions apply throughout the document.
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item"><strong>LawSync</strong>: Refers to the online platform or digital service operated by LawSync, which facilitates users' ability to search for, book, and interact with lawyers. This platform may include the website, mobile apps, and any other services or technologies developed by LawSync related to legal consultation.</li>
                            <li className="terms-list-item"><strong>User</strong>: This term refers to any individual, organization, or entity that uses LawSync to seek or provide legal services. Users can be either Clients (those seeking legal help or consultations) or Lawyers (those offering legal services or consultations through the platform).</li>
                            <li className="terms-list-item"><strong>Client</strong>: A user who seeks legal advice or services. Clients can book appointments with lawyers, communicate with them through the platform, and access related services such as document management, legal information, and payment services for consultations.</li>
                            <li className="terms-list-item"><strong>Lawyer</strong>: A qualified, licensed attorney who offers legal services through the LawSync platform. Lawyers are responsible for providing professional, competent, and ethical legal advice, representing clients, and maintaining all legal and professional standards applicable in their jurisdiction. Lawyers may include individual practitioners or law firms that use LawSync to connect with clients.</li>
                            <li className="terms-list-item"><strong>Account</strong>: Refers to a user’s personal registration within the LawSync platform, which is necessary to access most services. The account typically includes personal details, login credentials (email, username, password), and other information required for booking appointments, making payments, and communicating with lawyers.</li>
                            <li className="terms-list-item"><strong>Services</strong>: Encompasses all offerings made available through LawSync, including but not limited to searching for lawyers, booking appointments, consulting with lawyers, managing legal documents, making payments, and any additional features or functionalities that the platform may provide.</li>
                            <li className="terms-list-item"><strong>Consultation</strong>: A service offered by a lawyer through LawSync where they provide legal advice, consultation, or representation to a client. A consultation could be in the form of a scheduled meeting (in-person, video call, or phone) or through written communication.</li>
                            <li className="terms-list-item"><strong>Appointment</strong>: The scheduled session between a client and a lawyer, facilitated through the LawSync platform. This could be a consultation appointment or any other service the lawyer is offering via LawSync.</li>
                            <li className="terms-list-item"><strong>Payment Processor</strong>: A third-party service responsible for processing transactions made through the LawSync platform. This includes handling payments made by clients for legal consultations and services.</li>
                            <li className="terms-list-item"><strong>Platform</strong>: Refers to the technological infrastructure that enables LawSync to function, including its website, mobile apps, API integrations, and backend systems. The platform connects clients with lawyers and manages bookings, payments, and communication.</li>
                            <li className="terms-list-item"><strong>Privacy Policy</strong>: A separate document that outlines how LawSync collects, stores, and uses personal data. It details the steps taken to protect user privacy and the rights users have over their data.</li>
                            <li className="terms-list-item"><strong>Terms and Conditions</strong>: The legal agreement governing the use of the LawSync platform. This document outlines the rules, obligations, and responsibilities of users, as well as the rights and limitations of LawSync.</li>
                            <li className="terms-list-item"><strong>User Content</strong>: Refers to any information, data, content, or materials uploaded, submitted, or shared by the user within the platform. This may include appointment details, communication messages, reviews, feedback, or any documents that users share.</li>
                        </ul>

                        <h2 className="terms-heading-secondary">2. Acceptance of Terms</h2>
                        <p className="terms-paragraph">
                            This section explains how users agree to be bound by the Terms and Conditions when they use the LawSync platform. It's essential for establishing the legal contract between the service provider (LawSync) and the user (Client or Lawyer).
                        </p>



                        <h6 className="terms-subheading">2.1 Agreement to Terms</h6>
                        <p className="terms-paragraph">
                            By accessing or using LawSync in any capacity—whether as a client seeking legal services, a lawyer offering consultations, or any other interaction with the platform—you agree to be bound by these Terms and any amendments made to them in the future. This is a legal agreement between you and LawSync, and you must comply with the provisions set forth in this document.
                        </p>
                        <p className="terms-paragraph">
                            Your use of the Service is subject to your compliance with these Terms. If you do not agree to any part of these Terms, you must stop using the platform immediately.
                        </p>


                        <h6 className="terms-subheading">2.2 Electronic Agreement</h6>
                        <p className="terms-paragraph">
                            Your use of LawSync constitutes an electronic signature under applicable law. By accessing or using the platform, you acknowledge that you are entering into a binding agreement with LawSync and that all communications and agreements can be executed electronically. This means that your consent to these Terms is given through your actions, such as browsing, signing up, making bookings, or otherwise interacting with the platform.
                        </p>


                        <h6 className="terms-subheading">2.3 Modifications to the Terms</h6>
                        <p className="terms-paragraph">
                            LawSync reserves the right to modify, update, or revise these Terms at any time without prior notice. Such modifications may include changing the scope of services offered, updating pricing, or altering user obligations.
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item"><strong>Notification of Changes</strong>: Any updates or changes to the Terms will be posted on the LawSync website, and the date of the most recent revision will be clearly indicated at the top of the page (e.g., "Last Updated: {date}"). It is your responsibility to review the Terms periodically to stay informed of any changes.</li>
                            <li className="terms-list-item"><strong>Acceptance of Updated Terms</strong>: By continuing to use the Service after changes have been posted, you are automatically agreeing to the updated Terms. If you do not agree with the new Terms, you must stop using the platform.</li>
                        </ul>



                        <h6 className="terms-subheading">2.4 User Acknowledgment</h6>
                        <p className="terms-paragraph">
                            By using <i>LawSync</i>, you affirm that:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                You are legally able to enter into a binding agreement (i.e., you are over 18 years of age or otherwise have legal authority to accept these Terms).
                            </li>
                            <li className="terms-list-item">
                                You are not restricted by any law, contract, or agreement that would prevent you from using the platform or agreeing to these Terms.
                            </li>
                            <li className="terms-list-item">
                                You are responsible for ensuring that your use of the platform complies with all local, state, or international laws and regulations applicable to you.
                            </li>
                        </ul>


                        <h6 className="terms-subheading">2.5 Limited License</h6>
                        <p className="terms-paragraph">
                            Your acceptance of these Terms grants you a limited, non-transferable, non-exclusive license to access and use the <i>LawSync</i> platform in accordance with these Terms. This license is revocable at any time if you breach any provision of the Terms.
                        </p>


                        <h2 className="terms-heading-secondary">3. Changes to Terms</h2>
                        <p className="terms-paragraph">
                            This section explains LawSync's right to modify or update its Terms and Conditions, ensuring that users understand how updates are communicated and their obligations to remain informed.
                        </p>



                        <h6 className="terms-subheading">3.1 Right to Modify Terms</h6>
                        <p className="terms-paragraph">
                            LawSync reserves the right, at its sole discretion, to modify, update, or revise these Terms and Conditions at any time. These modifications may include changes to policies, features, pricing structures, or legal obligations as deemed necessary for business, legal, or technical reasons.
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Modifications may be required due to changes in laws or regulations, updates to the platform's features, or other operational requirements.
                            </li>
                            <li className="terms-list-item">
                                These updates are binding upon all users, regardless of when they registered or started using the platform.
                            </li>
                        </ul>



                        <h6 className="terms-subheading">3.2 Notice of Changes</h6>
                        <p className="terms-paragraph">
                            While LawSync will make reasonable efforts to notify users of significant changes, it is ultimately your responsibility to review these Terms regularly.
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                <strong>Posting of Updates</strong>: Changes will be reflected in the "Last Updated" date at the top of the Terms and Conditions page. The revised Terms will be effective immediately upon posting, unless otherwise specified.
                            </li>
                            <li className="terms-list-item">
                                <strong>Communication of Changes</strong>: Where significant changes occur, LawSync may notify users through email, push notifications, or prominent notices on the platform. However, failure to receive direct notification does not exempt you from being bound by the revised Terms.
                            </li>
                        </ul>



                        <h6 className="terms-subheading">3.3 User Acknowledgment of Updates</h6>
                        <p className="terms-paragraph">
                            By continuing to use the LawSync platform after any updates are posted, you acknowledge and agree to the revised Terms.
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                <strong>No Retroactive Changes</strong>: Any material changes affecting payment structures, user rights, or services will not be applied retroactively unless explicitly required by law.
                            </li>
                            <li className="terms-list-item">
                                <strong>Opt-Out Option</strong>: If you disagree with the revised Terms, you must stop using the platform immediately. Continued use signifies your acceptance of the updated Terms.
                            </li>
                        </ul>




                        <h2 className="terms-heading-secondary">4. Service Provided</h2>
                        <p className="terms-paragraph">
                            This section outlines the scope and nature of the services offered by LawSync, emphasizing the platform's role as a facilitator for connecting clients and lawyers.
                        </p>


                        <h6 className="terms-subheading">4.1 Platform Overview</h6>
                        <p className="terms-paragraph">
                            LawSync is a digital platform designed to streamline the process of connecting individuals or organizations (clients) with licensed attorneys (lawyers) for legal consultations and related services. The platform provides tools and resources to facilitate this interaction but does not itself offer legal advice or representation.
                        </p>
                        <p className="terms-sub-subheading">
                            Primary Features:
                        </p>

                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                <strong>Lawyer Search</strong>: Allows users to search for lawyers based on location, expertise, availability, and other criteria.
                            </li>
                            <li className="terms-list-item">
                                <strong>Appointment Booking</strong>: Enables clients to schedule consultations with lawyers at mutually convenient times.
                            </li>
                            <li className="terms-list-item">
                                <strong>Communication Tools</strong>: Provides secure messaging and communication channels for clients and lawyers to interact.
                            </li>
                            <li className="terms-list-item">
                                <strong>Payment Processing</strong>: Facilitates secure payments for consultations or services via third-party payment processors.
                            </li>
                            <li className="terms-list-item">
                                <strong>Document Management</strong>: Offers tools for uploading, sharing, and managing legal documents relevant to consultations.
                            </li>
                        </ul>




                        <h6 className="terms-subheading">4.2 Role of <i>LawSync</i></h6>
                        <p className="terms-paragraph">
                            LawSync serves solely as an intermediary platform and does not engage in the practice of law. Its responsibilities are limited to:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Providing a functional and reliable platform for interactions between clients and lawyers.
                            </li>
                            <li className="terms-list-item">
                                Offering scheduling, payment, and communication tools to support the legal consultation process.
                            </li>
                        </ul>
                        <p className="terms-paragraph">
                            LawSync is not a party to any legal services agreement entered into between clients and lawyers. The platform does not:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Guarantee the quality, suitability, or success of the legal advice provided by lawyers.
                            </li>
                            <li className="terms-list-item">
                                Take responsibility for any disputes or disagreements between clients and lawyers.
                            </li>
                        </ul>



                        <h6 className="terms-subheading">4.3 User Categories</h6>
                        <p className="terms-paragraph">
                            The platform serves two main user groups:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                <strong>Clients</strong>: Individuals or organizations seeking legal advice or representation. Clients use LawSync to identify, book, and communicate with lawyers.
                            </li>
                            <li className="terms-list-item">
                                <strong>Lawyers</strong>: Licensed attorneys who offer their professional services through the platform. Lawyers manage their availability, set consultation fees, and provide legal advice in compliance with applicable laws.
                            </li>
                        </ul>


                        <h6 className="terms-subheading">4.4 Right to Modify or Discontinue Services</h6>
                        <p className="terms-paragraph">
                            LawSync reserves the right to:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Modify or update features and functionalities of the platform.
                            </li>
                            <li className="terms-list-item">
                                Suspend or discontinue certain services temporarily or permanently.
                            </li>
                            <li className="terms-list-item text-decoration-underline">
                                Suspend or remove users and lawyers for certain reasons.
                            </li>
                        </ul>
                        <p className="terms-paragraph">
                            Users will be notified of significant changes in service offerings, but LawSync is not liable for any inconvenience or loss caused by such changes.
                        </p>




                        <h2 className="terms-heading-secondary">5. Account Registration</h2>
                        <p className="terms-paragraph">
                            This section explains the process and requirements for account creation on LawSync, outlining distinct provisions for Users and Lawyers to reflect their unique roles on the platform.
                        </p>


                        <h6 className="terms-subheading">5.1 General Requirements for All Users</h6>
                        <p className="terms-paragraph">
                            To access the services provided by LawSync, all users must create an account by providing accurate and complete information. By registering, you agree to:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Provide truthful, accurate, and up-to-date information.
                            </li>
                            <li className="terms-list-item">
                                Maintain the security of your account credentials, including your password.
                            </li>
                            <li className="terms-list-item">
                                Notify <i>LawSync</i> immediately in case of unauthorized access or any breach of security.
                            </li>
                        </ul>
                        <p className="terms-paragraph">
                            Failure to comply with these requirements may result in suspension or termination of your account.
                        </p>



                        <h6 className="terms-subheading">5.2 Account Registration for Clients </h6>
                        <h6 className="terms-sub-subheading">5.2.1 Registration Process</h6>
                        <p className="terms-paragraph">
                            Clients must provide the following details:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Full name.
                            </li>
                            <li className="terms-list-item">
                                Valid email address and phone number.
                            </li>
                            <li className="terms-list-item">
                                Payment information for booking consultations (optional at the time of registration).
                            </li>
                            <li className="terms-list-item">
                                Any other required details to facilitate communication and appointments with lawyers.
                            </li>
                            <li className="terms-list-item">
                                Clients must verify their email address and/or phone number to activate their account.
                            </li>
                        </ul>




                        <h6 className="terms-sub-subheading">5.2.2 Client Obligations</h6>
                        <p className="terms-paragraph subheading-p">
                            <strong>Accuracy of Information</strong>: Clients must ensure the information provided during registration and subsequent use of the platform remains accurate and up-to-date.
                        </p>
                        <p className="terms-paragraph subheading-p">
                            <strong>Purpose of Use</strong>: The account is strictly for personal or organizational use to seek legal advice or services. Clients may not use the platform to harass, defraud, or engage in any unlawful activities.
                        </p>
                        <p className="terms-paragraph subheading-p">
                            <strong>Account Restrictions</strong>:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Clients may not create multiple accounts without prior approval.
                            </li>
                            <li className="terms-list-item">
                                Sharing of accounts with others is prohibited.
                            </li>
                        </ul>


                        <h6 className="terms-sub-subheading">5.2.3 Privacy and Confidentiality</h6>
                        <p className="terms-paragraph subheading-p">
                            Clients must ensure that their communications and shared documents comply with applicable privacy laws. While LawSync uses secure systems, clients are responsible for safeguarding their own sensitive information.
                        </p>



                        <h6 className="terms-subheading mt-5">5.3 Account Registration for Lawyers </h6>
                        <h6 className="terms-sub-subheading">5.3.1 Registration Process</h6>
                        <p className="terms-paragraph">
                            Lawyers must provide the following details during registration:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Full name and professional title.
                            </li>
                            <li className="terms-list-item">
                                Contact information (email address, phone number, office address).
                            </li>
                            <li className="terms-list-item">
                                Proof of licensure and bar association membership in their practicing jurisdiction.
                            </li>
                            <li className="terms-list-item">
                                Areas of expertise and legal practice.
                            </li>
                            <li className="terms-list-item">
                                Consultation fees and availability schedule.
                            </li>
                        </ul>
                        <p className="terms-paragraph">
                            Lawyers must undergo a verification process where LawSync may request additional documentation to confirm their credentials.
                        </p>



                        <h6 className="terms-sub-subheading">5.3.2 Lawyer Obligations</h6>
                        <p className="terms-paragraph subheading-p">
                            <strong>Professional Standards</strong>: Lawyers must adhere to all professional and ethical standards applicable in their jurisdiction, including confidentiality, competence, and diligence.
                        </p>
                        <p className="terms-paragraph subheading-p">
                            <strong>Information Accuracy</strong>:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Lawyers are responsible for ensuring the accuracy of all profile details, including their qualifications, expertise, and availability.
                            </li>
                            <li className="terms-list-item">
                                Misrepresentation of credentials or services is strictly prohibited.
                            </li>
                        </ul>
                        <p className="terms-paragraph subheading-p">
                            <strong>Use of the Platform</strong>:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Lawyers may only use LawSync to offer legal services and consultations within their licensed jurisdictions.
                            </li>
                            <li className="terms-list-item">
                                Lawyers must promptly update their availability and respond to client inquiries in a timely manner.
                            </li>
                        </ul>


                        <h6 className="terms-sub-subheading">5.3.3 Compliance and Legal Obligations</h6>
                        <p className="terms-paragraph subheading-p">
                            Lawyers must ensure their services comply with all local laws and regulations, including those related to client confidentiality, conflict of interest, and professional conduct.
                        </p>

                        <h6 className="terms-sub-subheading">5.3.4 Fee Transparency</h6>
                        <p className="terms-paragraph subheading-p">
                            Lawyers must clearly specify their fees for consultations and any additional services. Changes to fees must be updated promptly and communicated transparently to clients before appointments.
                        </p>

                        <h6 className="terms-sub-subheading">5.3.5 Right to Refuse Services</h6>
                        <p className="terms-paragraph subheading-p">
                            Lawyers have the right to decline a client’s request for services, provided such refusal does not violate any applicable laws or professional obligations. The platform must be notified of any disputes or cancellations.
                        </p>

                        <h6 className="terms-subheading mt-5">5.4 Account Termination</h6>
                        <p className="terms-paragraph">
                            <i>LawSync</i> reserves the right to suspend or terminate accounts for violations of these Terms, including:
                        </p>
                        <ul className="terms-list-terms">
                            <li className="terms-list-item">
                                Providing false or misleading information during registration.
                            </li>
                            <li className="terms-list-item">
                                Breaching any applicable laws or regulations.
                            </li>
                            <li className="terms-list-item">
                                Engaging in unauthorized activities or misconduct on the platform.
                            </li>
                        </ul>
                        <p className="terms-paragraph">
                            <i>LawSync</i> may, at its discretion, provide notice of termination and an opportunity to resolve issues before taking further action.
                        </p>


                        <h2 className="terms-heading-secondary">6. Cancellations and Refunds</h2>
                        <p className="terms-paragraph">
                            If you need to cancel or reschedule an appointment, you must do so within the time frame specified by the individual lawyer. LawSync does not handle cancellations or refunds; these policies are governed by the specific terms of the lawyer you booked.
                        </p>

                        <h2 className="terms-heading-secondary">7. Limitation of Liability</h2>
                        <p className="terms-paragraph">
                            LawSync provides its services "as is" and makes no warranties or representations regarding the quality, availability, or accuracy of the services provided by the lawyers. To the maximum extent permitted by law, LawSync shall not be liable for any damages, loss of data, or other issues arising from your use of the platform.
                        </p>

                        <h2 className="terms-heading-secondary">8. Dispute Resolution</h2>
                        <p className="terms-paragraph">
                            In the event of any disputes or disagreements between you and LawSync, or between you and any lawyer booked through the platform, you agree to resolve the issue through mediation or arbitration. The jurisdiction for any legal proceedings will be determined as per the laws applicable in the country of operation.
                        </p>

                        <h2 className="terms-heading-secondary">9. Termination of Service</h2>
                        <p className="terms-paragraph">
                            LawSync reserves the right to suspend or terminate your account if we believe you have violated these Terms and Conditions. In such cases, you may be prohibited from using the platform for a certain period or indefinitely.
                        </p>

                        <h2 className="terms-heading-secondary">10. Changes to Terms</h2>
                        <p className="terms-paragraph">
                            LawSync reserves the right to modify or update these Terms at any time. Any changes to the Terms will be posted on the platform, and it is your responsibility to review the Terms periodically. Continued use of the platform after any changes constitutes your acceptance of the new Terms.
                        </p>

                        <h2 className="terms-heading-secondary">11. Contact Us</h2>
                        <p className="terms-paragraph">
                            If you have any questions or concerns about these Terms and Conditions, please contact us at lawsync.project@gmail.com or through our contact form on the platform.
                        </p>
                        <blockquote className="terms-blockquote mb-lg-2 mt-lg-5">
                            Effective Date: {date}
                        </blockquote>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Terms;
