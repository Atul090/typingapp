import React, { useEffect, useRef, useState } from "react";
import './style.css'

const paragraph="Hi my name is adwfelorem l lorem  tul and you are in my typing simulation";

const TypingTest = () => {

    const maxTime=60;
    const [timeLeft,setTimeLeft]=useState(maxTime);
    const [mistakes,setMistakes]=useState(0);
    const [WPM,setWPM]=useState(0);
    const [CPM,setCPM]=useState(0);
    const [charIndex,setCharIndex]=useState(0);
    const [isTyping,setIsTypinf]=useState(false);
    const inputRef=useRef();

    useEffect(()=>{
        inputRef.current.focus()
    },[])

    return (
        <div className="container">
            <div className="test">
                <input type="text" className="input-field" ref={inputRef} onChange={handleChange}/>
                {   
                    paragraph.split("").map((char,index)=>(
                        <span className="char">
                            {char}
                        </span>
                    ))
                }
            </div>
            <div className="result">
                <p>Time Left: <strong>{timeLeft}</strong> </p>
                <p>Mistakes: <strong>{mistakes}</strong> </p>
                <p>WPM: <strong>{WPM}</strong> </p>
                <p>CPM: <strong>{CPM}</strong> </p>
                <button className="btn">Try Again</button>

            </div>
        </div>
    )
}

export default TypingTest