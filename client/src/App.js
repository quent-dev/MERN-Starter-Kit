import React, { useEffect, useState } from 'react'
import FeatureOne from './features/FeatureOne';
import FeatureTwo from './features/FeatureTwo';
import NavBar from './features/NavBar';
import { Routes, Route } from 'react-router-dom';
import Layout from './features/Layout';
import APIService from './services/apiService';
// import MainPage from 'features/MainPage';


const App = () => {

  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // const [formData, setFormData] = useState([]);
  const [currentState, setCurrentState] = useState('')
  const [currentTime, setCurrentTime] = useState(0)
  const [countdownTime, setCountdownTime] = useState(0)
  const intervalRef = React.useRef()

  // // Fetch events from server
  // const fetchData = async () => {
  //   // Database data from server
  //   const response = await APIService.getAllExamples();
  //   setData(response.data);
  // }
  
  // // Fetch the data on page load, don't set loading to false until data's fetched.
  // useEffect(() => {
  //   setLoading(true);
  //   fetchData()
  //   .then(setLoading(false)).catch(setLoading(false));
  // }, [])


  // /* Handle Data Changes */
  // const handleChangeInForm = (e) => {
  //   // Set the target state to the new form field value
  //   const {name, value} = e.target;
  //   setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  // }

  // /* Data Submission */
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Example
  //   try {
  //     // Axios automatically serializes object to JSON
  //     // https://masteringjs.io/tutorials/axios/post-json
  //     const response = await APIService.createExample(formData);
  //   } catch (err) {
  //     return
  //   }

  //   // Re-fetch data after addition
  //   fetchData();
  // }

  // /* Data Deletion */
  // const handleDelete = async (event, idToDelete) => {
  //   try {
  //     const response = await APIService.deleteExample(idToDelete);
  //   } catch (err) {
  //     return
  //   }

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


  //   // Re-fetch data after delete
  //   fetchData();
  

  // // Render nothing while fetching for data from server
  // if (loading) return null;

  return (
    <div className="">
      <NavBar />

      <main className="mx-[10%] text-center flex flex-col justify-center">
        <Layout />

        {/* <Routes>
          <Route index element={<MainPage/ >}></Route>
          <Route path="one" element={<FeatureOne />}></Route>
          <Route path="two" element={<FeatureTwo />}></Route>
        </Routes> */}

        <div className="mx-[20%] mt-10 px-[5%] border-2">
          <div className="mt-10 overflow-auto">
            <label className="float-left">Focus time:</label>
            <input type="range" min="1" max="20" value={countdownTime} onChange={(e) => setCountdownTime(parseInt(e.currentTarget.value))} className="border-2 float-right" />
          </div>
          <button className="my-10" onClick={onSet}>Set focus time</button>
        </div>

        <div className="card">
        <div className="timer">
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <button onClick={onStart}>Start</button>
        <button onClick={onStop}>Stop</button>
      </div>
      <p>You will receive a notification if you start focusing on something else or when the time is up</p>
      </main>

    </div>
  )
}

export default App