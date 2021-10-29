import React from "react";

const FaqItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  onClick,
}) => {
  // console.log("index", index)
  return (
    <div className="faq__question-list" key={item}>
      <div
        className="faq__title"
        data-qa="faq__title"
        onClick={onClick}
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
      >
        {item.question}
      </div>
      <div className={`faq__desc ${showDescription}`}>
        <div className="faq__answer">{item.answer}</div>
        <p
          id={`faq${index + 1}_desc`}
          data-qa="faq__desc"
          className={`faq__desc ${showDescription}`}
        ></p>
      </div>
    </div>
  );
};
export default FaqItem;
