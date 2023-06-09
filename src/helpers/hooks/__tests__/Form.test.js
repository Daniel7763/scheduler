import React from "react";
import { render, cleanup } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";
import axios from "axios";


afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  //---------------1
  
    it("renders without student name if not provided", () => {
      const { getByPlaceholderText } = render(
        <Form interviewers={interviewers} />
      );
      expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    });
  
  //---------------2
  
  it("renders with initial student name", () => {
    const { getByTestId } = render(
      // <Form interviewers={interviewers} name="Lydia Miller-Jones" />
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
  
  //---------------3
  
  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
    
  //---------------4
  
  // it("validates that the interviewer cannot be null", () => {
  //   const onSave = jest.fn();
  //   const { getByText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} student="Lydia Miller-Jones" />
  //   );
  
  //   /* 3. Click the save button */
  //   fireEvent.click(getByText("Save"));
  
  //   expect(getByText(/please select an interviewer/i)).toBeInTheDocument();
  //   expect(onSave).not.toHaveBeenCalled();
  // });
  
  //---------------5 replaed by test 7
  
  // it("calls onSave function when the name and interviewer is defined", () => {
  //   /* 1. Create the mock onSave function */
  //   const onSave = jest.fn();
  
  //   /* 2. Render the Form with interviewers, student name and the onSave mock function passed as an onSave prop */
  //   const { getByText, queryByText } = render(
  //     <Form
  //       interviewers={interviewers}
  //       onSave={onSave}
  //       // name="Lydia Miller-Jones"
  //       student="Lydia Miller-Jones"
  //       interviewer={interviewers[0].id}
  //     />
  //   );
  
  //   /* 3. Click the save button */
  //   fireEvent.click(getByText("Save"));
  
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  //   expect(queryByText(/please select an interviewer/i)).toBeNull();
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  // });

  //---------------6 replaced by test 7

  // it("submits the name entered by the user", () => {
  //   const onSave = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
  //   );
  
  //   const input = getByPlaceholderText("Enter Student Name");
  
  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  //   fireEvent.click(getByText("Save"));
  
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  // });

  //---------------7

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} interviewer={1} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByText("Save"));

    

    expect(onSave).toHaveBeenCalledTimes(1);

  

    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);

    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  });

  //---------------8

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        // name="Lydia Mill-Jones"
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});