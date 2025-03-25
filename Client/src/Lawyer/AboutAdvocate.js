import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { content } from "../App";
import { Calendar } from "primereact/calendar";
import { Link } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../Style/PaymentModel.css";
import "../Style/Success.css";

function AboutAdvocate() {
  const { username } = useParams();
  const [star, setstar] = useState(100);
  const [star2, setstar2] = useState(20);
  const [advocateDetails, setAdvocateDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  useEffect(() => {
    const fetchAdvocateDetails = async () => {
      try {
        if (!username) return; // ✅ Prevent crash

        let formattedUsername = username.startsWith("@")
          ? username.substring(1)
          : username;
        console.log(`Fetching details for: ${formattedUsername}`); // Debugging log

        const response = await fetch(
          `http://localhost:5000/api/lawyer/lawyers/${formattedUsername}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Advocate not found");
          }
          throw new Error("Failed to fetch advocate details");
        }
        const data = await response.json();
        setAdvocateDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocateDetails();
  }, [username]);

  if (loading) return <p>Loading advocate details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!advocateDetails) return <p>No details found for this advocate.</p>;

  document.title = `About - ${advocateDetails.professionalDetails.fullName}`;

  return (
    <>
      <Navbar />
      {/* <div className="advocate-container">
        <h1>{advocateDetails.personalDetails.fullName}</h1>
        <p>
          <strong>Email:</strong> {advocateDetails.personalDetails.email}
        </p>
        <p>
          <strong>Mobile:</strong>{" "}
          {advocateDetails.personalDetails.mobileNumber}
        </p>
        <p>
          <strong>Specialty:</strong>{" "}
          {advocateDetails.professionalDetails.specialty}
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          {advocateDetails.professionalDetails.experience} years
        </p>
        <p>
          <strong>Rate:</strong> ${advocateDetails.professionalDetails.rate} per
          hour
        </p>
        <p>
          <strong>Skills:</strong>{" "}
          {advocateDetails.professionalDetails.skills.join(", ")}
        </p>
        {advocateDetails.professionalDetails.certificate && (
          <div>
            <h3>Certification:</h3>
            <img
              src={`http://localhost:5000${advocateDetails.professionalDetails.certificate}`}
              alt="Certificate"
              className="certificate-image"
            />
          </div>
        )}
      </div> */}

      <div>
        <div className="d-flex justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="row gap-5 p-5">
              <div className=" col-12 col-lg-3  text-center">
                <div className="border p-3">
                  <img
                    src="https://via.placeholder.com/100"
                    alt={advocateDetails.professionalDetails.fullName}
                    height={100}
                    width={100}
                  />

                  <h6>{advocateDetails.professionalDetails.fullName}</h6>

                  <div className="star1AboutAdvocate">
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-regular fa-star"></i>
                    <span> (233 Reviews)</span>
                  </div>

                  <h6 className="text-info my-2">
                    ₹ {advocateDetails.professionalDetails.rate} /{" "}
                    <span className="text-dark"> per hour</span>
                  </h6>

                  <button className="btN btn-primary rounded px-4 mt-2">
                    Send Message
                  </button>
                </div>
              </div>

              <div className="col">
                <h4>About {advocateDetails.professionalDetails.fullName}</h4>

                <div className="text-bg-success" style={{ fontSize: "12px" }}>
                  {advocateDetails.professionalDetails.about}
                  {/* <span
                    className="collapse"
                    id="collapseExample"
                    style={{ fontSize: "12px" }}
                  >
                    Some placeholder content for the collapse component. This
                    panel is hidden by default but revealed when the user
                    activates the relevant trigger.
                  </span>
                  <a
                    className=""
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Read More
                  </a> */}
                </div>

                <h4 className="mt-3">Skills</h4>

                <div>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    {advocateDetails.professionalDetails.skills[0]}
                  </button>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    Accident
                  </button>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    Lorem Ipsum
                  </button>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    Accident
                  </button>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    Lorem Ipsum
                  </button>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    Accident
                  </button>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    Lorem Ipsum
                  </button>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    Accident
                  </button>
                  <button className="btn btn-outline-dark m-1 btn-sm">
                    Lorem Ipsum
                  </button>
                </div>

                <h4 className="mt-3">Resolution Experience</h4>

                <div className="" style={{ fontSize: "12px" }}>
                  {advocateDetails.professionalDetails.experience}
                  {/* <span
                    style={{ fontSize: "12px" }}
                    className="collapse"
                    id="collapseExample2"
                  >
                    Some placeholder content for the collapse component. This
                    panel is hidden by default but revealed when the user
                    activates the relevant trigger.
                  </span>
                  <a
                    className=""
                    data-bs-toggle="collapse"
                    href="#collapseExample2"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Read More
                  </a> */}
                </div>

                <div className="my-3 d-flex gap-3 border-bottom pb-4">
                  <button
                    className="btn btn-info btn-sm px-5"
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                    role="button"
                  >
                    Check Availability
                  </button>
                  <button className="btn btn-primary btn-sm px-5">
                    Book Video Call
                  </button>
                </div>

                {/*  */}
                <div className="col-12 col-lg-6 ">
                  <h4>Reviews</h4>

                  <div className="d-flex gap-4">
                    <h6>Exceptional 4.0</h6>

                    <h6> 233 Reviews</h6>
                  </div>

                  <div className="">
                    <div className="my-3">
                      <i
                        onClick={() => {
                          setstar(20);
                        }}
                        className="fa-solid fa-star text-warning"
                      ></i>
                      <i
                        onClick={() => {
                          setstar(40);
                        }}
                        className="fa-solid fa-star text-warning"
                      ></i>
                      <i
                        onClick={() => {
                          setstar(60);
                        }}
                        className="fa-solid fa-star text-warning"
                      ></i>
                      <i
                        onClick={() => {
                          setstar(80);
                        }}
                        className="fa-solid fa-star text-warning"
                      ></i>
                      <i
                        onClick={() => {
                          setstar(100);
                        }}
                        className="fa-regular fa-star"
                      ></i>
                    </div>

                    <div>
                      <div className="d-flex gap-3 align-items-center">
                        <h6>5</h6>

                        <i
                          style={{ fontSize: "12px" }}
                          className="fa-solid fa-star text-warning"
                        ></i>

                        <input
                          type="range"
                          value={star}
                          onChange={(e) => {
                            setstar(e.target.value);
                          }}
                        />

                        <b>{star} %</b>
                      </div>

                      <div className="d-flex gap-3 align-items-center">
                        <h6>4</h6>

                        <i
                          style={{ fontSize: "12px" }}
                          className="fa-solid fa-star text-warning"
                        ></i>

                        <input
                          style={{ width: "%" }}
                          type="range"
                          value={star}
                          onChange={(e) => {
                            setstar(e.target.value);
                          }}
                        />

                        <b>{star} %</b>
                      </div>

                      <div className="d-flex gap-3 align-items-center">
                        <h6>3</h6>

                        <i className="fa-solid fa-star text-warning"></i>

                        <input
                          type="range"
                          value={star}
                          onChange={(e) => {
                            setstar(e.target.value);
                          }}
                        />

                        <b>{star} %</b>
                      </div>

                      <div className="d-flex gap-3 align-items-center">
                        <h6>2</h6>

                        <i className="fa-solid fa-star text-warning"></i>

                        <input
                          type="range"
                          value={star}
                          onChange={(e) => {
                            setstar(e.target.value);
                          }}
                        />

                        <b>{star} %</b>
                      </div>

                      <div className="d-flex gap-3 align-items-center">
                        <h6>1</h6>

                        <i className="fa-solid fa-star text-warning"></i>

                        <input
                          type="range"
                          value={star2}
                          onChange={(e) => {
                            setstar2(e.target.value);
                          }}
                        />

                        <b>{star2} %</b>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}

                <div className="my-4">
                  <div className="border-bottom border-1  py-2 d-flex">
                    <div className=" col-2 col-lg-1 text-center">
                      <img src="../image/available2.png" alt="" width={40} />
                    </div>

                    <div className=" col-11">
                      <div className="d-flex justify-content-between ">
                        <div>
                          <h6 className=" fs-6 fw-bold">Wade warren</h6>
                          <p className="text-secondary fw-bold my-0">
                            12 Dec 2022
                          </p>
                        </div>

                        <div className="d-flex gap-1">
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                        </div>
                      </div>

                      <p style={{ fontSize: "13px" }}>
                        Mauris venenatis, felis in dictum sagittis, elit nunc
                        dignissim massa, eget feugiat nibh est a nibh. Aliquam
                        eu nibh sit amet augue consectetur pretium sed sit amet
                        leo.
                      </p>
                    </div>
                  </div>

                  {/*  */}

                  <div className="border-bottom border-1  py-2 d-flex">
                    <div className=" col-2 col-lg-1 text-center">
                      <img src="../image/available2.png" alt="" width={40} />
                    </div>

                    <div className=" col-11">
                      <div className="d-flex justify-content-between ">
                        <div>
                          <h6 className=" fs-6 fw-bold">Wade warren</h6>
                          <p className="text-secondary fw-bold my-0">
                            12 Dec 2022
                          </p>
                        </div>

                        <div className="d-flex gap-1">
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                          <i
                            style={{ fontSize: "10px" }}
                            className="fa-solid fa-star text-warning"
                          ></i>
                        </div>
                      </div>

                      <p style={{ fontSize: "13px" }}>
                        Mauris venenatis, felis in dictum sagittis, elit nunc
                        dignissim massa, eget feugiat nibh est a nibh. Aliquam
                        eu nibh sit amet augue consectetur pretium sed sit amet
                        leo.
                      </p>
                    </div>
                  </div>

                  <div className="collapse" id="collapseExample3">
                    <div className="border-bottom border-1  py-2 d-flex">
                      <div className=" col-1">
                        <img src="../image/available2.png" alt="" width={40} />
                      </div>

                      <div className=" col">
                        <div className="d-flex justify-content-between ">
                          <div>
                            <h6 className=" fs-6 fw-bold">Wade warren</h6>
                            <p className="text-secondary fw-bold my-0">
                              12 Dec 2022
                            </p>
                          </div>

                          <div className="d-flex gap-1">
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                          </div>
                        </div>

                        <p style={{ fontSize: "13px" }}>
                          Mauris venenatis, felis in dictum sagittis, elit nunc
                          dignissim massa, eget feugiat nibh est a nibh. Aliquam
                          eu nibh sit amet augue consectetur pretium sed sit
                          amet leo.
                        </p>
                      </div>
                    </div>

                    <div className="border-bottom border-1  py-2 d-flex">
                      <div className=" col-1">
                        <img src="../image/available2.png" alt="" width={40} />
                      </div>

                      <div className=" col">
                        <div className="d-flex justify-content-between ">
                          <div>
                            <h6 className=" fs-6 fw-bold">Wade warren</h6>
                            <p className="text-secondary fw-bold my-0">
                              12 Dec 2022
                            </p>
                          </div>

                          <div className="d-flex gap-1">
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                          </div>
                        </div>

                        <p style={{ fontSize: "13px" }}>
                          Mauris venenatis, felis in dictum sagittis, elit nunc
                          dignissim massa, eget feugiat nibh est a nibh. Aliquam
                          eu nibh sit amet augue consectetur pretium sed sit
                          amet leo.
                        </p>
                      </div>
                    </div>

                    <div className="border-bottom border-1  py-2 d-flex">
                      <div className=" col-1">
                        <img src="../image/available2.png" alt="" width={40} />
                      </div>

                      <div className=" col">
                        <div className="d-flex justify-content-between ">
                          <div>
                            <h6 className=" fs-6 fw-bold">Wade warren</h6>
                            <p className="text-secondary fw-bold my-0">
                              12 Dec 2022
                            </p>
                          </div>

                          <div className="d-flex gap-1">
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                          </div>
                        </div>

                        <p style={{ fontSize: "13px" }}>
                          Mauris venenatis, felis in dictum sagittis, elit nunc
                          dignissim massa, eget feugiat nibh est a nibh. Aliquam
                          eu nibh sit amet augue consectetur pretium sed sit
                          amet leo.
                        </p>
                      </div>
                    </div>

                    <div className="border-bottom border-1  py-2 d-flex">
                      <div className=" col-1">
                        <img src="../image/available2.png" alt="" width={40} />
                      </div>

                      <div className=" col">
                        <div className="d-flex justify-content-between ">
                          <div>
                            <h6 className=" fs-6 fw-bold">Wade warren</h6>
                            <p className="text-secondary fw-bold my-0">
                              12 Dec 2022
                            </p>
                          </div>

                          <div className="d-flex gap-1">
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                            <i
                              style={{ fontSize: "10px" }}
                              className="fa-solid fa-star text-warning"
                            ></i>
                          </div>
                        </div>

                        <p style={{ fontSize: "13px" }}>
                          Mauris venenatis, felis in dictum sagittis, elit nunc
                          dignissim massa, eget feugiat nibh est a nibh. Aliquam
                          eu nibh sit amet augue consectetur pretium sed sit
                          amet leo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    className=""
                    data-bs-toggle="collapse"
                    href="#collapseExample3"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    See All Reviews
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mmodel one */}

        <div
          className="modal fade"
          id="exampleModalToggle"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered ">
            <div style={{ width: "70%" }} className="modal-content ">
              <div className="modal-body border">
                <div className=" text-end ">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <h6 className="text-center font-bold">Check Availability</h6>

                <div className="d-flex gap-2 border align-items-center">
                  <img
                    className="object-fit-cover p-2"
                    src="src/image/available_lawyer_1.png"
                    alt="None"
                    width={100}
                  />

                  <div className="">
                    <h6 className="">NAME</h6>

                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-regular fa-star"></i>

                    <b className="ms-2">(233 Reviews)</b>

                    <p>₹ {advocateDetails.professionalDetails.rate} / per hour</p>
                  </div>
                </div>

                <h4 className="my-3">Availability</h4>

                <button className="btn">Today</button>
                <button className="btn">Tomorrow</button>

                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>

                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>

                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>

                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>

                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>
                </div>
              </div>
              <div className="modal-footer border">
                <button
                  className="btn btn-primary w-100"
                  data-bs-target="#exampleModalToggle2"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  Book Video Call
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModalToggle2"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div style={{ width: "70%" }} className="modal-content ">
              <div className="modal-body border">
                <div className=" text-end">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <h6 className="text-center">Check Availability</h6>

                <div className="card flex justify-content-center">
                  <Calendar
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    inline
                    showWeek
                  />
                </div>

                <h4 className="my-3">Availability</h4>

                <button className="btn">Today</button>
                <button className="btn">Tomorrow</button>

                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>

                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>

                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>

                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>

                  <button className="btn btn-outline-primary btn-sm px-3">
                    8:00 to 8:30 AM
                  </button>
                  <button className="btn btn-outline-primary btn-sm  px-3">
                    8:00 to 8:30 AM
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary w-100"
                  data-bs-target="#exampleModalToggle3"
                  data-bs-toggle="modal"
                  data-bs-dismiss="modal"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Model PopUp */}

        <div
          className="modal fade"
          id="exampleModalToggle3"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel3"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ width: "90%" }}>
              <div className="modal-body border p-4">
                <div className="text-end">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <h4 className="text-center mb-4">Payment</h4>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <p className="mb-0">Date</p>
                    <span>22 May 2023</span>
                  </div>
                  <button className="btn btn-link">Edit</button>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <p className="mb-0">Time</p>
                    <span>10:30 to 11:00 AM</span>
                  </div>
                  <button className="btn btn-link">Edit</button>
                </div>

                <div className="payment-card mb-4">
                  <div
                    className="card p-4 text-white"
                    style={{ backgroundColor: "#007BFF" }}
                  >
                    <div className="d-flex justify-content-between">
                      <span>1234 55678 9012 4567</span>
                      <span>Expiry 9/2025</span>
                    </div>
                    <div className="mt-3">
                      <span>Jane Cooper</span>
                    </div>
                  </div>
                </div>

                <form method="POST">
                  <div className="mb-3">
                    <label htmlFor="nameOnCard" className="form-label">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nameOnCard"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleInputChange}
                      placeholder="Name on Card"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="cardNumber" className="form-label">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cardNumber"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleInputChange}
                      placeholder="Card Number"
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="expiryDate" className="form-label">
                        Expiry Date
                      </label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          name="expiryMonth"
                          value={cardDetails.expiryMonth}
                          onChange={handleInputChange}
                          placeholder="MM"
                        />
                        <input
                          type="text"
                          className="form-control"
                          name="expiryYear"
                          value={cardDetails.expiryYear}
                          onChange={handleInputChange}
                          placeholder="YYYY"
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <label htmlFor="cvv" className="form-label">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleInputChange}
                        placeholder="CVV"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    data-bs-target="#exampleModalToggle4"
                    data-bs-toggle="modal"
                    data-bs-dismiss="modal"
                  >
                    Pay Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModalToggle4"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel4"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ width: "90%" }}>
              <div className="modal-body p-4">
                <div className=" text-end ">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  className="success-page"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div
                    className="content success-content"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="icon-container">
                      <svg
                        xmlns="http:www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="blue"
                      >
                        <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        <path
                          d="M9 12l2 2 4-4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h2>Successfully Done!</h2>
                    <p>Your booking has been submitted successfully.</p>
                    <button
                      className="ok-button"
                      data-bs-target="#exampleModalToggle5"
                      data-bs-toggle="modal"
                      data-bs-dismiss="modal"
                    >
                      Failed Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="exampleModalToggle5"
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel5"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ width: "90%" }}>
              <div className="modal-body p-4">
                <div className=" text-end ">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div
                  className="success-page"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div
                    className="content success-content"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <div className="icon-container">
                      <svg
                        xmlns="http:www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="red"
                      >
                        <circle cx="12" cy="12" r="9" strokeWidth="2" />

                        <line
                          x1="9"
                          y1="9"
                          x2="15"
                          y2="15"
                          strokeWidth="2"
                          strokeLinecap="round"
                          stroke="red"
                        />
                        <line
                          x1="15"
                          y1="9"
                          x2="9"
                          y2="15"
                          strokeWidth="2"
                          strokeLinecap="round"
                          stroke="red"
                        />
                      </svg>
                    </div>
                    <h2>Payment Failed!</h2>
                    <p>
                      Your booking has been failed. Please check payment method
                    </p>
                    <button
                      className="ok-button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default AboutAdvocate;

