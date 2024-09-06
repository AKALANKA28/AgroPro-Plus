import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const StockSchema = yup.object({
  ferti_name: yup
    .string()
    .required("Fertilizer Name is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be a positive number")
    .required("Stock Amount is required")
    .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value)), // Transform string to number
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be a positive number")
    .required("Price is required")
    .transform((value, originalValue) => (originalValue.trim() === "" ? undefined : value)), // Transform string to number
  description: yup
    .string()
    .required("Description is required"),
  availability: yup
    .string()
    .required("Availability status is required"),
});

const StockForm = ({ handleSubmit, initialData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "",
      ferti_name: initialData ? initialData.ferti_name : "",
      amount: initialData ? initialData.amount : "",
      price: initialData ? initialData.price : "",
      description: initialData ? initialData.description : "",
      availability: initialData ? initialData.availability : "",
    },
    validationSchema: StockSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    if (name === "ferti_name") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      formik.setFieldValue(name, capitalizedValue);
    } else {
      formik.handleChange(e);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="ferti_name" className="form-label">
                Fertilizer Name
              </label>
              <input
                type="text"
                className="form-control"
                name="ferti_name"
                placeholder="Fertilizer Name"
                value={formik.values.ferti_name}
                onChange={handleNameChange}  
                onBlur={formik.handleBlur}
              />
              {formik.touched.ferti_name && formik.errors.ferti_name && (
                <div className="error">{formik.errors.ferti_name}</div>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Stock Amount 
              </label>
              <input
                type="number"
                className="form-control"
                name="amount"
                placeholder="Stock Amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.amount && formik.errors.amount && (
                <div className="error">{formik.errors.amount}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price (per 1kg)
              </label>
              <input
                type="number"
                className="form-control"
                name="price"
                placeholder="Price (per 1kg)"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="error">{formik.errors.price}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="error">{formik.errors.description}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="availability" className="form-label">
                Availability Status
              </label>
              <input
                type="text"
                className="form-control"
                name="availability"
                placeholder="Availability Status"
                value={formik.values.availability}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.availability && formik.errors.availability && (
                <div className="error">{formik.errors.availability}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end border-top">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );
};

export default StockForm;
