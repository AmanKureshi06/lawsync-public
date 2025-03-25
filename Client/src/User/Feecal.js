import React, { useState } from "react";
import "../Style/Feecal.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const FeeCalculator = () => {
    const [fee, setFee] = useState(40);
    const [time, setTime] = useState(0);

    const flatFee = fee;
    const serviceFee = (fee * 0.15).toFixed(2);
    const processingFee = 2;
    const extra = fee > 40 ? ((fee - 40) * 0.05).toFixed(2) : 0;
    const total = (
        parseFloat(flatFee) +
        parseFloat(serviceFee) +
        parseFloat(processingFee) +
        parseFloat(extra)
    ).toFixed(2);

    return (
        <>
        <Navbar/>
            <div className="fee-calculator">
                <h2 className="title">Free Calculator</h2>
                <div className="total-amount">${total}</div>
                <p className="total-label">Total Amount</p>
                <div className="input-section">
                    <label>Enter Fee Amount</label>
                    <input
                        type="number"
                        value={fee}
                        onChange={(e) => setFee(Number(e.target.value))}
                    />
                </div>
                <div className="slider-section">
                    <label>Increase Time</label>
                    <input
                        type="range"
                        min="0"
                        max="150"
                        step="30"
                        value={time}
                        onChange={(e) => setTime(Number(e.target.value))}
                    />
                    <div className="time-labels">
                        <span>0 min</span>
                        <span>30 min</span>
                        <span>60 min</span>
                        <span>90 min</span>
                        <span>120 min</span>
                        <span>150 min</span>
                    </div>
                </div>
                <div className="breakdown">
                    <div className="row feecal">
                        <span>Flat Fee</span>
                        <span>${flatFee}</span>
                    </div>
                    <div className="row feecal">
                        <span>Service Fee (15%)</span>
                        <span>${serviceFee}</span>
                    </div>
                    <div className="row feecal">
                        <span>Processing Fee</span>
                        <span>${processingFee}</span>
                    </div>
                    <div className="row feecal">
                        <span>Extra (5% above $40)</span>
                        <span>${extra}</span>
                    </div>
                    <div className="row feecal total">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                </div>
                <button className="calculate-button">Calculate</button>
            </div>
            <Footer/>
        </>
    );
};

export default FeeCalculator;
