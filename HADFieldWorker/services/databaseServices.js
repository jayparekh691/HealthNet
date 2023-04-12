import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.db");

export const cleanDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "drop table if exists appointment",
        null,
        (_, success) => {
          tx.executeSql(
            "drop table if exists medicaldata",
            null,
            (_, success) => {
              resolve("dropped 2 tables");
            },
            (_, error) => {
              reject("error in query 2");
            }
          );
        },
        (_, error) => {
          reject("error in query 1");
        }
      );
    });
  });
};

export const createTables = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists appointment (address text, age integer, city text, date text, f_id integer, gender text, instruction text, isvisited integer, mobilenumber text, name text, otp text, pincode integer, prescription text, state text, town text, v_id integer primary key not null);",
        [],
        (_, success) => {
          tx.executeSql(
            "create table if not exists medicaldata (bp text, date text, f_id integer, isvisited integer, photo text, sugar_level text, temperature text, v_id integer primary key not null);",
            [],
            (_, sucess) => {
              resolve("created 2 tables");
            },
            (_, error) => {
              reject("error in creating medicaldata table");
            }
          );
        },
        (_, error) => {
          reject("error in creating appointment table");
        }
      );
    });
  });
};

export const insertAppointments = (data) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into appointment values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.address,
            data.age,
            data.city,
            data.date,
            data.f_id,
            data.gender,
            data.instruction,
            data.isvisited === false ? 0 : 1,
            data.mobilenumber,
            data.name,
            data.otp,
            data.pincode,
            data.prescription,
            data.state,
            data.town,
            data.v_id,
          ]
        );
      },
      (_, error) => {
        console.log("error in insert data in appointment table");
        reject(error);
      },
      (_, success) => {
        console.log("data inserted in appointment table");
        resolve(success);
      }
    );
  });
};

export const insertMedicalData = (data) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into medicaldata values (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.bp,
            data.date,
            data.f_id,
            data.isvisited,
            data.photo,
            data.sugar_level,
            data.temperature,
            data.v_id,
          ]
        );
      },
      (_, error) => {
        console.log("error in insert data in medicaldata table");
        reject(error);
      },
      (_, success) => {
        console.log("data inserted in medicaldata table");
        resolve(success);
      }
    );
  });
};

export const removeRecordFromAppointmentTable = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "delete from appointment where v_id = ?",
        [id],
        (_, success) => {
          console.log(`record ${id} removed from appointment table.`);
          resolve(success);
        },
        (_, error) => {
          console.log("error record removed");
          reject(error);
        }
      );
    });
  });
};

export const removeRecordFromMedicalDataTable = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "delete from medicaldata where v_id = ?",
        [id],
        (_, success) => {
          console.log("record removed");
          resolve(success);
        },
        (_, error) => {
          console.log("error record removed");
          reject(error);
        }
      );
    });
  });
};

export const getAppointmentFromTable = async (loadData) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from appointment where isvisited = 0",
        [],
        (_, { rows: { _array } }) => {
          loadData(_array);
        }
      );
    },
    (_, error) => {
      console.log("error in loading appointment table");
    },
    (_, success) => {
      console.log("loaded appointment list");
    }
  );
};

export const getMedicalDataFromTable = async (loadData) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from medicaldata",
        [],
        (_, { rows: { _array } }) => {
          console.log("data length", _array.length);
          loadData(_array);
        }
      );
    },
    (_, error) => {
      console.log("error in loading medicaldata table");
    },
    (_, success) => {
      console.log("loaded medicaldata list");
    }
  );
};
