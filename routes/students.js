const express = require("express");
const router = express.Router();

const studentController = require("../controllers/student_controller");

router.get("/addStudent", studentController.addStudent);
router.post("/createStudent", studentController.createStudent);
router.post("/editStudent", studentController.updateStudent);
router.get(`/show-student-details/:id`, studentController.studentDetails);
router.get("/edit-student-details/:id", studentController.editStudentDetails);

module.exports = router;
