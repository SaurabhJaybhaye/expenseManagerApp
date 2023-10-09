import * as Yup from "yup";
export const addAccountSchema = Yup.object().shape({
  accountName: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  icon: Yup.string().required("Icon is required"),
  type: Yup.string().required("Select Type"),
  currency: Yup.string().required("Select currency"),
  balance: Yup.number().required("Balance is required"),
  limit: Yup.number().required("Limit is required"),
});
