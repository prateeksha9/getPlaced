const Interview = require("../models/interview");
module.exports.addInterview = function (req, res) {
  if (req.cookies.user_id) {
    return res.render("add_interview", {
      title: "Add Student",
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

module.exports.createInterview = function (req, res) {
  console.log(req.body.company_name);
  Interview.findOne(
    { company_name: req.body.company_name },
    function (err, company) {
      if (err) {
        console.log("error in finding the company", err);
        return res.redirect("back");
      }

      if (!company) {
        Interview.create(
          {
            company_name: req.body.company_name,
            date: req.body.interview_date,
            // if(req.body.student != undefined && req.body.result != undefined){
            // students: [
            //   {
            //     student: req.body.student,
            //     result: req.body.result,
            //   },
            // ],
          },
          function (err, new_interview) {
            if (err) {
              console.log("cant create interview", err);
              return res.redirect("back");
            }
            req.flash("success", "Interview Added Successfully");
            return res.redirect("/users/profile");
          }
        );
      } else {
        console.log("interview is already added");
        req.flash("success", "Interview is already added");
        return res.redirect("back");
      }
    }
  );
};

module.exports.interviewDetails = async (req, res) => {
  try {
    const interviews = await Interview.findOne({ _id: req.params.id }).populate(
      "students.student",
      "name"
    );
    // return res.status(200).json({
    //   message: "Here is the list of all the Interviews",
    //   interviews,
    // });
    return res.render("interview_details", {
      title: "MY page",
      interview: interviews,
    });
  } catch (err) {
    console.log("error while fetching all the interviews from the DB!", err);
    return res.status(500).json({
      message: "error while fetching all the interviews from the DB!",
    });
  }
};
