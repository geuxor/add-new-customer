import React from "react";
import FaqItem from "./FaqItem";
import { useState } from "react";
import headingFaqs from "../../data/heading_faq";

function FaqList({ faqsList, faqInfos }) {
  const [activeIndex, setActiveIndex] = useState(1);
  const renderedFaqs = faqsList.map((item, index) => {
    const showDescription = index === activeIndex ? "show-description" : "";
    const rotateArrow = index === activeIndex ? "rotate-arrow" : "";
    const ariaExpanded = index === activeIndex ? "true" : "false";
    return (
      <FaqItem
        key={index}
        faqInfos={faqInfos}
        showDescription={showDescription}
        rotateArrow={rotateArrow}
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
      {headingFaqs.preHeading && (<div className="faq-list__pre-heading">{headingFaqs.preHeading}</div>)}
      {headingFaqs.heading && (<div className="faq-list__heading">{headingFaqs.heading}</div>)}
      {headingFaqs.subHeading && (<div className="faq-list__sub-heading">{headingFaqs.subHeading}</div>)}
      <div className="faq-list__help">
        {headingFaqs.title && (<div className="faq-list__title">{headingFaqs.title}</div>)}
        {headingFaqs.subTitle && (<div className="faq-list__sub-title">{headingFaqs.subTitle}</div>)}
        {renderedFaqs}
      </div>
    </div>
  );
}

export default FaqList;
