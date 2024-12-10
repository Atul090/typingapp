import React from "react";
import './style.css'
const TypingTest = () => {
    const paragraph="Hi my name is adwfelorem l lorem  tul and you are in my typing simulation";
    return (
        <div className="container">
            <div className="test">
                {   
                    paragraph.split("").map((char,index)=>(
                        <span className="char">
                            {char}
                        </span>
                    ))
                }
            </div>
            <div className="result">
                <p>Time Left:</p>
                <p>Mistakes:</p>
                <p>WPM:</p>
                <p>CPM:</p>
                <button className="btn">Try Again</button>

            </div>
        </div>
    )
}

export default TypingTest