import React, { useState } from "react";
import AccordionItem from "./AccordionItem";

const AccordionList = ({ questionsList, questionInfos }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const onCompletion = () => {
    console.log("finally finished!");
  }

  const renderedQuestions = questionsList.map((item, index) => {
    const showDescription = index === activeIndex ? "show-description" : "";
    const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
    // console.log(activeIndex);
    
    return (
      <AccordionItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index}
        questionsAmount={questionsList.length - 1}
        onClick={(e) => {
          // console.log(e.target.innerText, questionsList.length - 1, index)
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
    );
  });

  return (
    // <div className="accordions">
    <div className="accordion-list">
      <div className="accordion-list__subject">KYC & DUE DILIGENCE</div>
      <div className="accordion-list__title">Add new Customer</div>
      <div className="accordion-list__time">Estimated time: <b>10 min</b></div>
      <dl className="accordion__list">{renderedQuestions}</dl>
    </div>
  );
};

export default AccordionList;
