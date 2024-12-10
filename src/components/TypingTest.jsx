import React from "react";

const TypingTest = () => {
    const paragraph="Hi my name is adwfelorem l lorem  tul and you are in my typing simulation";
    return (
        <div>
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
                <button>Try Again</button>

            </div>
        </div>
    )
}

export default TypingTest