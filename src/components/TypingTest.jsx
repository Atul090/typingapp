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
    const [isTyping,setIsTyping]=useState(false);
    const inputRef=useRef([]);
    const charRefs=useRef(null)

    useEffect(()=>{
        inputRef.current.focus()
    },[])

    const handleChange = (e) =>{
        const characters = charRefs.current;
        const currentChar = charRefs.current[charIndex];
        let typedChar = e.target.value.slice(-1);
        if(charIndex<characters.length && timeLeft>0){
            if(!isTyping){
                setIsTyping(true);
            }
            if(typedChar === currentChar.textContent){
                setCharIndex(charIndex+1);
            } else {
                setCharIndex(charIndex+1);
                setMistakes(mistakes+1);
            }
            if(charIndex===characters.length-1) setIsTyping(false);
        } else {
            setIsTyping(false);
        }
    }

    return (
        <div className="container">
            <div className="test">
                <input type="text" className="input-field" ref={inputRef} onChange={handleChange}/>
                {   
                    paragraph.split("").map((char,index)=>(
                        <span className="char" ref={(e)=>charRefs.current[index]=e}>
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