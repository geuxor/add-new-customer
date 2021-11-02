import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const QuestionItem = ({
  activeIndex,
  showDescription,
  ariaExpanded,
  fontWeightBold,
  item,
  index,
  questionsAmount,
  onClick,
  questionInfos,
}) => {
  const [people, setPeople] = useState([item.inputs]);
  const [selectedFile, setSelectedFile] = useState({});
  const [isFileError, setIsFileError] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let errorCount = Object.keys(errors).length;

  if (item.inputs) {
    const firstElError =
      item.inputs && item.inputs[0].name + ("" + people.length - 1);
    var watchItem = watch(firstElError, null);
  }

  const onFileUpload = (e, name) => {
    setSelectedFile((prev) => ({ ...prev, [name]: e.target.files[0] }));
    var upl = document.getElementById(e.target?.id);
    if (upl.files[0]?.size > 1048576) {
      setIsFileError((prev) => ({
        ...prev,
        [name]: "Upload file is too big. Max allowed is 1Mb",
      }));
    } else {
      const oldError = isFileError;
      delete oldError[name];
    }
  };

  const handleNewPerson = (e, inputs) => {
    errorCount = 0;
    if (inputs) setPeople((prev) => [...prev, inputs]);
  };

  const onDisplayNext = (e) => {
    if (Object.values(isFileError).length !== 0) return null;
    if (e.target.id === "1") return onClick(e);
    if (errorCount) return null;
    if (typeof watchItem === "number" && isNaN(watchItem)) return null;
    if (watchItem === "") return null;
    onClick(e);
  };

  const onSubmitForm = async (data) => {
    let dataCount = Object.keys(data).length;
    if (dataCount > 0) {
      const formData = new FormData();
      if (data.passport) formData.append("passport", data.passport[0]);
      if (data.utility) formData.append("utility", data.utility[0]);
    }
  };

  return (
    <div className="question-item__list-items" key={item.headline}>
      <div className="question-item__headline-info">
        <div
          className={
            ariaExpanded === "true"
              ? "question-item__headline-nr"
              : index <= activeIndex
              ? "question-item__headline-nr-done"
              : "question-item__headline-nr-disabled"
          }
        >
          {index + 1}
        </div>
        <div
          className={
            index <= activeIndex
              ? "question-item__headline"
              : "question-item__headline-disabled"
          }
          data-qa="question-item__title"
          onClick={index <= activeIndex ? onClick : null}
          aria-expanded={ariaExpanded}
          aria-controls={`question-item${index + 1}_desc`}
        >
          {item.headline}
        </div>
      </div>
      <div className={`question-item__desc ${showDescription}`}>
        <div className="question-item__title">{item.title}</div>
        <div className="question-item__description">{item.description}</div>
        <br />
        <div className="question-item__subdescription">
          {item.subdescription}
        </div>

        <form
          className="question-item__inputs"
          onSubmit={handleSubmit((e) => onSubmitForm(e))}
        >
          {item.id > 1 && (
            <div
              key={item.id}
              className={
                item.inputs
                  ? item.inputs.length === 1
                    ? "question-item__form-center"
                    : "question-item__form"
                  : "question-item__form"
              }
            >
              {item.inputs &&
                people.length > 0 &&
                people.map((segments, segmentIndex) => {
                  return segments.map((input, i) => {
                    return (
                      <Fragment key={segmentIndex + i}>
                        <div
                          className={
                            item.inputs.length === 1
                              ? "question-item__form-group-center"
                              : "question-item__form-group"
                          }
                        >
                          <label className="question-item__label">
                            {input.label}
                            {input.required && " *"}
                          </label>
                          {(input?.type === "text" ||
                            input?.type === "number" ||
                            input?.type === "email") && (
                            <input
                              className="question-item__input-field"
                              type={input.type}
                              name={input.name + segmentIndex}
                              placeholder={input.placeholder}
                              autoComplete="off"
                              id={input.name + segmentIndex}
                              {...register(input.name + segmentIndex, {
                                required: input.required,
                                valueAsNumber: input.type === "number",
                              })}
                            />
                          )}
                          {input?.type === "select" && (
                            <>
                              <select
                                name={input.name + segmentIndex}
                                className="question-item__input-field"
                                {...register(input.name + segmentIndex, {
                                  required: input.required,
                                })}
                              >
                                <option defaultValue=""></option>
                                {input.options.map((o, i) => {
                                  return (
                                    <option key={i} value={o.code}>
                                      {o.name}
                                    </option>
                                  );
                                })}
                              </select>
                            </>
                          )}
                          {input?.type === "file" && (
                            <>
                              <input
                                accept="image/jpeg,image/png,application/pdf"
                                className="question-item__input-field"
                                style={{ display: "none" }}
                                id={
                                  "raised-button-file" + segmentIndex + input.id
                                }
                                type="file"
                                name={input.name + segmentIndex}
                                onChange={(e) =>
                                  onFileUpload(e, input.name + segmentIndex)
                                }
                              />
                              <input
                                id={
                                  "raised-button-file" + segmentIndex + input.id
                                }
                                type="hidden"
                                name={input.name + segmentIndex}
                                value={
                                  selectedFile[input.name + segmentIndex]
                                    ?.name || ""
                                }
                                {...register(input.name + segmentIndex, {
                                  required: input.required,
                                  value:
                                    selectedFile[input.name + segmentIndex]
                                      ?.name || "",
                                })}
                              />

                              <label
                                htmlFor={
                                  "raised-button-file" + segmentIndex + input.id
                                }
                                className="question-item__input-field-upload"
                              >
                                <Button variant="raised" component="span">
                                  <div className="question-item__input-field-upload-placeholder">
                                    {selectedFile[input.name + segmentIndex]
                                      ?.name
                                      ? selectedFile[input.name + segmentIndex]
                                          ?.name
                                      : input.placeholder}
                                  </div>
                                  <PhotoCamera color="primary" />
                                </Button>
                              </label>
                            </>
                          )}
                          <div className="question-item__error">
                            {errors[input.name + segmentIndex] &&
                              !isFileError[input.name + segmentIndex] && (
                                <span>
                                  {input.name.charAt(0).toUpperCase() +
                                    input.name.slice(1)}{" "}
                                  is required
                                </span>
                              )}
                            {isFileError[input.name + segmentIndex] && (
                              <span>
                                {isFileError[input.name + segmentIndex]}
                              </span>
                            )}
                          </div>
                        </div>
                        {segments.length % 2 === 1 &&
                          i === segments.length - 1 && (
                            <div className="question-item__form-group"></div>
                          )}
                      </Fragment>
                    );
                  });
                })}
            </div>
          )}
          {item.allowMultiple && (
            <div className="question-item__add-person">
              <div className="question-item__add-person-button-plus"></div>
              <button
                className="question-item__add-person-button"
                onClick={
                  errorCount
                    ? null
                    : watchItem !== ""
                    ? (e) => handleNewPerson(e, item.inputs)
                    : null
                }
              >
                Add Person
              </button>
            </div>
          )}
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
              id={item.id}
              type="submit"
              onClick={onDisplayNext}
              aria-expanded={ariaExpanded}
              aria-controls={`question-item${index + 1}_desc`}
              data-qa="question-item__buttons__next"
              className={
                index === 0 || index === questionsAmount
                  ? `question-item__buttons ${fontWeightBold}`
                  : `question-item__buttons__next ${fontWeightBold}`
              }
            >
              {index === 0
                ? "Start"
                : index === questionsAmount
                ? "Close"
                : "Next"}
            </button>
          </div>
        </form>
        {item.id > 1 && (
          <p className={`question-item__info`}>{questionInfos.info}</p>
        )}
      </div>
    </div>
  );
};
export default QuestionItem;
