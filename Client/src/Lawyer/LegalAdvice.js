import React, { useContext, useEffect, useRef, useState } from 'react'
import { content } from '../App';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function LegalAdvice() {

    const { Arr } = useContext(content);

    const ref1 = useRef();
    const [dataobj, setdataobj] = useState();
    const [message, setmessage] = useState()
    const [messageARR, setmessageARR] = useState([]);
    const [date, setdate] = useState(new Date());
    const refMessage = useRef();
    const navi = useNavigate();


    useEffect(() => {
        ref1.current.style.display = "none";

        const time = setInterval(()=>{

            setdate(new Date())
        },1000);

        return ()=>clearInterval(time)

    }, [])

    function handlemesge(id) {
        if (ref1.current.style.display == "none") {
            ref1.current.style.display = "block"
        }


        const obj = Arr.find((v) => {
            return v.id == id
        })

        setdataobj(obj)

    }

    const handleclose = () => {
        ref1.current.style.display = "none"
    }



    function handleMesge() {

        if (!message) 
        {
              return;
        }

        else {
            setmessageARR([...messageARR, { name: message, data : date.toLocaleTimeString()}])
        }

        setmessage("")

        if (refMessage.current) {
            refMessage.current.scrollTop = refMessage.current.scrollHeight;
        }
    }


    const handleView = (id) => {
        navi("/Advocates/" + id)
    }

    console.log(date)


    return (
        <div>
            <Navbar/>
            <div className='d-flex justify-content-center'>

                <div className='col-12 col-lg-8'>

                    <h4 className='my-3'>Legal Advice Advocate</h4>

                    <div className='LegalAdvice p-4 d-flex justify-content-between  align-items-center'>

                        <div className='col-6 text-white '>
                            <h6>We earn your trust and are deligent your case.</h6>
                            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard.</p>
                        </div>

                        <div className='col-5 text-end'>
                            <button className='btn btn-light text-info'>Hire an Advocate</button>
                        </div>


                    </div>

                    <div className=' LegalAdvice2 my-5 position-relative'>
                        {
                            Arr.map((v) => (
                                <div key={v.id} className='LegalAdvice2child p-2 border rounded-3'>

                                    <div className='d-flex gap-2'>
                                        <img className='object-fit-cover w-25 p-2' src={v.url} alt="" />

                                        <div className=''>

                                            <h6 className=''>{v.name}</h6>

                                            <i className="fa-solid fa-star text-warning"></i>
                                            <i className="fa-solid fa-star text-warning"></i>
                                            <i className="fa-solid fa-star text-warning"></i>
                                            <i className="fa-solid fa-star text-warning"></i>
                                            <i className="fa-regular fa-star"></i>

                                            <b className='ms-2'>(233 Reviews)</b>

                                            <p>₹ {v.price} / per hour</p>

                                        </div>
                                    </div>

                                    <p className='text-secondary'>There are many variations of passages of Lorem Ipsum available, but the majority....</p>

                                    <div className="d-flex gap-2">
                                        <button className="btn btn-secondary col btn-sm" type="button" onClick={() => { handleView(v.id) }}>View Details</button>
                                        <button className="btn btn-primary col btn-sm" type="button">Book Video Call</button>
                                    </div>


                                    <i className="fa-regular fa-comment" onClick={() => { handlemesge(v.id) }}></i>
                                </div>
                            ))
                        }

                        <div className='messagemain position-absolute' ref={ref1}>

                            <div className='d-flex border p-2 justify-content-between'>
                                <div className=''>
                                    <img src={dataobj && dataobj.url} alt="" width={30} />
                                    <b className='fs-6 mx-3'>{dataobj && dataobj.name}</b>
                                </div>

                                <button className='border' onClick={handleclose}>
                                    X
                                </button>
                            </div>

                            <div className='messageChild px-1 p-4' ref={refMessage}>
                                {
                                    messageARR && messageARR.map((v) => (
                                        <div>
                                            {/* <h5>your output</h5> */}
                                            <h5 className='my-3 '> <span className='p-1 rounded'>{v.name}</span> <br/> <span className='bg-dark text-white'>{v.data}</span> </h5>
                                        </div>
                                    ))
                                }

                            </div>

                            <div className='messageChild2 p-3 d-flex'>

                                <input className='form-control' type="text" value={message} onChange={(e) => { setmessage(e.target.value) }} />
                                <button className='btn btn-primary btn-sm mx-1' onClick={handleMesge}>send</button>

                            </div>

                        </div>

                    </div>


                </div>

            </div>
            <Footer/>
        </div>
    )
}

export default LegalAdvice;
