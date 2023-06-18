// import React from "react"
import React, { useState } from 'react'
import InterviewerList from "components/InterviewerList.js"
import Button from "components/Button.js"


// ---FORM COMPONENT---
export default function Form(props) {
  const [student, setStudent] = React.useState(props.student || "");
  const [interviewer, setInterviewer] = React.useState(props.interviewer || null);
  const [error, setError] = useState("");

  const cancel = function() {
    reset();
    props.onCancel();
  };

  // Reset for to cancel
  const reset = function() {
    setStudent('');
    setInterviewer(null);
  };

  function validate() {

      if (student === "") {
      setError("Student name cannot be blank");
      return
      } else { setError("") }
       if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    } else { setError("")
  }
  
    props.onSave(student, interviewer);
  }

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
            onChange={(event) =>  setStudent(event.target.value) }
            data-testid="student-name-input"
          />

        </form>

        <section className="appointment__validation">{error}</section>

        <InterviewerList 
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />

      </section>

      <section className="appointment__card-right">

        <section className="appointment__actions">

          <Button onClick={cancel} danger>
            Cancel
          </Button>

          <Button onClick={validate} confirm>
            Save
          </Button>

        </section>

      </section>

    </main>
  )
}