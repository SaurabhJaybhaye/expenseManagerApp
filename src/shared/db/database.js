import * as SQLite from "expo-sqlite";
import { DB_NAME } from "../Constants";
const db = SQLite.openDatabase(DB_NAME);

export const initDatabase = () => {
  // Account Table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, accountName TEXT UNIQUE, description TEXT, icon TEXT,currency TEXT,balance REAL, types TEXT, limits REAL, positiveOpening INTEGER DEFAULT 1,
      showAccount INTEGER DEFAULT 1);`,
      [],
      () => {
        console.log("Table created successfully");
      },
      (_, error) => {
        console.log("Error creating table:", error);
      }
    );
  });

  //Categories Table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      CategoryName TEXT,
      accountName TEXT,
      type TEXT DEFAULT 'Income',
      FOREIGN KEY (accountName) REFERENCES accounts(accountName)
    )`,
      [],
      () => {
        console.log("Categories created successfully");
      },
      (_, error) => {
        console.log("Error creating Categories table:", error);
      }
    );
  });
  // Income Table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS income (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL,
      accountName TEXT,
      description TEXT,
      date TEXT,
      time TEXT,
      FOREIGN KEY (accountName) REFERENCES accounts(accountName)
    )`,
      [],
      () => {
        console.log("income created successfully");
      },
      (_, error) => {
        console.log("Error creating income table:", error);
      }
    );
  });

  // expenses Table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL,
      accountName TEXT,
      description TEXT,
      date TEXT,
      time TEXT,
      FOREIGN KEY (accountName) REFERENCES accounts(accountName)
    )`,
      [],
      () => {
        console.log("expenses created successfully");
      },
      (_, error) => {
        console.log("Error creating expenses table:", error);
      }
    );
  });

  // Transfer Table
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS transfers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL,
        sourceAccountName TEXT,
        targetAccountName TEXT,
        description TEXT,
        date TEXT,
        time TEXT,
        FOREIGN KEY (sourceAccountName) REFERENCES accounts(accountName),
        FOREIGN KEY (targetAccountName) REFERENCES accounts(accountName)
      )`,
      [],
      () => {
        console.log("Transfer created successfully");
      },
      (_, error) => {
        console.log("Error creating Transfer table:", error);
      }
    );
  });
};

export default db;
