const Course = require("../models/course.model");

// Create and Save a New Course
exports.create = async (req, res) => {
  const { name, description, instructor } = req.body;

  if (!name || !description || !instructor) {
    return res.status(400).send({
      message: "Name and Description cannot be empty!",
    });
  }

  // Check if the course already exists
  await Course.findOne({ where: { name: name } }).then((course) => {
    if (course) {
      return res.status(400).send({
        message: "Course already exists!",
      });
    }

    // Create a New Course
    const newCourse = {
      name: name,
      description: description,
      instructor: instructor,
    };

    Course.create(newCourse)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message || "Something error occurred creating the course.",
        });
      });
  });
};

// Get all courses
exports.getAll = async (req, res) => {
  await Course.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred retrieving courses.",
      });
    });
};

// Get a course by ID
exports.getById = async (req, res) => {
  const id = req.params.id;

  await Course.findByPk(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Not found Course with id " + id });
      }
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred retrieving the course.",
      });
    });
};

// Update a course
exports.update = async (req, res) => {
  const id = req.params.id;

  await Course.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update Course with id=" +
            id +
            ". Maybe Course was not found or req.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred updating the course.",
      });
    });
};

// Delete a course
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Course.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Course was deleted successfully.",
        });
      } else {
        res.send({
          message: "Cannot delete Course with id " + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something error occurred deleting the course.",
      });
    });
};
