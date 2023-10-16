export const PATHS = {
  DRAWER: "Drawer",
  HOME: "Home",
  ACCOUNT: "Accounts",
  MOMENT: "Moment",
  FORMS: "Forms",
  REPORT_BY_YEAR: "Report by year",
  REPORT_BY_CATEGORY: "Report by category",
  SETTINGS: "Settings",
};

export const HEADER_TITLE = {
  HOME: "Home",
  Accounts: "Accounts",
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
