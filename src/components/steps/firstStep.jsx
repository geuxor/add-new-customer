import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const FirstStep = (props) => {
  
  const { user } = props;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  const onSubmit = (data) => {
    props.updateUser(data);
    props.history.push("/second");
  };

  return (
    <div>
      aa
      <motion.div animate={{ scale: 0.5 }} />
    </div>
  );
};

export default FirstStep;
