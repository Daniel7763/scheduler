// import React from "react"
import React, { useState } from 'react'
import InterviewerList from "components/InterviewerList.js"
import Button from "components/Button.js"


export default function Form(props) {
  const [student, setStudent] = React.useState(props.student || "");
  const [interviewer, setInterviewer] = React.useState(props.interviewer || null);

  const cancel = function() {
    reset();
    props.onCancel();
  };

    // Reset for to cancel
    const reset = function() {
      setStudent('');
      setInterviewer(null);
    };

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            //unsure of this ^^^^
            onChange={event => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}