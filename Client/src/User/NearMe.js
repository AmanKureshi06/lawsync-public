import React from 'react'

function NearMe() {
    document.title = 'Near Me - LawSync';
    return (
        <div>
            <div>
                <div className=" d-flex py-4">

                    <h4 className="col-12 col-lg-3 text-center fw-bold">Near Me</h4>

                </div>
            </div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777314.872995804!2d68.6848901800457!3d22.39949680100548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959051f5f0ef795%3A0x861bd887ed54522e!2sGujarat%2C%20India!5e0!3m2!1sen!2sus!4v1726604954254!5m2!1sen!2sus" width="100%" height="700px" style={{border:"0"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        </div>
    )
}

export default NearMe
