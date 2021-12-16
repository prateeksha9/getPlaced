const Student = require("../models/student");
const Interview = require("../models/interview");

module.exports.addStudent = function (req, res) {
  if (req.cookies.user_id) {
    return res.render("add_student", {
      title: "Add Student",
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

module.exports.createStudent = function (req, res) {
  Student.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Cannot find the student");
      return res.redirect("back");
    }

    if (!user) {
      const dsa_score = req.body.dsa_score;
      const webD_score = req.body.webD_score;
      const react_score = req.body.react_score;
      if (
        dsa_score < 0 ||
        dsa_score > 100 ||
        webD_score > 100 ||
        webD_score < 0 ||
        react_score < 0 ||
        react_score > 100
      ) {
        return res.redirect("back");
      }
      Student.create(
        {
          name: req.body.name,
          email: req.body.email,
          batch: req.body.batch,
          status: req.body.status,
          dsa_score: req.body.dsa_score,
          webD_score: req.body.webD_score,
          react_score: req.body.react_score,
          // interviews: [
          //   {
          //     company: req.body.company,
          //     date: req.body.date,
          //     result: req.body.result,
          //   },
          // ],
        },
        function (err, user) {
          if (err) {
            console.log("student not added", err);
            return res.redirect("back");
          }

          return res.redirect("/users/profile");
        }
      );
    } else {
      console.log("student is already Added");
      return res.redirect("/users/profile");
    }
  });
};

module.exports.studentDetails = function (req, res) {
  console.log(req.params.id);
  Student.findOne({ _id: req.params.id }, function (err, student) {
    if (err) {
      console.log("Student not found", err);
      return "/users/profile";
    }
    return res.render("student_details", {
      title: "MY page",
      student: student,
    });
  });
};

module.exports.editStudentDetails = function (req, res) {
  console.log(req.params.id);
  Student.findOne({ _id: req.params.id }, function (err, student) {
    if (err) {
      console.log("Student not found", err);
      return res.redirect("/users/profile");
    }
    return res.render("edit_student", {
      title: "MY page",
      student: student,
    });
  });
};
module.exports.updateStudent = function (req, res) {
  Student.findOne({ email: req.body.email }, function (err, student) {
    if (err) {
      console.log("Student not found", err);
      return res.redirect("back");
    }
    if (student) {
      if (req.body.status != undefined && req.body.status != student.status) {
        student.updateOne(
          { email: req.body.email },
          { status: req.body.status }
        );
        student.save();

        console.log("student status updated");
        // return res.redirect("back");
      }

      if (req.body.company != undefined) {
        console.log(req.body.company, req.body.date, req.body.result);

        Student.updateOne(
          { email: req.body.email },
          {
            $push: {
              interviews: [
                {
                  company: req.body.company,
                  date: req.body.date,
                  result: req.body.result,
                },
              ],
            },
          },
          function (err, update) {
            if (err) {
              console.log(err);
            }
          }
        );
        student.save();
        req.flash("success", "Student Updated Successfully");
      }

      Interview.findOne(
        { company_name: req.body.company },
        function (err, company) {
          if (err) {
            console.log("cannot find company");
            return res.redirect("back");
          }
          if (company) {
            Interview.updateOne(
              { company_name: req.body.company },
              {
                $push: {
                  students: [
                    {
                      student: student._id,
                      result: "Interview Pending",
                    },
                  ],
                },
              },
              function (err, company) {
                if (err) {
                  console.log(err);
                }
              }
            );
            company.save();
          } else {
            Interview.create(
              {
                company_name: req.body.company,
                date: req.body.date,
                students: [
                  {
                    student: student._id,
                    result: "Interview Pending",
                  },
                ],
              },
              function (err, new_interview) {
                if (err) {
                  console.log("no interview create in db", err);
                }
              }
            );
          }
        }
      );
      // console.log("student status updated");
      return res.redirect("back");
    }else {
      req.flash(
        "error",
        "Student not found. Enter correct Email ID of the student"
      );
    }
    console.log("student found");
    return res.redirect("back");
  });
};


