// loaderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";
import { SLICE_STATUS, DB_NAME, MESSAGES } from "../../shared/Constants";
import { startLoading, stopLoading } from "./loaderSlice";

// Create an async thunk for creating accounts

export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (accountData, thunkAPI) => {
    try {
      thunkAPI.dispatch(startLoading());
      const db = SQLite.openDatabase(DB_NAME);
      const {
        accountName,
        description,
        icon,
        type,
        currency,
        balance,
        limit,
        positiveOpening,
        showAccount,
      } = accountData;

      return new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO accounts (accountName, description, icon, currency, balance, limits, types,positiveOpening, showAccount)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              accountName,
              description,
              icon,
              currency,
              parseFloat(balance),
              parseFloat(limit),
              type,
              positiveOpening,
              showAccount,
            ],
            (_, results) => {
              if (results.rowsAffected > 0) {
                const resp = {
                  success: true,
                  message: MESSAGES.inserted,
                  statuscode: 200,
                };
                thunkAPI.dispatch(stopLoading());
                resolve(resp);
              } else {
                const resp = {
                  success: false,
                  errorMessage: MESSAGES.failedToInsert,
                  statuscode: 500,
                };
                thunkAPI.dispatch(stopLoading());
                resolve(resp);
              }
            },
            (_, error) => {
              const resp = {
                success: false,
                errorMessage: error,
                statuscode: 500,
              };
              thunkAPI.dispatch(stopLoading());
              reject(resp);
            }
          );
        });
      });
    } catch (error) {
      const resp = {
        success: false,
        errorMessage: error.message,
        statuscode: 500,
      };
      thunkAPI.dispatch(stopLoading());
      return thunkAPI.rejectWithValue(resp);
    }
  }
);

export const getAllAccounts = createAsyncThunk(
  "accounts/getAllAccounts",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(startLoading());
    try {
      const db = SQLite.openDatabase(DB_NAME);
      let data;
      await new Promise((resolve, reject) => {
        db.transaction(async (tx) => {
          await tx.executeSql(
            `SELECT * FROM accounts`,
            [],
            (_, results) => {
              data = results.rows._array;
              resolve(data);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });
      thunkAPI.dispatch(stopLoading());
      return data;
    } catch (error) {
      thunkAPI.dispatch(stopLoading());
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "accounts/updateAccount",
  (accountData, thunkAPI) => {
    return new Promise((resolve, reject) => {
      try {
        thunkAPI.dispatch(startLoading());
        const db = SQLite.openDatabase(DB_NAME);
        const {
          id,
          accountName,
          description,
          icon,
          type,
          currency,
          balance,
          limit,
          positiveOpening,
          showAccount,
        } = accountData;

        db.transaction((tx) => {
          tx.executeSql(
            `UPDATE accounts 
             SET accountName = ?, description = ?, icon = ?, currency = ?, balance = ?, limits = ?, types = ?, positiveOpening = ?, showAccount = ?
             WHERE id = ?`,
            [
              accountName,
              description,
              icon,
              currency,
              parseFloat(balance),
              parseFloat(limit),
              type,
              positiveOpening,
              showAccount,
              id,
            ],
            (_, results) => {
              if (results.rowsAffected > 0) {
                const resp = {
                  success: true,
                  message: MESSAGES.updated,
                  statuscode: 200,
                };
                thunkAPI.dispatch(stopLoading());
                resolve(resp);
              } else {
                const resp = {
                  success: false,
                  errorMessage: MESSAGES.failedToUpdate,
                  statuscode: 500,
                };
                thunkAPI.dispatch(stopLoading());
                resolve(resp);
              }
            },
            (_, error) => {
              const resp = {
                success: false,
                errorMessage: error,
                statuscode: 500,
              };
              thunkAPI.dispatch(stopLoading());
              reject(resp);
            }
          );
        });
      } catch (error) {
        const resp = {
          success: false,
          errorMessage: error.message,
          statuscode: 500,
        };
        thunkAPI.dispatch(stopLoading());
        reject(resp);
      }
    });
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  (accountId, thunkAPI) => {
    return new Promise((resolve, reject) => {
      thunkAPI.dispatch(startLoading());
      const db = SQLite.openDatabase(DB_NAME);
      try {
        db.transaction((tx) => {
          tx.executeSql(
            `DELETE FROM accounts WHERE id = ?`,
            [accountId],
            (_, results) => {
              if (results.rowsAffected > 0) {
                const resp = {
                  success: true,
                  message: MESSAGES.deleted,
                  statuscode: 200,
                };
                thunkAPI.dispatch(stopLoading());
                resolve(resp);
              } else {
                const resp = {
                  success: false,
                  errorMessage: MESSAGES.failedToDelete,
                  statuscode: 500,
                };
                thunkAPI.dispatch(stopLoading());
                resolve(resp);
              }
            },
            (_, error) => {
              const resp = {
                success: false,
                errorMessage: error,
                statuscode: 500,
              };
              thunkAPI.dispatch(stopLoading());
              reject(resp);
            }
          );
        });
      } catch (error) {
        const resp = {
          success: false,
          errorMessage: error.message,
          statuscode: 500,
        };
        thunkAPI.dispatch(stopLoading());
        reject(resp);
      }
    });
  }
);

const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    accounts: [],
    status: SLICE_STATUS.IDLE,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAccount.pending, (state) => {
        state.status = SLICE_STATUS.LOADING;
      })
      .addCase(addAccount.fulfilled, (state) => {
        state.status = SLICE_STATUS.SUCCEEDED;
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(getAllAccounts.pending, (state) => {
        state.status = SLICE_STATUS.LOADING;
      })
      .addCase(getAllAccounts.fulfilled, (state, action) => {
        state.status = SLICE_STATUS.SUCCEEDED;
        state.accounts = action.payload;
      })
      .addCase(getAllAccounts.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.status = SLICE_STATUS.LOADING;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.status = SLICE_STATUS.SUCCEEDED;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(updateAccount.pending, (state) => {
        state.status = SLICE_STATUS.LOADING;
      })
      .addCase(updateAccount.fulfilled, (state) => {
        state.status = SLICE_STATUS.SUCCEEDED;
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.status = SLICE_STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

export default accountSlice.reducer;
