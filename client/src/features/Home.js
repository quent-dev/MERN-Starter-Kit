import React, { useState} from 'react'

export default function Home() {
    const [currentState, setCurrentState] = useState('')
    const [currentTime, setCurrentTime] = useState(0)
    const [countdownTime, setCountdownTime] = useState(0)
    const intervalRef = React.useRef()


  const onStart = () => {
    if (currentState === 'START') return
    setCurrentState('START')
    localStorage.setItem("timerStatus", currentState) 
    // chrome.storage.local.set({timerStatus: currentState})
    intervalRef.current = setInterval(() => {
      setCurrentTime((currentTime) => currentTime - 50)
    }, 50)
    // chrome.alarms.create("time-is-up", {
    //   when: Date.now() + (countdownTime * 60 * 1000)
    // })
  }

  const onSet = () => {
    if (currentState === 'START') return
    setCurrentTime(countdownTime * 60 * 1000)
  }

  const onStop = () => {
    if (currentState === 'STOP') return
    setCurrentState('STOP')
    localStorage.setItem("timerStatus", currentState)
    // chrome.storage.local.set({timerStatus: currentState})
    clearInterval(intervalRef.current)
    // chrome.alarms.clearAll();
  }

  
  const sec = Math.floor(currentTime / 1000)
  const min = Math.floor(sec / 60)
  const seconds =  (sec % 60).toString().padStart(2,"0")
  const minutes =  (min % 60).toString().padStart(2,"0")

  return (
    <>
        <main className='flex flex-col justify-center items-center'>
            <div className="my-10">
                <h1 className="text-xl">Surf the Urge!</h1>
                <p>Select the amount of time you want to stay focused for</p>
            </div>
            
            
            <div className="w-1/2 my-10 px-[5%] border-2 rounded-lg">
            <div className="my-5 flex flex-col justify-around items-center h-48">
                <label className="">Focus time: {countdownTime} minutes</label>
                <input type="range" min="1" max="20" value={countdownTime} onChange={(e) => setCountdownTime(parseInt(e.currentTarget.value))} className="border-2 float-right" />
                <button className="rounded bg-cyan-200 py-2 px-2" onClick={onSet}>Set focus time</button>
            </div>
            
            </div>

            <div className="flex flex-col justify-around items-center w-2/5">
                <div className="text-2xl rounded flex justify-center bg-gray-200 w-full ">
                <span>{minutes}</span>:<span>{seconds}</span>
                </div>
                <div className="w-1/2 my-5 flex justify-around ">
                <button className="rounded bg-green-200 py-2 px-2" onClick={onStart}>Start</button>
                <button className="rounded bg-red-300 py-2 px-2" onClick={onStop}>Stop</button>
                </div>
            
            </div>
            <p>You will receive a notification if you start focusing on something else or when the time is up</p>

        </main>
        
    </>
  )
}
