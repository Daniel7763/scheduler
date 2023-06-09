import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import "components/Application.scss";
import DayList from 'components/DayList';
import Appointment from "components/Appointment"
import {getInterview, getAppointmentsForDay, getInterviewersForDay} from "helpers/selectors"

//---APPLICATION COMPONENT---
export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //setDay Function
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

  // bookInterview Function
  function bookInterview(id, interview) {

    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    return axios.put(`/api/appointments/${id}`, { interview })
    .then(response => {
      setState({
        ...state,
        appointments
      });
    })

    // .catch(error => {
    //   // Handle error if the request fails
    //   console.log(error);
    // });
  }
  
  //appointments
  const appointments = getAppointmentsForDay(state, state.day);

  // //cancel interview
  // function cancelInterview(state, interview){
  
  //   transition(DELETING, true);
  //   props
  //     .cancelInterview(props.id)
  //     .then(() => {
  //       transition(EMPTY);
  //     })
  // }


  //cancel interview
  function cancelInterview(id, interview) {

    return axios.delete(`/api/appointments/${id}`, { interview })
    .then(response => {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
      setState(prev => ({
        //use ...prev instead of ...state to avoid bugs
        ...prev, 
        appointments
      }))

      // .catch(error => {
      //   // Handle error if the request fails
      //   console.log(error);
      // });
    });
  }
  
  //appointment List
  const appointmentList = appointments.map((appointment) => {
    console.log("-----appointment------", appointment)
    const interview = getInterview(state, appointment.interview);
    


    const interviewers = getInterviewersForDay(state, state.day)
  
    return (
      <Appointment
        key = {appointment.id}
        id = {appointment.id}
        time = {appointment.time}
        interview = {interview}
        interviewers = {interviewers}
        bookInterview = {bookInterview}
        cancelInterview = {cancelInterview}
      />
    );
  });





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

