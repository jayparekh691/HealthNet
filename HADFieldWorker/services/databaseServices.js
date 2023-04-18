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
        "create table if not exists appointment (address text, age integer, bloodPressure integer,city text, date text, followup_id integer, gender text, isvisited integer, mobilenumber text, name text, otp text, pincode integer, prescription text, spo2Level integer, state text, sugarLevel integer, temperature integer, town text, v_id integer primary key not null);",
        [],
        (_, success) => {
          tx.executeSql(
            "create table if not exists medicaldata (spo2Level text, bloodPressure text, date text, f_id integer, isVisited integer, photo text, sugarLevel text, temperature text, v_id integer primary key not null);",
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
          "insert into appointment values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.address,
            data.age,
            data.bloodPressure === false ? 0 : 1,
            data.city,
            data.date,
            data.followup_id,
            data.gender,
            data.isvisited === false ? 0 : 1,
            data.mobilenumber,
            data.name,
            data.otp,
            data.pincode,
            data.prescription,
            data.spo2Level === false ? 0 : 1, //
            data.state,
            data.sugarLevel === false ? 0 : 1, //
            data.temperature === false ? 0 : 1, //
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
          "insert into medicaldata values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.spo2Level,
            data.bloodPressure,
            data.date,
            data.f_id,
            data.isVisited,
            data.photo,
            data.sugarLevel,
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

export const removeAppointmentsWithPID = async (fids) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from appointment where followup_id in (${fids.join(", ")});`,
        [],
        (_, success) => {
          resolve(`appointment with pid ${fids} removed`);
        },
        (_, error) => {
          reject("error pid removed from table");
        }
      );
    });
  });
};
