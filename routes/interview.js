const express = require("express");
const router = express.Router();

const interviewController = require("../controllers/interview_controller");
// const studentController = require("../controllers/student_controller");

router.get("/addInterview", interviewController.addInterview);
router.post("/createInterview", interviewController.createInterview);
// router.post("/editStudent", studentController.updateStudent);
router.get("/show-interview-details/:id", interviewController.interviewDetails);
// router.get("/edit-student-details/:id", studentController.editStudentDetails);

module.exports = router;
