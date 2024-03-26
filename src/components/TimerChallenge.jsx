import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}){
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)
    
    const timer = useRef(null) 
    const dialog = useRef(null)

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

    if (timeRemaining <= 0) {
        clearInterval(timer.current)
        dialog.current.open()
    }

    function handleReset(){
        setTimeRemaining(targetTime * 1000)

    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevVal => prevVal - 10)
        }, 10);
    }

    function handleStop(){
        clearInterval(timer.current)
        dialog.current.open()
    }

    return (
        <>  
            <ResultModal targetTime={targetTime} remainingTime={timeRemaining} ref={dialog} onReset={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ?  "s": ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive ? "Stop Challenge" : "Start Challenge"}
                    </button>
                </p>
                <p className={timerIsActive ? "active": ""}>
                    {timerIsActive ? "Time is running" : "Time stopped"}
                </p>
            </section>
        </>
    )
}