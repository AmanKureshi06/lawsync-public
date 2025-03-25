import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import withNoAuthProtection from './utils/withNoAuthProtection';
import { toast } from 'react-toastify';
import { Eye, EyeClosed } from 'lucide-react';
// import { checkLogout } from './utils/checkLogout';


function Login() {
    document.title = 'Login - LawSync'
    localStorage.setItem('loginTimestamp', new Date().getTime()); // Set the login timestamp

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPasswords, setShowPasswords] = useState({ currentPassword: false });
    const navigate = useNavigate();

    // Handle Go Back navigation
    const handleGoBack = () => {
        window.location.href = '/';
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'email' ? value.toLowerCase() : value // Ensure email is always lowercase
        }));
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const userEmail = localStorage.getItem('userEmail');
            const userRole = localStorage.getItem('role');

            if (userEmail) {
                if (userRole === 'user') navigate('/usereditprofile');
                else if (userRole === 'lawyer') navigate('/profile');
                else if (userRole === 'admin') navigate('/admin/dashboard');
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const normalizedData = {
            email: formData.email.trim().toLowerCase(),
            password: formData.password.trim(),
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', normalizedData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 403) {
                toast.error('Your account is banned. Please contact support.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                });
                return;
            }

            const { role } = response.data;
            localStorage.setItem('userEmail', normalizedData.email);
            localStorage.setItem('role', role);
            localStorage.setItem('loginTimestamp', new Date().getTime()); // Set the login timestamp here

            toast.success('Logged in Successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });

            setTimeout(() => {
                if (role === 'user') navigate('/usereditprofile');
                else if (role === 'lawyer') navigate('/profile');
                else if (role === 'admin') navigate('/admin/dashboard');
            }, 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    };


    return (
        <div>
            <div className="d-flex flex-wrap align-items-center gap-5">
                <div className="col-12 col-lg-7 login-img1 mobile-none">
                    <img className="img-fluid login-child" src="./Image/Login 1.png" alt="not found" />
                    <div className="login-imgchild container d-flex justify-content-center">
                        <h1 className="col-7 text-white custom-font font-weight-300">
                            We earn your <span className="text-info">trust</span> and are diligent with your case.
                        </h1>
                        <img className="col-3" src="./Image/1.png" alt="not found" />
                    </div>
                </div>
                <div className="col-12 col-lg-3 col-lg-3 mb-5 mb-lg-0">
                    <div className="text-decoration">
                        <h6 className="mb-5 custom-font font-weight-500 back-link" style={{ color: 'black', cursor: 'pointer' }} onClick={handleGoBack}>
                            <i className="fa-solid fa-arrow-left"></i> Back
                        </h6>
                    </div>
                    <div>
                        <div className="card-body py-lg-5 px-md-5 login-form">
                            <h4 className="text-center custom-font login-h">Login</h4>
                            <form onSubmit={handleSubmit}>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <i className="fa-regular fa-envelope"></i>
                                </div>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type={showPasswords.currentPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => togglePasswordVisibility("currentPassword")}
                                        style={{
                                            position: "absolute",
                                            right: "10px",
                                            top: "50%",
                                            transform: "translateY(-50%)",
                                            background: "none",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {showPasswords.currentPassword ? <Eye /> : <EyeClosed />}
                                    </button>
                                    <i className='fa fa-lock' />
                                </div>
                                <p className="text-center">
                                    <a href="./Forget.html" className="custom-font text-decoration font-weight-500" style={{ fontSize: '13px' }}>
                                        Forgot Password?
                                    </a>
                                </p>
                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4 w-100">
                                    Login
                                </button>
                                <div className="text-center">
                                    <p className="mt-3">OR Login with:</p>
                                    {/* Add your social login buttons here */}
                                </div>
                            </form>
                            <p className="my-lg-5 text-center account custom-font login-p">
                                Don't have an account? <Link to={'/register'} className="text-decoration font-weight-500">Register</Link> .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withNoAuthProtection(Login);
