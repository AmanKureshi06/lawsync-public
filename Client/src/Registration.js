import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Registration() {
    document.title='Register - LawSync'
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const handleGoBack = () => {
        window.location.href = '/';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'email' ? value.toLowerCase() : value // Convert email to lowercase on change
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            return;
        }

        // Validate username
        if (!/^[A-Za-z\s]+$/.test(formData.username)) {
            toast.error('Name should contain only alphabets and spaces.', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Please enter a valid email address!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            return;
        }

        // Validate mobile number format
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(formData.mobileNumber)) {
            toast.error('Please enter a valid 10-digit mobile number!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register/user', {
                username: formData.username,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                password: formData.password,
            });

            toast.success(`User Registered Successfully!`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });

            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration Failed!', {
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
                    <Link to={'/'} className="text-decoration">
                        <h6 className="mb-5 custom-font font-weight-500 back-link" style={{ color: 'black', cursor: 'pointer' }} onClick={handleGoBack}>
                            <i className="fa-solid fa-arrow-left"></i> Back
                        </h6>
                    </Link>
                    <div>
                        <div className="card-body py-lg-5 px-md-5 login-form">
                            <h4 className="text-center custom-font login-h">Create an Account</h4>
                            {error && toast.error(error, {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                            })}
                            {success && toast.success(success, {
                                position: 'top-right',
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                            })}

                            <form onSubmit={handleSubmit}>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Full Name"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    <i className="fa-regular fa-user form-icon"></i>
                                </div>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        className="form-control"
                                        placeholder="Mobile Number"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        maxLength="10"
                                        required
                                    />
                                    <i className="fa-solid fa-mobile-screen-button"></i>
                                </div>
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
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <i className="fa-solid fa-lock"></i>
                                </div>
                                <div data-mdb-input-init className="form-outline mb-4">
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <i className="fa-solid fa-lock"></i>
                                </div>
                                <button
                                    type="submit"
                                    data-mdb-button-init
                                    data-mdb-ripple-init
                                    className="btn btn-primary btn-block mb-4 w-100"
                                >
                                    Register
                                </button>
                            </form>
                            <p className="my-lg-5 text-center account custom-font register-p">
                                Already have an account?{' '}
                                <Link to={'/login'} className="text-decoration font-weight-500">
                                    Login
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
