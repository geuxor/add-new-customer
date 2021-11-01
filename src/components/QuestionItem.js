import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { valuesIn } from "lodash";

const Input = styled("input")({
  display: "none",
});

const QuestionItem = ({
  activeIndex,
  initialErrors,
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  questionsAmount,
  onSubmit,
  onClick,
  questionInfos
}) => {
  const [people, setPeople] = useState([item.inputs])
  // const [firstEl, setFirstEl] = useState("")
  // const [watchFirstEl, setWatchFirstEl] = useState(null)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // console.log("index", index);
  // const watchCompany = watch("company"); //watch("item.name")
  // var watchItemCount = "x"//Object.values(watchItem).length
  let errorCount = Object.keys(errors).length
  // console.log("item.name", item.inputs && item.inputs[0].name)

  if (item.inputs) {
    // console.log("firstEl@@1", typeof item.inputs[0].name, item.inputs[0].name +("" + people.length - 1),"x", ""+people.length-1,"x", people.length-1);
    const firstElError = item.inputs && item.inputs[0].name + ("" + people.length - 1)
    console.log("- firstElError", firstElError);
    var watchItem = watch(firstElError, null);
    console.log("- watchItem", watchItem)
  }

  const checkKeyDown = (e) => {
    console.log("enter key pressed hard!");
  };
  const onFileUpload = (e) => {
    console.log("fileupload!", e?.target?.value);
  };
  const handleNewPerson = (e, inputs) => {
    console.log("handleNewPerson: New Form added", inputs?.length)
    // console.log("2 errors has changed", multipleFormCount);
    errorCount = 0
    if (inputs) setPeople(prev => [...prev, inputs])
  }

  const onDisplayNext = (e) => {
    // console.log(item.headline, item.id, "****************************************")
    // console.log("@ ......id:", e.target.id);
    // // console.log("@ ......value:", e.target);
    // // errorCount ? null : (item.id > 1 && watchItem ? (e) => onClick(e) : null)
    // console.log(item.id, "@ - watchitem", watchItem)
    // console.log(item.id, "@ errorCount", errorCount);
    // // console.log(item.id, "@ item.id === 1", item.id === 1);
    // console.log(item.id, "@ watchItem === nothing", watchItem === "");
    // console.log(item.id, "@ watchItem typeof ", typeof watchItem)
    // console.log(item.id, "@, is watchItem a number ", typeof watchItem == "number")
    // console.log(item.id, "@ watchItem-isNaN", isNaN(watchItem))
    // console.log(item.id, "@ Item-type", item.inputs[0]?.type)
    if (e.target.id === "1") return onClick(e)
    // console.log("......1", typeof e.target.id);
    if (errorCount) return null
    // console.log("......2")
    if (typeof watchItem === "number" && isNaN(watchItem)) return null
    // console.log("......3")
    if (watchItem === "") return null
    // console.log("......4")
    onClick(e)
  }

  return (
    <div className="question-item__list-items" key={item.headline}>
      {/* {console.log(item.headline, "Return: Errors", errors, "errorCount", errorCount, "initial error", initialErrors)} */}
      {/* {ariaExpanded === "true" && console.log("ariaExpanded22!!!", ariaExpanded, index, activeIndex)} */}
      <div className="question-item__headline-info">
        <div className={ariaExpanded === "true" ? "question-item__headline-nr" : (index <= activeIndex ? "question-item__headline-nr-done" : "question-item__headline-nr-disabled")}>{index + 1}</div>
        <div className={index <= activeIndex ? "question-item__headline" : "question-item__headline-disabled"} data-qa="question-item__title" onClick={index <= activeIndex ? onClick : null} aria-expanded={ariaExpanded} aria-controls={`question-item${index + 1}_desc`}>{item.headline}</div>
      </div>
      <div className={`question-item__desc ${showDescription}`}>
        <div className="question-item__title">{item.title}</div>
        <div className="question-item__description">{item.description}</div><br />
        <div className="question-item__subdescription">{item.subdescription}</div>

        <form className="question-item__inputs" onSubmit={handleSubmit((e) => onSubmit(e))}>
          {item.id > 1 && (
            <div key={item.id} className={item.inputs ? (item.inputs.length === 1 ? "question-item__form-center" : "question-item__form") : "question-item__form"}>
              {item.inputs && people.length > 0 && people.map((segments, segmentIndex) => {
                return segments.map((input, i) => {

                  return (
                    <>
                      <div key={segmentIndex + i} className={item.inputs.length === 1 ? "question-item__form-group-center" : "question-item__form-group"}>
                        <label className="question-item__label">{input.label}{input.required && " *"}</label>
                        {(input?.type === "text" || input?.type === "number" || input?.type === "email") &&
                          <input
                            className="question-item__input-field"
                            type={input.type}
                            name={input.name + segmentIndex}
                            placeholder={input.placeholder}
                            autoComplete="off"
                            id={input.name + segmentIndex}
                            {...register(input.name + segmentIndex, { required: input.required, valueAsNumber: (input.type === "number") })}
                          />
                        }
                        {/* {console.log("input type is nr", input.type === "number", input?.type, input.name)} */}
                        {input?.type === "select" && (
                          <>
                            <select
                              name={input.name + segmentIndex}
                              className="question-item__input-field"
                              {...register(input.name + segmentIndex, { required: input.required })}>
                              <option defaultValue=""></option>
                              {input.options.map((o, i) => {
                                return <option key={i} value={o.code}>{o.name}</option>
                              })}
                            </select>
                          </>
                        )}
                        {input?.type === "file" &&
                          <>
                            <input
                              accept="image/*"
                              className="question-item__input-field"
                              style={{ display: 'none' }}
                              id={"raised-button-file" + segmentIndex + input.id}
                              type="file"
                              onChange={(e) => onFileUpload(e)}
                              {...register(input.name + segmentIndex, { required: input.required })}
                            />
                            <label htmlFor={"raised-button-file" + segmentIndex + input.id} className="question-item__input-field-upload">
                              <Button variant="raised" component="span">
                                <div className="question-item__input-field-upload-placeholder">
                                  {input.placeholder}
                                </div>
                                <PhotoCamera color="primary" />
                              </Button>
                            </label>
                          </>
                        }
                        <div className="question-item__error">
                          {/* {console.log("@@@", errors[input.name + segmentIndex])} */}
                          {errors[input.name + segmentIndex] && <span>{input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required</span>}
                        </div>
                      </div>
                      {segments.length % 2 === 1 && i === segments.length - 1 && (
                        <>
                          <div className="question-item__form-group"></div>
                        </>
                      )}
                    </>)
                })
              })}
            </div>
          )}
          {/* {item.inputs && console.log(item.inputs[0].name, "firstEl@@5500", watchItem === "", watchItem?.length > 0, watchItem)} */}
          {item.allowMultiple &&
            <div className="question-item__add-person">
              <div className="question-item__add-person-button-plus"></div>
              <button className="question-item__add-person-button" onClick={errorCount ? null : (watchItem !== "" ? (e) => handleNewPerson(e, item.inputs) : null)}>Add Person</button>
            </div>
          }

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
            {/* {console.log(item.headline, item.id, "- watchitem", watchItem, "- errorcount", errorCount,"--isNaN", isNaN(watchItem) )} */}

            <button
              id={item.id}
              type="submit"
              onClick={onDisplayNext}
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



        {item.id > 1 && (
          <p className={`question-item__info`}>{questionInfos.info}</p>
        )}

      </div>
    </div>
  )
}
export default QuestionItem;
