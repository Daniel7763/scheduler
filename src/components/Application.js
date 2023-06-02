import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment"

//---APPLICATION---
export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

useEffect(() => {
  const promise1 = axios.get("/api/days")
  const promise2 = axios.get("/api/appointments")
  const promise3 = axios.get("/api/interviewers")
  Promise.all([promise1, promise2, promise3])
  .then(all => {
    const days = all[0].data
    const appointments = all[1].data
    const interviewers = all[2].data
    setState(prev => ({...prev, days, appointments, interviewers}))
  });
}, []);


const dailyAppointments = [];



const appointmentList = dailyAppointments.map(appointment => (
  <Appointment 
    key={dailyAppointments.id} 
    id={dailyAppointments.id} 
    time={dailyAppointments.time} 
    interview={dailyAppointments.interview} 
  />

))

console.log(state.interviewers, "state.interviewers")
//---RETURN---
  return (
    
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />

        <hr className="sidebar__separator sidebar--centered" />
        
        <nav className="sidebar__menu">
          <DayList 
            days={state.days} 
            value={state.day} 
            onChange={setDay} 
          />
        </nav>
        
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">

        {appointmentList}

        <Appointment
          key="last"
          time="5pm"
        />
      </section>

    </main>
  );
};