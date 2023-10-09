// loaderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";
import { SLICE_STATUS, DB_NAME } from "../../shared/Constants";

// Create an async thunk for creating accounts

export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (accountData, thunkAPI) => {
    const db = SQLite.openDatabase(DB_NAME);
    try {
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
              console.log("Record inserted successfully");
            } else {
              console.log("Failed to insert record");
            }
            return accountData;
          },
          (_, error) => {
            console.log("ERROR", error);
          }
        );
      });
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAllAccounts = createAsyncThunk(
  "accounts/getAllAccounts",
  async (_, thunkAPI) => {
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
              console.log("getError", error);
              reject(error);
            }
          );
        });
      });
      return data;
    } catch (error) {
      console.log(error.message);
      thunkAPI.rejectWithValue(error);
    }
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
      });
  },
});

export default accountSlice.reducer;
