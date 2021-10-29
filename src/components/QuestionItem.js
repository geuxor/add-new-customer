import React from "react";
import countryList from "../data/countryList"

const AccordionItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  questionsAmount,
  onClick,
}) => {
  console.log("index", index, "item", item.inputs)
  return (

    <div className="question-item__list-items" key={item.headline}>
      <div className="question-item__headline" data-qa="question-item__title" onClick={onClick} aria-expanded={ariaExpanded} aria-controls={`question-item${index + 1}_desc`}>{item.headline}</div>
      <div className={`question-item__desc ${showDescription}`}>

        <div className="question-item__title">{item.title}</div>
        <div className="question-item__description">{item.description}</div>
        <div className="question-item__subdescription">{item.subdescription}</div>
        <div className="question-item__inputs">
          {item?.inputs?.map((input, i) => {
            return (
              <>
                <div className="question-item__form-group">
                  <label className="question-item__label">{input.label}{input.required && " *"}</label>
                  {input?.type === "text" &&
                    <input
                      className="question-item__input-field"
                      type={input.type}
                      name={input.name}
                      placeholder={input.placeholder}
                      autoComplete="off"
                      id={input.name}
                    />
                  }
                  {input?.type === "select" &&
                    <select name={input.name} className="question-item__input-field">
                    <option selected="true"></option>
                      {input.options.map(o => <option value={o.code} selected="">{o.name}</option>)}
                    </select>
                  }
                </div>
              </>)
          })}
        </div>
        <div className="question-item__navigation">
          {index !== 0 && index !== questionsAmount && (
            <button
              aria-expanded={ariaExpanded}
              aria-controls={`question-item${index + 1}_desc`}
              data-qa="question-item__buttons"
              className={`question-item__buttons ${fontWeightBold}`}
              onClick={(e) => onClick(e)}
            >
              Back
            </button>
          )}
          <button
            onClick={onClick}
            aria-expanded={ariaExpanded}
            aria-controls={`question-item${index + 1}_desc`}
            data-qa="question-item__buttons__next"
            className={index === 0 || index === questionsAmount ? (`question-item__buttons ${fontWeightBold}`) : `question-item__buttons__next ${fontWeightBold}`}

          >
            {index === 0 ? "Start" : index === questionsAmount ? "Close" : "Next"}

          </button>
        </div>
        <p
          id={`question-item${index + 1}_desc`}
          data-qa="question-item__desc"
          className={`question-item__desc ${showDescription}`}
        >
        </p>
      </div>
    </div>
  )
}
export default AccordionItem;
