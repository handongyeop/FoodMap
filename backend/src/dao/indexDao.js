const { pool } = require("../../config/database");

exports.selectRestaurants = async function (connection, category) {
  // 쿼리로 하는 방법
  const selectAllRestaurantsQuery = `SELECT title, address, category, videoUrl FROM T_RESTAURANT_INFO WHERE status = 'A';`;
  const selectRestaurantsByCategoryQuery = `SELECT title, address, category, videoUrl FROM T_RESTAURANT_INFO WHERE status = 'A' AND category = ?;`;
  const Params = [category];

  const Query = category
    ? selectRestaurantsByCategoryQuery
    : selectAllRestaurantsQuery;

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.isValidStudentIdx = async function (connection, studentIdx) {
  const Query = `SELECT * FROM Students WHERE studentIdx = ? AND status = 'A';`;
  const Params = [studentIdx];

  const [rows] = await connection.query(Query, Params);

  if (rows < 1) {
    return false;
  }

  return true;
};

exports.deleteStudent = async function (connection, studentIdx) {
  const Query = `UPDATE Students
  SET status = 'D'
  WHERE studentIdx = ?`;
  const Params = [studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.updateStudents = async function (
  connection,
  studentIdx,
  studentName,
  major,
  birth,
  address
) {
  const Query = `UPDATE Students
  SET studentName = ifnull(?, studentName), major = ifnull(?, major),
  birth = ifnull(?, birth), address = ifnull(?, address)
  WHERE studentIdx = ?`;
  const Params = [studentName, major, birth, address, studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.insertStudents = async function (
  connection,
  studentName,
  major,
  birth,
  address
) {
  const Query = `INSERT INTO Students(studentName,
    major,
    birth,
    address) values(?, ?, ?, ?);`;
  const Params = [studentName, major, birth, address];

  const rows = await connection.query(Query, Params);

  return rows;
};

exports.selectStudents = async function (connection, studentIdx) {
  // 쿼리로 하는 방법
  // const selectAllStudentsQuery = `SELECT * FROM Students;`;
  // const selectStudentByNameQuery = `SELECT * FROM Students where studentName = ?;`;
  // const Params = [studentName];

  // let Query = studentName ? selectStudentByNameQuery : selectAllStudentsQuery;

  // // if (!studentName) {
  // //   Query = selectAllStudentsQuery;
  // // } else {
  // //   Query = selectStudentByNameQuery;
  // // }

  // PathVariable로 하는 방법
  const Query = `SELECT * FROM Students where studentIdx = ?;`;
  const Params = [studentIdx];

  const rows = await connection.query(Query, Params);

  return rows;
};

// 예시 코드
// exports.exampleDao = async function (connection, params) {
//   const Query = `SELECT * FROM Students;`;
//   const Params = [];

//   const rows = await connection.query(Query, Params);

//   return rows;
// };
