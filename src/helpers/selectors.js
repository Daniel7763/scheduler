// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

// export function getAppointmentsForDay(state, day) {
//   const dayAppointments = state.day.filter(day => day.name === day)[0]

export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((dayObj) => dayObj.name === day);

  if (selectedDay) {
    return selectedDay.appointments.map((appointmentId) => state.appointments[appointmentId]);
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  if(interview) {
    return {
      student: interview.student,
      interviewer:{
        id: state.interviewers[interview.interviewer].id,
        name: state.interviewers[interview.interviewer].name,
        avatar: state.interviewers[interview.interviewer].avatar
      }
    }
  } else {
    return null
  }
    
}