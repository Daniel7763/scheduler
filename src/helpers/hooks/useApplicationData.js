import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  //state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //setDay
  const setDay = day => setState(prev => ({ ...prev, day }));

  //bookInterview function
  function bookInterview(id, interview) {

    // console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState(prev => ({
      ...prev,
      appointments
    }));

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
        updateSpots(appointments);
      });
  }

  // return axios
  // .put(`/api/appointments/${id}`, {
  //   interview: appointment.interview,
  // })
  // .then((resp) => {
  //   setState({
  //     ...state,
  //     appointments,
  //     days,
  //   });
  // });

  //cancelInterview function
  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`)
    .then(response => {

      const appointment = {
        ...state.appointments[id],
        interview: null
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
  
  //     setState(prev => ({
  //       //use ...prev instead of ...state to avoid bugs
  //       ...prev, 
  //       appointments: {
  //         ...prev.appointments,
  //         [id]: appointment
  //       }
  //     }))

  //     updateSpots(appointments);
  //   });
  // }

    setState(prev => ({
      ...prev,
      appointments: {
        ...prev.appointments,
        [id]: appointment
      }
    }));
    updateSpots(appointments);
  });
}

  //useEffect - AXIOS
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
      // updateSpots(appointments);
    });
    
  }, []);

  //updateSpots
  function updateSpots(appointments) {
    const days = state.days.map((day) => {
      const spots = day.appointments.filter(
        (appointmentId) => !appointments[appointmentId].interview
      ).length;
  
      return {
        ...day,
        spots
      };
    });
  
    setState((prev) => ({
      ...prev,
      days,
      appointments,
    }));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}