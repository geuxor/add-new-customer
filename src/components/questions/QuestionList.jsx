import React, { useState } from "react";
import QuestionItem from "./QuestionItem";
import headingQuestions from "../../data/heading_questions";

const QuestionList = ({ questionsListItems, questionInfos }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onCompletion = () => {
    console.log("Form Finalized Action");
  };

  const renderedQuestions = questionsListItems.map((item, index) => {
    const showDescription = index === activeIndex ? "show-description" : "";
    const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";

    return (
      <div key={index}>
        <QuestionItem
          activeIndex={activeIndex}
          questionInfos={questionInfos}
          key={index}
          showDescription={showDescription}
          fontWeightBold={fontWeightBold}
          ariaExpanded={ariaExpanded}
          item={item}
          index={index}
          questionsAmount={questionsListItems.length - 1}
          onClick={(e) => {
            if (e) {
              if (e.target.localName === "button") {
                e.target.innerText === "Back" && setActiveIndex(index - 1);
                e.target.innerText === "Close" && onCompletion();
                if (
                  e.target.innerText === "Next" ||
                  e.target.innerText === "Start"
                ) {
                  setActiveIndex(index + 1);
                }
              } else {
                setActiveIndex(index);
              }
            }
          }}
        />
      </div>
    );
  });

  return (
    <div className="question-list">
      <div className="question-list__pre-heading">
        {headingQuestions.preHeading}
      </div>
      <div className="question-list__heading">{headingQuestions.heading}</div>
      <div className="question-list__sub-heading">
        {headingQuestions.subHeading}
        <b>{headingQuestions.subHeadingTime}</b>
      </div>
      <div className="question__list">{renderedQuestions}</div>
    </div>
  );
};

export default QuestionList;
