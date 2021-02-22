const {
  result
} = require('lodash')
const connection = require('../config/database')

module.exports = {
  login: () => {
    return
  },
  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE email='${email}'`, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  register: (dataUser) => {
    return new Promise((resolve, reject) => {
      connection.query(`INSERT into users set ?`, dataUser, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  modelsGetDetailProfile: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT *
      FROM users WHERE id =${id}`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  modelsUpdatePatchUsers: (data, id) => {
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE users SET ? WHERE id=?`, [data, id],
        (error, result) => {
          if (error) {
            reject(new Error(error))
          } else {
            resolve(result)
          }
        })
    })
  },
  modelsGetAllUsersRedis: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT name,email FROM users`,
        (err, result) => {
          if (err) {
            reject(new Error(err))
          } else {
            resolve(result)
          }
        }
      )
    })
  }
}