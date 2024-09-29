const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// สร้าง Schema สำหรับ Course
const Course = sequelize.define("course", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instructor: {
    type: DataTypes.STRING,
    allowNull: false  
  }
});

// ซิงค์ตาราง (สร้างตารางถ้ายังไม่มี)
Course.sync({ force: false })
  .then(() => {
    console.log("Table 'Course' created or already exists");
  })
  .catch((error) => {
    console.log("Error creating table", error);
  });

module.exports = Course;
