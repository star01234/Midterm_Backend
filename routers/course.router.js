const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const authJwt = require("../middleware/authJwt");

// Create a course
// POST http://localhost:5000/api/v1/courses/
router.post("/",[authJwt.verifyToken, authJwt.isModOrAdmin], courseController.create);

// Get all courses
// GET http://localhost:5000/api/v1/courses/
router.get("/", courseController.getAll);

// Get a course by ID
// GET http://localhost:5000/api/v1/courses/:id
router.get("/:id", [authJwt.verifyToken, authJwt.isModOrAdmin],courseController.getById);

// Update a course
// PUT http://localhost:5000/api/v1/courses/:id
router.put("/:id", [authJwt.verifyToken, authJwt.isModOrAdmin],courseController.update);

// Delete a course
// DELETE http://localhost:5000/api/v1/courses/:id
router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin],courseController.delete);

module.exports = router;
