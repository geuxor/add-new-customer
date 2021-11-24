import React from "react";
import thumbup from "../../images/thumbup.png";
import thumbdown from "../../images/thumbdown.png";

const FaqItem = ({
  showDescription,
  ariaExpanded,
  rotateArrow,
  item,
  index,
  onClick,
  faqInfos,
}) => {
  const onVote = (e, dir) => {
    //call api service to upvote
    console.log("voting ", dir, "for FAQ id", e.target.id);
  };

  return (
    <div className="faq__question-list" key={item}>
      <div
        className={`faq__title ${rotateArrow}`}
        data-qa="faq__title"
        onClick={onClick}
        aria-expanded={ariaExpanded}
        aria-controls={`faq${index + 1}_desc`}
      >
        {item.question}
      </div>
      <div className={`faq__desc ${showDescription}`}>
        <div className="faq__answer">{item.answer}</div>

        <p className="faq__info">{faqInfos.info}</p>
        <div className="faq__info__thumbs">
          <img
            id={item.id}
            onClick={(e) => onVote(e, 1)}
            src={thumbup}
            alt=""
            className="faq__vote faq__space"
          />
          <img
            id={item.id}
            onClick={(e) => onVote(e, -1)}
            src={thumbdown}
            alt=""
            className="faq__vote"
          />
        </div>
      </div>
    </div>
  );
};
export default FaqItem;
