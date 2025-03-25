import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Footer from "./Components/Footer";

function Home() {
  document.title = "Home - LawSync";
  const [display, setDisplay] = useState(true);
  const [width, setWidth] = useState(950);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const Arr = [
    {
      id: 1,
      url: "./image/available_lawyer_1.png",
      name: "Arlene McCoy",
      price: 200,
    },

    {
      id: 2,
      url: "./image/available_lawyer_2.png",
      name: "Mirza",
      price: 200,
    },

    {
      id: 3,
      url: "./image/available_lawyer_3.png",
      name: "Arlene McCoy",
      price: 200,
    },

    {
      id: 4,
      url: "./image/available_lawyer_4.png",
      name: "Arlene McCoy",
      price: 200,
    },
    {
      id: 4,
      url: "./image/available_lawyer_5.png",
      name: "Arlene McCoy",
      price: 200,
    },
    {
      id: 4,
      url: "./image/available_lawyer_6.png",
      name: "Arlene McCoy",
      price: 200,
    },
    {
      id: 4,
      url: "./image/available_lawyer_7.png",
      name: "Arlene McCoy",
      price: 200,
    },
    {
      id: 4,
      url: "./image/available_lawyer_8.png",
      name: "Arlene McCoy",
      price: 200,
    },
    {
      id: 4,
      url: "./image/available_lawyer_9.png",
      name: "Arlene McCoy",
      price: 200,
    },
    {
      id: 4,
      url: "./image/available_lawyer_10.png",
      name: "Arlene McCoy",
      price: 200,
    },
    {
      id: 4,
      url: "./image/available_lawyer_11.png",
      name: "Arlene McCoy",
      price: 200,
    },
    {
      id: 12,
      url: "./image/available_lawyer_12.png",
      name: "Ravi",
      price: 200,
    },
  ];
  return (
    <div>
      <div className="Nav-Home">
        <Navbar />

        <div className="d-flex justify-content-center">
          <div className="col-10 py-4">
            <section className="container row justify-content-center align-items-center gap-5 py-5">
              <div className="col-12 col-lg-5 col-xl-5 text-white">
                <h1
                  className="pt-2 display-4 "
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300 }}
                >
                  Unbelievable Solutions For All Legal Cases
                </h1>
                <img
                  className="img-fluid mb-3"
                  src="./Image/home1.png"
                  width={300}
                />

                <p
                  className="py-1 mt-3 mb-5"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 300,
                    color: "#7d8994",
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>

                <Link to={"/advisor"} style={{ textDecoration: "none" }}>
                  <button className="btn btn-primary px-4 py-2">
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                      }}
                    >
                      Hire an Advocate
                    </span>
                  </button>
                </Link>
              </div>

              <div className="col-12 col-lg-6 col-xl-4">
                <img className="img-fluid" src="./Image/home2.png" />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* <!-- section 2 start --> */}

      <section className="section2 d-flex justify-content-center ">
        <div className="col-10 col-lg-8 my-5">
          <div className="row gap-5 py-4 align-items-center mb-3">
            <h1
              className="col-12 col-lg-6 "
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
            >
              We earn your trust and are deligent your case.
            </h1>

            <p className="col-12 col-lg-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>

          <div className="sec2 mb-5">
            <div className="d-flex flex-column align-items-center text-center">
              <i className="fa-solid fa-scale-balanced fs-1 mb-3"></i>
              <p>Legal</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center">
              <i className="fa-solid fa-car fs-1 mb-3"></i>
              <p>Auto</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center">
              <i className="fa-solid fa-user fs-1 mb-3"></i>
              <p>Customer</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center">
              <i className="fa-solid fa-house fs-1 mb-3"></i>
              <p>Housing</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center">
              <i className="fa-solid fa-user-tie fs-1 mb-3"></i>
              <p>Employment</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center">
              <i className="fa-solid fa-staff-snake fs-1 mb-3"></i>
              <p>Medical</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center col-2">
              <i className="fa-solid fa-plane-departure fs-1 mb-3"></i>
              <p>Travel</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center col-2">
              <i className="fa-solid fa-seedling fs-1 mb-3"></i>
              <p>Environmental</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center col-2">
              <i className="fa-solid fa-microchip fs-1 mb-3"></i>
              <p>Technology</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center col-2">
              <i className="fa-solid fa-graduation-cap fs-1 mb-3"></i>
              <p>Education</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center col-2">
              <i className="fa-solid fa-coins fs-1 mb-3"></i>
              <p>Financial</p>
            </div>

            <div className="d-flex flex-column align-items-center text-center col-2">
              <i className="fa-solid fa-wifi fs-1 mb-3"></i>
              <p>Internet</p>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 */}

      <section className="my-5 overflow-hidden ">
        <div className="d-flex justify-content-center ">
          <div className="col-12 col-lg-8 slider-container">
            {/* <h2 className='text-center'> Available Advocates </h2> */}
            <h2
              className=" text-center mb-4"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400 }}
            >
              Available Advocates
            </h2>

            <div
              style={{
                width: width + "px",
                display: display ? "block" : "none",
              }}
            >
              <Slider {...settings}>
                {Arr.map((v) => (
                  <div className="p-3" key={v.id}>
                    <div className="border border-0.1 rounded p-3 text-center">
                      <img
                        className="m-auto"
                        src={v.url}
                        alt="not found"
                        height={80}
                      />

                      <h6 className="my-2">{v.name}</h6>

                      <div className="my-1">
                        <i className="fa-solid fa-star text-warning sizing"></i>
                        <i className="fa-solid fa-star text-warning sizing"></i>
                        <i className="fa-solid fa-star text-warning sizing"></i>
                        <i className="fa-solid fa-star text-warning sizing"></i>
                        <i className="fa-regular fa-star sizing"></i>

                        <b className="ms-2 sizing">(233 Reviews)</b>
                      </div>

                      <div>
                        <h6>
                          ₹ {v.price} <span> /per hour</span>
                        </h6>
                      </div>

                      <p className="text-start sizing">
                        {" "}
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority...
                      </p>

                      <i className="fa-regular fa-comment sizing"></i>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- section4 start --> */}

      <section className="section4">
        <div className="d-flex justify-content-center align-items-center">
          <div className="col-12 col-lg-8  gap-5  row justify-content-center align-items-center">
            <div className="col-12 col-lg-6">
              <img
                className="img-fluid"
                src="./Image/aboutus1.png"
                alt="About Us"
              />
            </div>

            <div className="col-12  col-lg-5 py-3">
              <p className="my-3 text-secondary">
                <b>About Us</b>
              </p>
              <h1
                className="my-3"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                We never sleep till our client get justice.
              </h1>
              <p className="my-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
              <Link to={"/advisor"} style={{ textDecoration: "none" }}>
                <button className="my-3 btn btn-primary py-1 px-4">
                  Find an Advocate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- section5 start --> */}

      <section className="d-flex justify-content-center mt-3 mb-5">
        <div className="col-12 col-lg-8 text-center">
          <h1
            className="my-5"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300 }}
          >
            How it Works
          </h1>

          <div className="Works">
            <div className="Workschild1 col-3  p-3">
              <img
                className="img-fluid my-3"
                src="./Image/works1 (2).png"
                alt="Work1"
                width="50px"
              />

              <h5>Lorem Ipsum is simply</h5>

              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature.
              </p>
            </div>

            <div className="Workschild1 col-3  p-3">
              <img
                className="img-fluid my-3"
                src="./Image/works1 (2).png"
                alt="work2"
                width="50px"
              />

              <h5>Lorem Ipsum is simply</h5>

              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature.
              </p>
            </div>

            <div className="Workschild1 col-3  p-3">
              <img
                className="img-fluid my-3"
                src="./Image/works1 (2).png"
                alt="work3"
                width="50px"
              />

              <h5>Lorem Ipsum is simply</h5>

              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature.
              </p>
            </div>
          </div>
          <Link to={"/lawyer/register"} style={{ textDecoration: "none" }}>
            <button className="btn btn-primary my-5">
              Become a Service Provider
            </button>
          </Link>
        </div>
      </section>

      {/* <!-- section 6 start --> */}

      <section className="section6">
        <div className="d-flex justify-content-center text-center">
          <div className="col-12 col-lg-8 mt-5">
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 300 }}>
              Download App
            </h1>

            <div className="d-flex justify-content-center py-3">
              <p className="col-10 col-lg-7">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>

            <div className="mt-3 mb-5">
              <img
                className="img-fluid"
                src="./Image/download2.png"
                alt="sec6"
                width="100px"
              />{" "}
              <span> </span>
              <img
                className="img-fluid"
                src="./Image/download3.png"
                alt="sec6"
                width="100px"
              />
            </div>

            <img
              className="img-fluid"
              src="./Image/downloadimg1.png"
              alt="sec6"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
