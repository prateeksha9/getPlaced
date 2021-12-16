const Student = require("../models/student");
const fs = require("fs");

module.exports.downloadCSV = async function (req, res) {
  try {
    const arrayStudent = await Student.find({});
    let serialNumber = 1,
      entry = "";
    let fileData =
      "S.No, Name, Email, Batch, Status, DSA, WebD, React, Interview, Date, Result";
    for (student of arrayStudent) {
      entry =
        serialNumber +
        "," +
        student.name +
        "," +
        student.email +
        "," +
        student.batch +
        "," +
        student.status +
        "," +
        student.dsa_score +
        "," +
        student.webD_score +
        "," +
        student.react_score;
      if (student.interviews.length > 0) {
        for (interview of student.interviews) {
          entry +=
            "," +
            interview.company +
            "," +
            interview.date.toString() +
            "," +
            interview.result;
        }
      }
      serialNumber++;
      fileData += "\n" + entry;
    }
    const file = fs.writeFile(
      "assets/data.csv",
      fileData,
      function (err, data) {
        if (err) {
          console.log(err);
          return res.redirect("back");
        }
        req.flash("success", "Details Downloaded Successfully!!");
        return res.download("assets/data.csv");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
