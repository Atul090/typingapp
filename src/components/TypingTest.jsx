import React, { useEffect, useRef, useState } from "react";
import './style.css'

// Split text into words and join with single spaces
const words = "the quick brown fox jumps over the lazy dog wrist brazil judge quiz box fight when major grant prepare quick launch butter paper salt water music rhythm perfect sound grace space light dark force power speed agile craft build trust faith hope love peace calm mind focus sharp clear view path goal dream wish plan work rest play life time flow ease".split(" ");

const getRandomWords = (count) => {
    const selectedWords = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        selectedWords.push(words[randomIndex]);
    }
    return selectedWords.join(" ");
};

const TypingTest = () => {
    const maxTime = 60;
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [mistakes, setMistakes] = useState(0);
    const [WPM, setWPM] = useState(0);
    const [CPM, setCPM] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [currentText, setCurrentText] = useState(getRandomWords(20));
    const inputRef = useRef(null);
    const charRefs = useRef([]);
    const [correctWrong, setCorrectWrong] = useState([]);

    useEffect(() => {
        setCorrectWrong(Array(currentText.length).fill(''));
        charRefs.current = charRefs.current.slice(0, currentText.length);
        inputRef.current.focus();
    }, [currentText]);

    useEffect(() => {
        let interval;
        if (isTyping && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                let correctChars = charIndex - mistakes;
                let totalTime = maxTime - timeLeft;

                let cpm = correctChars * (60 / totalTime);
                cpm = cpm < 0 || !cpm || cpm === Infinity ? 0 : cpm;
                setCPM(parseInt(cpm, 10));

                let wpm = Math.round((correctChars / 5) / (totalTime / 60));
                wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                setWPM(wpm);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(interval);
            setIsTyping(false);
            setIsFinished(true);
        }
        return () => {
            clearInterval(interval);
        }
    }, [isTyping, timeLeft, charIndex, mistakes]);

    const resetGame = () => {
        setIsTyping(false);
        setIsFinished(false);
        setCPM(0);
        setTimeLeft(maxTime);
        setWPM(0);
        setMistakes(0);
        setCharIndex(0);
        setCurrentText(getRandomWords(20));
        setCorrectWrong(Array(currentText.length).fill(''));
        inputRef.current.value = '';
        inputRef.current.focus();
    }

    const handleChange = (e) => {
        const typedChar = e.target.value;
        
        if (charIndex < currentText.length && timeLeft > 0) {
            // Start the timer
            if (!isTyping) {
                setIsTyping(true);
            }

            // Check each character typed
            const newCorrectWrong = [...correctWrong];
            let newMistakes = mistakes;
            let newCharIndex = charIndex;

            // Compare the entire typed text with the current text up to the typed length
            for (let i = 0; i < typedChar.length; i++) {
                if (currentText[i] !== typedChar[i]) {
                    newCorrectWrong[i] = " wrong ";
                    if (!correctWrong[i]) { // Only count as mistake if not already marked
                        newMistakes++;
                    }
                } else {
                    newCorrectWrong[i] = " correct ";
                }
            }

            // Update state
            setCharIndex(typedChar.length);
            setMistakes(newMistakes);
            setCorrectWrong(newCorrectWrong);

            // Check if reached end of text
            if (typedChar.length === currentText.length) {
                setCurrentText(getRandomWords(20));
                e.target.value = '';
                setCharIndex(0);
            }
        } else {
            setIsTyping(false);
            setIsFinished(true);
        }
    }

    const accuracy = Math.max(0, Math.min(100, Math.round(((charIndex - mistakes) / Math.max(charIndex, 1)) * 100))) || 0;

    return (
        <div className="container">
            <header>
                <h1>Speed Typing Test</h1>
                <p>Test your typing speed and accuracy</p>
            </header>

            <div className="test">
                <input 
                    type="text" 
                    className="input-field" 
                    ref={inputRef} 
                    onChange={handleChange}
                    placeholder="Start typing to begin..."
                    spellCheck="false"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                />
                <div className="text-display">
                    {currentText.split("").map((char, index) => (
                        <span 
                            key={index} 
                            className={`char ${index === charIndex ? "active" : ""} ${correctWrong[index]}`}
                            ref={(e) => charRefs.current[index] = e}
                        >
                            {char === " " ? "␣" : char}
                        </span>
                    ))}
                </div>
            </div>

            <div className="result">
                <p>Time Left <strong>{timeLeft}s</strong></p>
                <p>Speed <strong>{WPM} WPM</strong></p>
                <p>Accuracy <strong>{accuracy}%</strong></p>
                <p>Mistakes <strong>{mistakes}</strong></p>
            </div>

            {(isFinished || timeLeft === 0) && (
                <div className="result final-result">
                    <h2>Test Complete!</h2>
                    <p>Final Speed: <strong>{WPM} WPM</strong></p>
                    <p>Accuracy: <strong>{accuracy}%</strong></p>
                    <p>Total Mistakes: <strong>{mistakes}</strong></p>
                </div>
            )}

            <button className="btn" onClick={resetGame}>
                {isFinished ? 'Try Again' : 'Reset'}
            </button>
            add the right timer andf the backsace fucntionality
            <footer>
                <p>Practice regularly to improve your typing speed and accuracy!</p>
            </footer>
        </div>
    )
}

export default TypingTest