export const PATHS = {
  DRAWER: "Drawer",
  HOME: "Home",
  ACCOUNT: "Accounts",
  MOMENT: "Moment",
  FORMS: "Forms",
  REPORT_BY_YEAR: "Report by year",
  REPORT_BY_CATEGORY: "Report by category",
  CATEGORY: "Category",
};

export const HEADER_TITLE = {
  HOME: "Home",
  ACCOUNT: "Accounts",
  CATEGORY: "Category",
};

export const ACCOUNT_TYPES = ["Income", "Expense"];

export const CURRENCY_TYPES = ["INR", "USD"];

export const SLICE_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

export const DB_NAME = "Daily_Expense_Manager.db";

export const DROPDOWN_OPTIONS = (label, value, icon) => {
  return { label: label, value: value, icon: icon };
};

export const MESSAGES = {
  inserted: "Record inserted successfully",
  failedToInsert: "Failed to insert record",
  updated: "Record updated successfully",
  failedToUpdate: "Failed to update record",
  deleted: "Record deleted successfully",
  failedToDelete: "Failed to delete record",
};
