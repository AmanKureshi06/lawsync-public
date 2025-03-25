import React, { useContext } from 'react'
import { content } from '../App';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import withAutoLogout from '../utils/withAutoLogout';

function AvailableAdvocates()
 {



    const Arr = [

        {
            id:1,
            url:"./image/available_lawyer_1.png",
            name:"Arlene McCoy",
            price:200
        },

        {
            id:2,
            url:"./image/available_lawyer_2.png",
            name:"Mirza",
            price:200
        },

        {
            id:3,
            url:"./image/available_lawyer_3.png",
            name:"Arlene McCoy",
            price:200
        },

        {
            id:4,
            url:"./image/available_lawyer_4.png",
            name:"Arlene McCoy",
            price:200
        }
        ,

        {
            id:4,
            url:"./image/available_lawyer_5.png",
            name:"Arlene McCoy",
            price:200
        }
        ,

        {
            id:4,
            url:"./image/available_lawyer_6.png",
            name:"Arlene McCoy",
            price:200
        }
        ,

        {
            id:4,
            url:"./image/available_lawyer_7.png",
            name:"Arlene McCoy",
            price:200
        }
        ,

        {
            id:4,
            url:"./image/available_lawyer_8.png",
            name:"Arlene McCoy",
            price:200
        }
        ,

        {
            id:4,
            url:"./image/available_lawyer_9.png",
            name:"Arlene McCoy",
            price:200
        }
        ,

        {
            id:4,
            url:"./image/available_lawyer_10.png",
            name:"Arlene McCoy",
            price:200
        }
        ,

        {
            id:4,
            url:"./image/available_lawyer_11.png",
            name:"Arlene McCoy",
            price:200
        }
        ,

        {
            id:12,
            url:"./image/available_lawyer_12.png",
            name:"Ravi",
            price:200
        }


    ] 

    return (
        <div>
            <Navbar/>
            <div className='d-flex justify-content-center'>

                <div className='col-12 col-lg-7'>

                    <h4 className='my-3'>Available Advocates</h4>

                    <div className='Availableimage p-4 d-flex justify-content-between  align-items-center'>

                        <div className='col-6 text-white '>
                            <h6>We earn your trust and are deligent your case.</h6>
                            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                        </div>

                        <div className='col-5 text-end'>
                            <button className='btn btn-light text-info'>Hire an Advocate</button>
                        </div>


                    </div>

                    <div className='Availableimage2'>

                        {
                            Arr.map((v)=>(
                                <div className='Availableimage2chiuld  border p-3'>
                                    <img src={v.url} alt='not found' height={80}/>

                                    <h6 className='my-2'>{v.name}</h6>

                                    <div className='my-1'>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-solid fa-star text-warning"></i>
                                    <i className="fa-regular fa-star"></i>

                                    <b className='ms-2'>(233 Reviews)</b>

                                    </div>
                                     
                                     <div>
                                        <h6>₹ {v.price} <span> /per hour</span></h6>
                                        
                                     </div>

                                     <p> There are many variations of passages of Lorem Ipsum available, but the majority...</p>

                                     <i className="fa-regular fa-comment"></i>
                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default withAutoLogout(AvailableAdvocates);
