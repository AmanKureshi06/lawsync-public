import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <footer>
        <div className="d-flex justify-content-center">
          <div className="col-12 col-lg-8 row  gap-5 pt-5 pb-3">
            <div className="col-12 col-lg-6 col-xl-4 ">
              <img
                className="img-fluid"
                src="/Image/2.png"
                alt="Logo"
                width="120px"
              />

              <div className="d-flex custom-font font-weight-300">
                <p className="my-4 col-12 col-xl-9">
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. it has roots in a piece of classical Latin literature.
                </p>
              </div>
              <Link to={"/lawyer/register"} style={{ textDecoration: "none" }}>
                <button
                  className="btn btn-primary"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "13px",
                  }}
                >
                  Become a Service Provider
                </button>
              </Link>
            </div>

            <div className="row col-12 col-lg-4 col-xl-4 justify-content-lg-end">
              <div className="col-6">
                <h6
                  className="my-3"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                  }}
                >
                  Quick Links
                </h6>

                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                  }}
                >
                  <Link
                    to={"/postjob"}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    Post a Job
                  </Link>
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                  }}
                >
                  <Link
                    to={"/lawyer/register"}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    Become a Service Provider
                  </Link>
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                  }}
                >
                  <Link
                    to={"/feecal"}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    Fee Calculator
                  </Link>
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                  }}
                >
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    New Features
                  </Link>
                </p>
              </div>

              <div className="col-6 ">
                <h6
                  className="my-3"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "15px",
                  }}
                >
                  Support
                </h6>

                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                  }}
                >
                  <Link
                    to={"/contact"}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    Contact Us
                  </Link>
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                  }}
                >
                  <Link
                    to={"/about"}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    About Us
                  </Link>
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                  }}
                >
                  <Link
                    to={"/terms"}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    Terms & Conditions
                  </Link>
                </p>
                <p
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "11px",
                  }}
                >
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    Careers
                  </Link>
                </p>
              </div>
            </div>

            <div className="col-12  col-xxl-3 ">
              <h6
                className="my-3"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                }}
              >
                Social
              </h6>

              <div className="mt-3 d-flex gap-2 icon-group">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <i
                    className="fa-brands fa-facebook-f"
                    style={{ cursor: "pointer" }}
                  ></i>
                </a>
                <a
                  href="https://linkedin.com/company/techaxis-solutions"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <i
                    className="fa-brands fa-linkedin-in"
                    style={{ cursor: "pointer" }}
                  ></i>
                </a>
                <a
                  href="https://linkedin.com/company/techaxis-solutions"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <i
                    className="fa-brands fa-twitter"
                    style={{ cursor: "pointer" }}
                  ></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <i
                    className="fa-brands fa-instagram"
                    style={{ cursor: "pointer" }}
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-center"
          style={{ fontFamily: "Poppins, sans-serif", color: "#7d8994" }}
        >
          <p className="col-8 text-center border-top py-4">
           &#169; {currentYear} TechAxis Solutions. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
