import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const QuestionItem = ({
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  questionsAmount,
  onSubmit,
  onClick,
}) => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchCompany = watch("company", false);
  const errorCount = Object.keys(errors).length

  const checkKeyDown = (e) => {
    console.log("enter key pressed hard!");
  };

  return (
    <div className="question-item__list-items" key={item.headline}>
      <div className="question-item__headline" data-qa="question-item__title" onClick={onClick} aria-expanded={ariaExpanded} aria-controls={`question-item${index + 1}_desc`}>{item.headline}</div>
      <div className={`question-item__desc ${showDescription}`}>

        <div className="question-item__title">{item.title}</div>
        <div className="question-item__description">{item.description}</div>
        <div className="question-item__subdescription">{item.subdescription}</div>
        <form className="question-item__inputs" onSubmit={handleSubmit((e) => onSubmit(e))}>
          <div className="question-item__form">
            {item?.inputs?.map((input, i) => {
              return (
                <>
                  <div key={i} className="question-item__form-group">
                    <label className="question-item__label">{input.label}{input.required && " *"}</label>
                    {input?.type === "text" &&
                      <input
                        className="question-item__input-field"
                        type={input.type}
                        name={input.name}
                        placeholder={input.placeholder}
                        autoComplete="off"
                        id={input.name}
                        {...register(input.name, { required: input.required })}
                      />
                    }
                    {/* {console.log("input type is ", input?.type, input.name)} */}
                    {input?.type === "select" && (
                      <>
                        <select
                          name={input.name}
                          className="question-item__input-field"
                          {...register(input.name, { required: input.required })}>
                          <option defaultValue=""></option>
                          {input.options.map((o, i) => {
                            return <option key={i} value={o.code}>{o.name}</option>
                          })}
                        </select>
                      </>
                    )}
                    <div className="question-item__error">
                      {errors[input.name] && <span>{input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required</span>}
                    </div>
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
            {/* {console.log("err initialSubmit", watchCompany, errorCount)} */}
            <button
              // type="submit"
              onClick={errorCount ? null : (watchCompany ? (e) => onClick(e) : null)}
              onKeyDown={(e) => checkKeyDown(e)}
              aria-expanded={ariaExpanded}
              aria-controls={`question-item${index + 1}_desc`}
              data-qa="question-item__buttons__next"
              className={index === 0 || index === questionsAmount ? (`question-item__buttons ${fontWeightBold}`) : `question-item__buttons__next ${fontWeightBold}`}
            >
              {index === 0 ? "Start" : index === questionsAmount ? "Close" : "Next"}

            </button>
          </div>
        </form>

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
export default QuestionItem;
