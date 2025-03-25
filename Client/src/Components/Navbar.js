import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import '../Style/Navbar.css'

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('role'));

  const location = useLocation();

  // Helper function to check if the link is active
  const isActive = (path) => location.pathname === path;

  const handleUserDashboard = () => {
    navigate('/usereditprofile'); // Replace with your desired route for the user dashboard
  };

  const handleLawyerDashboard = () => {
    navigate('/profile'); // Replace with your desired route for the lawyer dashboard
  };
  const handleAdminDashboard = () => {
    navigate('/admin/dashboard'); // Replace with your desired route for the lawyer dashboard
  };


  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  useEffect(() => {
    // Check the initial login status when the component mounts
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
      setIsLoggedIn(true);
    }

    // Listen for changes to localStorage (when login/logout happens in other tabs)
    const handleStorageChange = () => {
      const userEmail = localStorage.getItem("userEmail");
      setIsLoggedIn(!!userEmail);  // If userEmail exists, the user is logged in
    };

    // Attach the event listener
    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    // Clear the localStorage on logout
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role"); // If you store roles, remove them too
    setIsLoggedIn(false); // Update the state
    navigate('/login');
    toast.error('Logged Out Successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  return (
    <div>
      {/* <button onClick={handleLogout} className="btn btn-danger px-4">
        Logout
      </button> */}
      {!isLoggedIn ? (
        <nav className="navbar navbar-expand-lg text-white" style={{ background: "#09193c" }}>

          <div className="container-fluid row">
            <div
              className=" col-lg-4 col-12 d-flex   justify-content-between">
              <Link to={'/'}>
                {/* <a className="navbar-brand"> */}
                <img className="img-fluid" height="100px" width="100px"
                  src="/Image/1.png"
                  alt="Logo" />
              </Link>
              {/* </a> */}

              <button className="navbar-toggler text-white" type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                {/* <span className="navbar-toggler-icon"></span>  */}
                <i className="fa-solid fa-bars-staggered text-white"></i>
              </button>
            </div>

            <div className="collapse navbar-collapse  col-4"
              id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle  text-white"
                    href="#"
                    id="navbarDropdown" role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    Categories
                  </a>
                  <ul className="dropdown-menu "
                    aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item "
                      href="#">Action</a></li>
                    <li><a className="dropdown-item "
                      href="#">Another
                      action</a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item"
                      href="#">Something
                      else here</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className={`nav-link ${isActive("/") ? "active" : ""}`} aria-current="page"
                    href="#">Home</a>
                </li>
                <li className="nav-item">
                  <Link to={"/nearme"} className={`nav-link text-white ${isActive("/nearme") ? "active" : ""}`}>Near Me</Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link text-white"
                    href="/postjob" tabIndex="-1"
                  >Post a Job</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white"
                    href="/available" tabIndex="-1"
                  >Available Advocates </a>
                </li>
              </ul>
              <div className="d-flex align-items-center gap-4">

                {/* <div>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div> */}
                <Link to="/register" className="text-white">
                  <button className="btn btn-primary px-4 get-started">Get Started</button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        role === 'user' ? (
          <nav className="navbar navbar-expand-lg text-white" style={{ background: "#09193c" }}>

            <div className="container-fluid row">
              <div
                className=" col-lg-4 col-12 d-flex   justify-content-between">
                <Link to={'/'}>
                  {/* <a className="navbar-brand"> */}
                  <img className="img-fluid" height="100px" width="100px"
                    src="/Image/1.png"
                    alt="Logo" />
                </Link>
                {/* </a> */}

                <button className="navbar-toggler text-white" type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  {/* <span className="navbar-toggler-icon"></span>  */}
                  <i className="fa-solid fa-bars-staggered text-white"></i>
                </button>
              </div>

              <div className="collapse navbar-collapse  col-4"
                id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle  text-white"
                      href="#"
                      id="navbarDropdown" role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Categories
                    </a>
                    <ul className="dropdown-menu "
                      aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item "
                        href="#">Action</a></li>
                      <li><a className="dropdown-item "
                        href="#">Another
                        action</a>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item"
                        href="#">Something
                        else here</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page"
                      href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <Link to={"/nearme"} className="nav-link text-white"  >Near Me</Link>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link text-white"
                      href="/available" tabIndex="-1"
                    >Available Advocates</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white"
                      href="/postjob" tabIndex="-1"
                    >Post a Job</a>
                  </li>
                </ul>
                <div className="d-flex align-items-center gap-4">

                  {/* <div>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div> */}

                  <button onClick={handleUserDashboard} className="btn btn-primary px-4">
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className="btn btn-danger px-4">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        ) : role === 'lawyer' ? (
          <nav className="navbar navbar-expand-lg text-white" style={{ background: "#09193c" }}>

            <div className="container-fluid row">
              <div
                className=" col-lg-4 col-12 d-flex   justify-content-between">
                <Link to={'/'}>
                  {/* <a className="navbar-brand"> */}
                  <img className="img-fluid" height="100px" width="100px"
                    src="/Image/1.png"
                    alt="Logo" />
                </Link>
                {/* </a> */}

                <button className="navbar-toggler text-white" type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  {/* <span className="navbar-toggler-icon"></span>  */}
                  <i className="fa-solid fa-bars-staggered text-white"></i>
                </button>
              </div>

              <div className="collapse navbar-collapse  col-4"
                id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle  text-white"
                      href="#"
                      id="navbarDropdown" role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      Categories
                    </a>
                    <ul className="dropdown-menu "
                      aria-labelledby="navbarDropdown">
                      <li><a className="dropdown-item "
                        href="#">Action</a></li>
                      <li><a className="dropdown-item "
                        href="#">Another
                        action</a>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><a className="dropdown-item"
                        href="#">Something
                        else here</a></li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page"
                      href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <Link to={"/profile/wallet"} className="nav-link text-white">My Wallet</Link>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link text-white"
                      href="/user/chat" tabIndex="-1"
                    >Messages</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white"
                      href="/profile" tabIndex="-1"
                    >Edit Profile</a>
                  </li>
                </ul>
                <div className="d-flex align-items-center gap-4">

                  {/* <div>
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div> */}
                  <button onClick={handleLawyerDashboard} className="btn btn-primary px-4">
                    Dashboard
                  </button>
                  <button onClick={handleLogout} className="btn btn-danger px-4">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          role === 'admin' ? (
            <nav className="navbar navbar-expand-lg text-white" style={{ background: "#09193c" }}>

              <div className="container-fluid row">
                <div
                  className=" col-lg-4 col-12 d-flex   justify-content-between">
                  <Link to={'/'}>
                    {/* <a className="navbar-brand"> */}
                    <img className="img-fluid" height="100px" width="100px"
                      src="/Image/1.png"
                      alt="Logo" />
                  </Link>
                  {/* </a> */}

                  <button className="navbar-toggler text-white" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    {/* <span className="navbar-toggler-icon"></span>  */}
                    <i className="fa-solid fa-bars-staggered text-white"></i>
                  </button>
                </div>

                <div className="collapse navbar-collapse  col-4"
                  id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle  text-white"
                        href="#"
                        id="navbarDropdown" role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Categories
                      </a>
                      <ul className="dropdown-menu "
                        aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item "
                          href="#">Action</a></li>
                        <li><a className="dropdown-item "
                          href="#">Another
                          action</a>
                        </li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item"
                          href="#">Something
                          else here</a></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link " aria-current="page"
                        href="/">Home</a>
                    </li>
                    {/* <li className="nav-item">
                      <Link to={"/nearme"} className="nav-link text-white"  >Near Me</Link>
                    </li> */}

                    <li className="nav-item">
                      <a className="nav-link text-white"
                        href="/admin/dashboard" tabIndex="-1"
                      >Admin Dashboard</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link text-white"
                        href="/admin/manage/lawyers" tabIndex="-1"
                      >Manage Lawyers</a>
                    </li>
                  </ul>
                  <div className="d-flex align-items-center gap-4">

                    {/* <div>
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </div> */}


                    <button onClick={handleAdminDashboard} className="btn btn-primary px-4">
                      Dashboard
                    </button>
                    <button onClick={handleLogout} className="btn btn-danger px-4">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </nav>
          ) : null
        )
      )}


    </div>
  )
}

export default Navbar
