import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

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
  const [selectedFile, setSelectedFile] = useState({});
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isFileError, setIsFileError] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let errorCount = Object.keys(errors).length

  if (item.inputs) {
    const firstElError = item.inputs && item.inputs[0].name + ("" + people.length - 1)
    var watchItem = watch(firstElError, null);
  }

  const raiseFileError = (field) => {
    console.log("raiseFileError", field, item.id, field.target.id)
  }

  const onFileUpload = (e, name) => {
    // console.log("onFileUpload", name, e.target.files[0]?.name)
    if (!e.target.files[0]) console.log("file is blank")
    setSelectedFile((prev) => ({ ...prev, [name]: e.target.files[0] }))
    setIsFilePicked(true);

    var upl = document.getElementById(e.target?.id);

    if (upl.files[0]?.size > 1048576) {
      console.log("File too big!", name, selectedFile?.size, e.target?.id, upl.files[0].size);
      // errors.[name] = "Upload file is toooooo big. Max allowed is 1Mb"
      setIsFileError((prev) => ({ ...prev, [name]: "Upload file is too big. Max allowed is 1Mb" }))
      // // console.log("Upload file is too big.Max allowed is 1Mb", selectedFile?.size, errors.passport0)
      // upl.value = "";
    } else {
      console.log("all is ok!!!")
      const oldError = isFileError
      delete oldError[name]
      console.log("-- errx oldError", oldError, name )
      // setIsFileError((prev) => ({ ...prev, [name]: "" }))
      // delete errors[name]
    }
    // console.log("errorsxxx, ", errors, "***")
  };


  const handleNewPerson = (e, inputs) => {
    errorCount = 0
    if (inputs) setPeople(prev => [...prev, inputs])
  }

  const onDisplayNext = (e) => {
    // console.log("------------- errx", Object.values(isFileError).length);
    // console.log("puto", Object.values(isFileError).filter(f => f.));
    if (Object.values(isFileError).length !== 0) return null
    if (e.target.id === "1") return onClick(e)
    if (errorCount) return null
    if (typeof watchItem === "number" && isNaN(watchItem)) return null
    if (watchItem === "") return null
    onClick(e)
  }

  const onSubmitForm = async (data) => {
    let dataCount = Object.keys(data).length
    if (dataCount > 0) {
      if (data) {
        console.log("sending to API: ", data, dataCount);
        const fileInputName = item.inputs.filter(i => i.type === "file")
        console.log("sending file: ", fileInputName, Object.keys(data), Object.values(data));
      }
      const formData = new FormData()
      if (data.passport) formData.append("passport", data.passport[0])
      if (data.utility) formData.append("utility", data.utility[0])
    }
  };

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

        <form className="question-item__inputs" onSubmit={handleSubmit((e) => onSubmitForm(e))}>
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
                              accept="image/jpeg,image/png,application/pdf"
                              className="question-item__input-field"
                              style={{ display: 'none' }}
                              id={"raised-button-file" + segmentIndex + input.id}
                              type="file"
                              name={input.name + segmentIndex}
                              onChange={(e) => onFileUpload(e, input.name + segmentIndex)}

                            />
                            <input
                              id={"raised-button-file" + segmentIndex + input.id}
                              type="hidden"
                              name={input.name + segmentIndex}
                              value={selectedFile[input.name + segmentIndex]?.name || ""}
                              {...register(input.name + segmentIndex, { required: input.required, value: selectedFile[input.name + segmentIndex]?.name || "" })}
                            />

                            <label htmlFor={"raised-button-file" + segmentIndex + input.id} className="question-item__input-field-upload">
                              <Button variant="raised" component="span">
                                <div className="question-item__input-field-upload-placeholder">
                                  {/* {console.log("name...", input.name + segmentIndex, selectedFile[input.name + segmentIndex]?.name)} */}
                                  {selectedFile[input.name + segmentIndex]?.name ? (
                                    selectedFile[input.name + segmentIndex]?.name
                                  ) : input.placeholder}
                                </div>
                                <PhotoCamera color="primary" />
                              </Button>
                            </label>
                          </>
                        }
                        <div className="question-item__error">
                          {/* {console.log("@@@", input.name + segmentIndex, errors, input.type)} */}
                          {/* {input.type === "file" && console.log("!!!!!", selectedFile, isFileError)} */}
                          {/* {input.type === "file" && console.log("*****", input.name, segmentIndex)} */}
                          {/* {console.log("Errors.....", errorCount, watchItem, errors, isFileError, isFileError[input.name + segmentIndex])} */}
                          {/* {console.log("Errors.....", errors[input.name])} */}
                          {/* {console.log("Errors.....watchItem", watchItem)} */}


                          {errors[input.name + segmentIndex] && !isFileError[input.name + segmentIndex] && <span>{input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required</span>}
                          {isFileError[input.name + segmentIndex] && (
                            <span>
                              {isFileError[input.name + segmentIndex]}

                              {/* {errors[input.name + segmentIndex]} */}
                            </span>
                          )}
                          {/* {input?.type === "file" && input.required && !selectedFile[input.name + segmentIndex]?.name && raiseFileError(input.name + segmentIndex)} */}
                          {console.log("200", errors, isFileError)}
                          {/* {console.log(selectedFile?.size, errors[input.name + segmentIndex], errors)} */}
                          
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
