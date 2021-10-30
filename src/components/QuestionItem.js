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

  console.log("index", index);
  // const watchCompany = watch("company"); //watch("item.name")
  // var watchItemCount = "x"//Object.values(watchItem).length
  let errorCount = Object.keys(errors).length
  // console.log("item.name", item.inputs && item.inputs[0].name)

  if (item.inputs) {
    // console.log("firstEl@@1", typeof item.inputs[0].name, item.inputs[0].name +("" + people.length - 1),"x", ""+people.length-1,"x", people.length-1);
    const firstElError = item.inputs && item.inputs[0].name + ("" + people.length - 1)//+0
    // console.log("firstEl@@22", firstElError);
    var watchItem = watch(firstElError, null);
    // console.log("firstEl@@33", watchItem)
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

  return (
    <div className="question-item__list-items" key={item.headline}>
      {console.log(item.headline, "Return: Errors", errors, "errorCount", errorCount, "initial error", initialErrors)}
      {ariaExpanded === "true" && console.log("ariaExpanded22!!!", ariaExpanded, index, activeIndex)}
      <div className="question-item__headline-info">
        <div className={(ariaExpanded === "true" || index <= activeIndex) ? "question-item__headline-nr" : "question-item__headline-nr-disabled"}>{index + 1}</div>
        <div className={(ariaExpanded === "true" || index <= activeIndex) ? "question-item__headline" : "question-item__headline-disabled"} data-qa="question-item__title" onClick={onClick} aria-expanded={ariaExpanded} aria-controls={`question-item${index + 1}_desc`}>{item.headline}</div>
      </div>
      <div className={`question-item__desc ${showDescription}`}>
        <div className="question-item__title">{item.title}</div>
        <div className="question-item__description">{item.description}</div>
        <div className="question-item__subdescription">{item.subdescription}</div>
        <form className="question-item__inputs" onSubmit={handleSubmit((e) => onSubmit(e))}>

          <div key={item.id} className="question-item__form">
            {item.inputs && people.length > 0 && people.map((segments, segmentIndex) => {
              return segments.map((input, i) => {

                return (
                  <>
                    <div key={segmentIndex + i} className="question-item__form-group">
                      <label className="question-item__label">{input.label + segmentIndex}{input.required && " *"}</label>
                      {(input?.type === "text" || input?.type === "email") &&
                        <input
                          className="question-item__input-field"
                          type={input.type}
                          name={input.name + segmentIndex}
                          placeholder={input.placeholder}
                          autoComplete="off"
                          id={input.name + segmentIndex}
                          {...register(input.name + segmentIndex, { required: input.required })}
                        />
                      }
                      {/* {console.log("input type is ", input?.type, input.name)} */}
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
                        {console.log("@@@", errors[input.name + segmentIndex])}
                        {errors[input.name + segmentIndex] && <span>{input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required</span>}
                      </div>
                    </div>
                    {/* {console.log("lort", segments.length % 2 === 1, i === segments.length - 1, i)} */}
                    {segments.length % 2 === 1 && i === segments.length - 1 && (
                      <>
                        <div className="question-item__form-group">lort</div>
                      </>
                    )}
                  </>)
              })
            })}
          </div>
          {/* {item.inputs && console.log(item.inputs[0].name, "firstEl@@5500", watchItem === "", watchItem?.length > 0, watchItem)} */}
          {item.allowMultiple &&
            <div className="question-item__add-person">
              <button onClick={errorCount ? null : (watchItem !== "" ? (e) => handleNewPerson(e, item.inputs) : null)}>Add new Person</button>
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
            {/* {console.log("err initialSubmit", watchCompany, errorCount)} */}

            <button
              type="submit"
              onClick={errorCount ? null : (watchItem !== "" ? (e) => onClick(e) : null)}
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


// {
//   input?.type === "xx" &&
//   <>
//     {console.log("input.placeholder", input.placeholder)}
//     <Stack className="question-item__input-field-upload" direction="row" alignItems="center" spacing={2}>
//       <div className="question-item__input-field-upload-placeholder">
//         {input.placeholder}
//       </div>
//       <label htmlFor="icon-button-file">
//         <Input accept="image/*" id="icon-button-file" type="file" />
//         <IconButton
//           {...register(input.name, { required: input.required })}
//           color="primary"
//           aria-label="upload picture"
//           component="span">
//           <PhotoCamera />
//         </IconButton>
//       </label>
//     </Stack>
//   </>
// }