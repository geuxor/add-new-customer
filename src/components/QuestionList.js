import React, { useState } from "react";
import QuestionItem from "./QuestionItem";

const QuestionList = ({ questionsListItems, questionInfos }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const onCompletion = () => {
    console.log("finally finished!");
  }

  const onSubmit = async (data) => {
    // props.updateUser(data);
    console.log("sending to API: ", data);
    // props.history.push("/second");
    const formData = new FormData()
    if (data.passport) formData.append("passport", data.passport[0])
    if (data.utility) formData.append("utility", data.utility[0])
    // const res = await fetch("http://localhost:4000/fileupload", {
    //   method: "POST",
    //   body: formData
    // }).then(res => res.json())
    // console.log(JSON.stringify(res))
  };

  const renderedQuestions = questionsListItems.map((item, index) => {
    const showDescription = index === activeIndex ? "show-description" : "";
    const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
    // console.log(activeIndex);

    return (
      <>
        <QuestionItem
          key={index}
          showDescription={showDescription}
          fontWeightBold={fontWeightBold}
          ariaExpanded={ariaExpanded}
          item={item}
          index={index}
          questionsAmount={questionsListItems.length - 1}
          onSubmit={onSubmit}
          onClick={(e) => {
            // console.log(e.target.innerText, questionsListItems.length - 1, index)
            if (e.target.localName === "button") {
              e.target.innerText === "Back" && setActiveIndex(index - 1)
              e.target.innerText === "Close" && onCompletion()
              if (e.target.innerText === "Next" || e.target.innerText === "Start") {
                setActiveIndex(index + 1)
              }
            } else {
              console.log(index);
              setActiveIndex(index)
            }
          }}
        />
      </>
    );
  });



  return (
    // <div className="accordions">
    <div className="question-list">
      <div className="question-list__subject">KYC & DUE DILIGENCE</div>
      <div className="question-list__title">Add new Customer</div>
      <div className="question-list__time">Estimated time: <b>10 min</b></div>
      <dl className="question__list">{renderedQuestions}</dl>
    </div>
  );
};

export default QuestionList;
