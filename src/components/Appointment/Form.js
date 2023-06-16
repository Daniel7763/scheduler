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
    // if (name === "") {
      if (student === "") {
      setError("Student name cannot be blank");
      return
      //else set error to ""
      } else { setError("") }
  
       if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    } else { setError("")
  }
  
    // props.onSave(name, interviewer);
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
            //unsure of this ^^^^ example was value = {name}
            onChange={(event) =>  setStudent(event.target.value) }
            data-testid="student-name-input"
              //added for testing ^^^
          />
        </form>
        <section className="appointment__validation">{error}</section>
        {/* added for testing ^^^^ */}
        <InterviewerList 
          interviewers={props.interviewers}
          // interviewers={props.interviewers.toString()}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* <Button danger onClick={props.onCancel}>Cancel</Button> */}
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          {/* <Button confirm onClick={() => props.onSave (student, interviewer)}>Save</Button> */}
          <Button onClick={validate} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  )
}