import React from "react";
import PropTypes from 'prop-types'; 
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";


export default function InterviewerList(props) {

  let Interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewer.id)}
      />
    );
  });

  return (
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{Interviewers}</ul>
</section>
  );
}


InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};