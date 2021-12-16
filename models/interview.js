const mongoose = require("mongoose");

//schema for the interview
const interviewSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        result: {
          type: String,
          enum: [
            "Selected",
            "Not Selected",
            "On Hold",
            "Absent",
            "Interview Pending",
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
