import React from "react";
import FaqItem from "./FaqItem";
import { useState } from "react";

function FaqList({ faqsList, faqInfos }) {
  const [activeIndex, setActiveIndex] = useState(1);
  console.log(faqsList);

  const renderedFaqs = faqsList.map((item, index) => {
    const showDescription = index === activeIndex ? "show-description" : "";
    const fontWeightBold = index === activeIndex ? "font-weight-bold" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
    return (
      <FaqItem
        showDescription={showDescription}
        fontWeightBold={fontWeightBold}
        ariaExpanded={ariaExpanded}
        item={item}
        index={index}
        onClick={(e) => {
          setActiveIndex(index);
        }}
      />
    );
  });

  return (
    <div className="faq-list__container">
      <div className="faq-list__title">FAQ</div>
      <div className="faq-list__help">
        <div className="faq-list__description">
          Here you will find instructions on how to complete the LKYC and Due
          Diligence step by step. If you still have questions, let us know.
        </div>
        {renderedFaqs}
      </div>
    </div>
  );
}

export default FaqList;
