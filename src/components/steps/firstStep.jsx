import React from "react";
import { useForm } from "react-hook-form";

const FirstStep = (props) => {
  // const { user } = props;
  // const { register, handleSubmit, errors } = useForm({
  //   defaultValues: {
  //     first_name: user.first_name,
  //     last_name: user.last_name
  //   }
  // });
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  console.log("errorrs", errors);

  // const [first_name] = watch(["first_name"]);

  const onSubmit = (data) => {
    // props.updateUser(data);
    console.log("sending to API: ",data);
    // props.history.push("/second");
  };

  return (
    <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <div controlId="form-groups">
        <formgroup controlId="inputs">
          <div className="">
            <label>Company</label>
          </div>
          <input
            type="text"
            name="company"
            placeholder=""
            autoComplete="off"
            {...register("company", { required: true })}
            id="company"
          />
          {errors.company && <span>Company name is required</span>}

          <div className="">
            <label>Country *</label>
          </div>
          <input
            type="text"
            name="country"
            placeholder=""
            autoComplete="off"
            {...register("country", { required: true })}
            id="country"
          />
          {errors.country && <span>Country is required</span>}
        </formgroup>

        <formgroup controlId="inputs">
          <div className="">
            <label>Address *</label>
          </div>
          <input
            type="text"
            name="address"
            placeholder=""
            autoComplete="off"
            {...register("address", { required: true })}
            id="address"
          />
          {errors.country && <span>Country is required</span>}

          <div className="">
            <label>Aparment, suit, etc *</label>
          </div>
          <input
            type="text"
            name="apartment"
            placeholder=""
            autoComplete="off"
            {...register("apartment", { required: true })}
            id="apartment"
          />
          {errors.apartment && <span>Apartment is required</span>}
        </formgroup>
        <formgroup controlId="inputs">
          <div className="">
            <label>Postal code/zip:</label>
          </div>
          <input
            type="text"
            name="postalcode"
            placeholder=""
            autoComplete="off"
            {...register("postalcode", {
              required: true,
              message: "postalcode shit",
            })}
          />
          {errors?.postalcode && (
            <p className="errorMsg">{errors.postalcode.message} postal shit</p>
          )}

          <div>
            <div className="">
              <label htmlFor="city">City *</label>
            </div>
            <input
              name="text"
              placeholder=""
              type="city"
              {...register("city", {
                required: true,
              })}
            />
            {errors.city && <span>City is invalid</span>}
          </div>
        </formgroup>

        <formgroup controlId="inputs">
          <div>
            <label htmlFor="website">Website</label>
          </div>
          <input
            name="website"
            placeholder=""
            type="text"
            {...register("website", {
              required: "This is big shit...!",
              valueAsText: true,
            })}
          />
          {errors?.website && (
            <span>{errors.website.message} - Website is required</span>
          )}

          <div className="">
            <label>Company registration from official register *</label>
          </div>
          <input
            type="text"
            name="registration"
            placeholder=""
            autoComplete="off"
            {...register("registration", { required: true })}
            id="registration"
          />
          {errors.registration && <span>Registration is required</span>}
        </formgroup>
      </div>

      <button variant="primary" type="submit">
        Next
      </button>
    </form>
  );
};

export default FirstStep;
