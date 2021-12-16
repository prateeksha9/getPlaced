const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    batch: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Placed", "Not Placed"],
      required: true,
    },
    dsa_score: {
      type: String,
      //   required: true,
    },
    webD_score: {
      type: String,
      //   required: true,
    },
    react_score: {
      type: String,
      //   required: true,
    },
    interviews: [
      {
        company: {
          type: String,
          // unique: true,
          //   required: true,
        },
        date: {
          type: String,
          //   required: true,
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

// tell mongoose that User is a model and needs to be exported
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
