import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";

const Input = styled("input")({
  display: "none",
});



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
  const [people, setPeople] = useState([item.inputs])
  const [multipleFormCount, setMultipleFormCount] = useState([])
  console.log("xx", item.id ,[item.inputs])
  // useEffect(()=>{
  //   setPeople(item?.inputs)
  // },[])

  const checkKeyDown = (e) => {
    console.log("enter key pressed hard!");
  };
  const onFileUpload = (e) => {
    console.log("fileupload!", e?.target?.value);
  };
  const handleNewPerson = (e, inputs) => {
    console.log("New person is being added", inputs)
    setPeople(prev => [...prev, inputs])
    setMultipleFormCount(prev => [...prev, inputs.length])
  }

  return (
    <div className="question-item__list-items" key={item.headline}>
      <div className="question-item__headline" data-qa="question-item__title" onClick={onClick} aria-expanded={ariaExpanded} aria-controls={`question-item${index + 1}_desc`}>{item.headline}</div>
      <div className={`question-item__desc ${showDescription}`}>
        <div className="question-item__title">{item.title}</div>
        <div className="question-item__description">{item.description}</div>
        <div className="question-item__subdescription">{item.subdescription}</div>
        <form className="question-item__inputs" onSubmit={handleSubmit((e) => onSubmit(e))}>
          {multipleFormCount && (
            multipleFormCount.map((f, i) => {
              return (
                <div className="">{f}x</div>
              )
            })
          )
          }
          {/* {item?.inputs?.map((input, i) => { */}
          <div className="question-item__form">
            {item.inputs && people.length > 0 && people.map((segments, segmentIndex) => {
            console.log("people", people.length, people, item.inputs)
              
              return segments.map((input, i) => {
                return (
                  <>
                    <div key={i} className="question-item__form-group">
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
                      {input.type === "file" && console.log(input.name)}
                      {input?.type === "file" &&
                        <>
                          <input
                            accept="image/*"
                            className="question-item__input-field"
                            style={{ display: 'none' }}
                          id={"raised-button-file" + segmentIndex+ input.id}
                            type="file"
                            onChange={(e) => onFileUpload(e)}
                          {...register(input.name + segmentIndex, { required: input.required })}
                          />
                        <label htmlFor={"raised-button-file" + segmentIndex+ input.id} className="question-item__input-field-upload">
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
                        {errors[input.name + segmentIndex] && <span>{input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required</span>}
                      </div>

                    </div>
                  </>)
              })
            })}
          </div>
          {people && console.log("setMultipleFormCount", people, multipleFormCount)}
          {item.allowMultiple &&
            <div className="question-item__add-person">
              <button onClick={(e) => handleNewPerson(e, item.inputs)}>Add new Person</button>
            
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