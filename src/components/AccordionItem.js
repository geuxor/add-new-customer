import React from "react";

const AccordionItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  questionsAmount,
  onClick,
}) => {
  // console.log("index", index)
  return (

    <div className="accordion__question-list" key={item.title}>
      <div className="accordion__title" data-qa="accordion__title" onClick={onClick} aria-expanded={ariaExpanded} aria-controls={`accordion${index + 1}_desc`}>{item.title}</div>
      <div className={`accordion__desc ${showDescription}`}>

        <div className="accordion__question">{item.question}</div>
        <div className="accordion__description">{item.description}</div>
        <div className="accordion__subdescription">{item.subdescription}</div>
        <div className="accordion__navigation">
          {index !== 0 && index !== questionsAmount && (
            <button
              aria-expanded={ariaExpanded}
              aria-controls={`accordion${index + 1}_desc`}
              data-qa="accordion__question-button"
              className={`accordion__question-button ${fontWeightBold}`}
              onClick={(e) => onClick(e)}
            >
              Back
            </button>
          )}
          <button
            onClick={onClick}
            aria-expanded={ariaExpanded}
            aria-controls={`accordion${index + 1}_desc`}
            data-qa="accordion__question-button__next"
            className={index === 0 || index === questionsAmount ? (`accordion__question-button ${fontWeightBold}`) : `accordion__question-button__next ${fontWeightBold}`}

          >
            {index === 0 ? "Start" : index === questionsAmount ? "Close" : "Next"}

          </button>
        </div>
        <p
          id={`accordion${index + 1}_desc`}
          data-qa="accordion__desc"
          className={`accordion__desc ${showDescription}`}
        >
        </p>
      </div>
    </div>
  )
}
export default AccordionItem;
