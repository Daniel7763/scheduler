import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Form from "components/Appointment/Form.js";
import Confirm from "components/Appointment/Confirm.js";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "helpers/hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const CONFIRM = "CONFIRM"
const DELETING = "DELETING"
const EDITING = "EDITING"
const ERROR_DELETE = "ERROR_DELETE"
const ERROR_SAVE = "ERROR_SAVE"


//---APPOINTMENT---
export default function Appointment(props) {

  const { mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //save Function
  // function save(name, interviewer) {
  //   transition(SAVING);
  //   const interview = {
  //     student: name,
  //     interviewer
  //   };
  //   props
  //     .bookInterview(props.id, interview)
  //     .then(() => transition(SHOW))
  //     .catch(error => transition(ERROR_SAVE, true))
  // }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  //cancel interview
  function deleting(){
    transition(DELETING, true);
      // const interview = {
      //   student: null,
      //   interviewer: null
      // }
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      // .catch(error => {
      //   console.error(error);
      //   transition(CREATE);
      // })
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">

    <Header time={props.time} />
    
    {/* EMPTY to CREATE */}
    {mode === EMPTY &&
      <Empty
        onAdd={() => transition(CREATE)}
        //sends to CREATE
      />}

    {/* CREATE TO SHOW || EMPTY */}
    {mode === CREATE && (
      <Form
        onCancel={back}
        //back sends to EMPTY
        interviewers = {props.interviewers}
        onSave={save}
        //save send to SHOW
      />)}

    {/* SAVING TO SHOW - "SAVING" */}
    {mode === SAVING &&(
      <Status
        message = {"SAVING"}
      />
    )}

    {/* SHOW TO DELETE || EDIT */}
    {mode === SHOW && (
      <Show
        student = {props.interview.student}
        interviewer = {props.interview.interviewer}
        onDelete = {() => transition(CONFIRM)}
        onEdit = {() => transition(EDITING)}
      />
    )}

    {/* CONFIRM TO EMPTY - "DELETING" */}
    {mode === DELETING &&(
      <Status
        message = {"DELETING"}
      />
    )}

    {/* CONFIRM */}
    {mode === CONFIRM && (
      <Confirm
        message = "Are you sure"
        onConfirm={() => deleting()}
        //code for the confirm button that send the information to === null
        onCancel = {back}
        //code for the cancel button that just returns to the show page
      />
    )}

    {/* EDITING */}
    {mode === EDITING && (
      <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onSave={save}
        //code to save and send to show
        onCancel={back}
        //code to cancel editing and return to show
      />
    )}

    {/* ERROR_DELETE */}
    {mode === ERROR_DELETE &&(
      <Error
        message = "Error Deleting this appointment"
        onClose={back}
      />
    )}

    {/* ERROR_SAVE */}
    {mode === ERROR_SAVE &&(
      <Error
        message = "Error Saving this appointment"
        onClose={back}
      />
    )}


    </article>
  );
}


    {/* SAVING TO SHOW
    {mode === SAVING &&(
      <Status
        message = {"SAVING"}
      /> )} */}



      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}

        />) : (<Empty />)} */}





