import React, { useEffect, useRef, useState } from "react";
import './style.css'

const paragraph="Mastery is not built in moments of comfort but in the quiet hours of relentless effort and unwavering discipline. Every mistake is a lesson, a piece of the puzzle that sharpens your craft. The key to growth lies in embracing discomfort, for it is there that true resilience is forged. Focus your energy, press forward with precision, and let every challenge be a stepping stone toward excellence. Remember, success is not a destination but the cumulative result of small, deliberate actions taken daily. The journey to greatness begins with the decision to never settle for mediocrity";

const TypingTest = () => {

    const maxTime=60;
    const [timeLeft,setTimeLeft]=useState(maxTime);
    const [mistakes,setMistakes]=useState(0);
    const [WPM,setWPM]=useState(0);
    const [CPM,setCPM]=useState(0);
    const [charIndex,setCharIndex]=useState(0);
    const [isTyping,setIsTyping]=useState(false);
    const inputRef=useRef(null);
    const charRefs=useRef([]);
    const [correctWrong,setCorrectWrong]=useState([]);

    useEffect(()=>{
        inputRef.current.focus()
    },[])

    const handleChange = (e) =>{
        const characters = charRefs.current;
        let currentChar = charRefs.current[charIndex];
        let typedChar = e.target.value.slice(-1);
        if(charIndex<characters.length && timeLeft>0){
            if(!isTyping){
                setIsTyping(true);
            }
            if(typedChar === currentChar.textContent){
                setCharIndex(charIndex+1);
                correctWrong[charIndex]=" correct "
            } else {
                setCharIndex(charIndex+1);
                setMistakes(mistakes+1);
                correctWrong[charIndex]=" wrong "
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
                        //adding active class
                        <span className={`char ${index === charIndex ? "active": "" } ${correctWrong[index]}`} ref={(e)=>charRefs.current[index]=e}>
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