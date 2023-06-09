// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

// export function getAppointmentsForDay(state, day) {
//   const selectedDay = state.days.find((dayObj) => dayObj.name === day);

//   if (selectedDay) {
//     return selectedDay.appointments.map((appointmentId) => state.appointments[appointmentId]);
//   } else {
//     return [];
//   }
// }

// Gets the appointments for a given day
export function getAppointmentsForDay(state, day) {
  const validDays = state.days.map(day => day.name);
  if (!day || !validDays.includes(day)) return [];

  return state.days
    .filter(appointment => appointment.name === day)[0]
    .appointments.map(apptId => state.appointments[apptId]);
}

export function getInterview(state, interview) {
  if(!interview) {
    return null
    }

    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer],
      
    }
}

export function getInterviewersForDay(state, dayName) {
  const validDayNames = state.days.map(dayObj => dayObj.name);
  if (!dayName || !validDayNames.includes(dayName)) return [];

  const todayObj = state.days.filter(dayObj => dayObj.name === dayName)[0];
  const interviewersObj = todayObj.interviewers.map(
    interId => state.interviewers[interId]
  );
  return interviewersObj;
}