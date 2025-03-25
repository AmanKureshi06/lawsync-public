import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import withAuthProtection from "../utils/withAuthProtection";
import withRoleProtection from "../utils/withRoleProtection";
import "../Style/PostJob.css";

function PostJob() {
    document.title = "Post a Job - LawSync";
    return (
        <div>
            <Navbar />
            <div className="d-flex post-d-flex container justify-content-center border-bottom pb-5 font">
                <div className="col-12 post-col-12 col-lg-8">
                    <h3 className="my-4 post-title">Post a Job</h3>

                    <form>
                        {/* Job Title */}
                        <div className="form-outline mb-4">
                            <label className="form-label post-label" htmlFor="jobTitle">
                                Job Title
                            </label>
                            <input
                                type="text"
                                id="jobTitle"
                                className="form-control post-input"
                                placeholder="e.g., Experienced Civil Lawyer Needed"
                            />
                        </div>

                        {/* Lawyer Type & Case Type */}
                        <div className="row mb-4">
                            <div className="col-12 col-md-6">
                                <label className="form-label post-label" htmlFor="lawyerType">
                                    Required Lawyer Type
                                </label>
                                <select
                                    className="form-select post-select"
                                    id="lawyerType"
                                    aria-label="Select lawyer type"
                                >
                                    <option selected>Choose Type</option>
                                    <option value="1">Civil Lawyer</option>
                                    <option value="2">Criminal Lawyer</option>
                                    <option value="3">Corporate Lawyer</option>
                                    <option value="4">Family Lawyer</option>
                                </select>
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label post-label" htmlFor="caseType">
                                    Case Type
                                </label>
                                <select
                                    className="form-select post-select"
                                    id="caseType"
                                    aria-label="Select case type"
                                >
                                    <option selected>Choose Case Type</option>
                                    <option value="1">Divorce</option>
                                    <option value="2">Contract Dispute</option>
                                    <option value="3">Personal Injury</option>
                                    <option value="4">Fraud</option>
                                </select>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="form-outline mb-4">
                            <label className="form-label post-label" htmlFor="location">
                                Location
                            </label>
                            <input
                                type="text"
                                id="location"
                                className="form-control post-input"
                                placeholder="e.g., New York, NY"
                            />
                        </div>

                        {/* Payment Details */}
                        <div className="row mb-4">
                            <div className="col-12 col-md-6">
                                <label className="form-label post-label" htmlFor="payment">
                                    Payment Offered
                                </label>
                                <input
                                    type="number"
                                    id="payment"
                                    className="form-control post-input"
                                    placeholder="e.g., 5000"
                                />
                            </div>
                            <div className="col-12 col-md-6">
                                <label className="form-label post-label" htmlFor="urgency">
                                    Urgency of Requirement
                                </label>
                                <select
                                    className="form-select post-select"
                                    id="urgency"
                                    aria-label="Select urgency"
                                >
                                    <option selected>Choose Urgency</option>
                                    <option value="1">Immediate</option>
                                    <option value="2">1 Week</option>
                                    <option value="3">Flexible</option>
                                </select>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="form-outline mb-4">
                            <label className="form-label post-label" htmlFor="additionalInfo">
                                Additional Information
                            </label>
                            <textarea
                                className="form-control post-input"
                                id="additionalInfo"
                                rows="4"
                                placeholder="Provide any specific details about the job."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn btn-primary btn-block mb-4 px-5 post-button"
                        >
                            Post Job
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default withAuthProtection(withRoleProtection(PostJob, ["user"]));
