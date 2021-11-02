import React from "react";
import questionsListItems from "../data/questionsListData"
import questionInfos from "../data/questionInfoData";
import faqsList from "../data/faqsListData"
import faqInfos from "../data/faqInfosData";
import QuestionList from "./questions/QuestionList";
import FaqList from "./faqs/FaqList";
import logo from "../images/logo.jpg"

const Onboarding = () => {
  return (
    <div className="kyc-flow">
      <div className="left-bar">
        <img
          className="logo"
          src={logo}
          alt="logo"
        />
      </div>
      <div className="question-container">
        <div className="component">
          <QuestionList questionsListItems={questionsListItems} questionInfos={questionInfos} />
        </div>
      </div>
      <div className="faq">
        <FaqList faqsList={faqsList} faqInfos={faqInfos} />
      </div>
    </div>
  );
};

export default Onboarding;
