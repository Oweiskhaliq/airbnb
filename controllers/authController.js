const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "login",
    currentPage: "login",
    errorMassages: [],
    oldInput: { email: "" },
    isLoggedIn: false,
    user: {},
  });
};
// get signups
exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    currentPage: "signup",
    isLoggedIn: false,
    errorMassages: "",
    oldInput: { firstName: "", lastName: "", email: "", userType: "" },
    user: {},
  });
};

//post login
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  //finding email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).render("auth/login", {
      pageTitle: "login",
      currentPage: "login",
      errorMassages: ["This Email is not register."],
      oldInput: { email },
      isLoggedIn: false,
      user: {},
    });
  }
  // decrept the password
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(404).render("auth/login", {
      pageTitle: "login",
      currentPage: "login",
      errorMassages: ["Invalid password."],
      oldInput: { email },
      isLoggedIn: false,
      user: {},
    });
  }
  // res.cookie("isLoggedIn", true);
  req.session.isLoggedIn = true;
  req.session.user = user;
  //save the session
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  // res.clearCookie("isLoggedIn");
  // res.cookie("isLoggedIn", false);
  req.session.destroy(() => res.redirect("/login"));
};

//post Signup
exports.postSignup = [
  // validation
  //first names validator
  check("firstName")
    .notEmpty()
    .withMessage("This field is required.")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First Name should be greater than 2 characters.")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First Name should contain only letters."),
  //last names validator
  check("lastName")
    .matches(/^[A-Za-z]*$/)
    .withMessage("First Name should contain only letters."),
  //email
  check("email").isEmail().normalizeEmail(),
  //password
  check("password")
    .isLength({ min: 5 })
    .withMessage("Password must contain at least 5 characters")
    .matches(/[a-z]/)
    .withMessage("Password must have at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must have at least one uppercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must have at least one special character")
    .trim(),
  //confirmpassword
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password and Confirm Password must match");
    }
    return true;
  }),
  // userType
  check("userType")
    .notEmpty()
    .withMessage("User type is Required")
    .isIn(["guest", "host"])
    .withMessage("invalid user Type"),
  // terms and codition
  check("terms")
    .notEmpty()
    .withMessage("Please accept the terms and condition")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("error Please accept the terms and condition");
      }
      return true;
    }),
  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).render("auth/signup", {
        pageTitle: "SignUp",
        currentPage: "signup",
        isLoggedIn: false,
        errorMassages: errors.array().map((err) => err.msg),
        oldInput: {
          firstName,
          lastName,
          email,
          userType,
        },
        user: {},
      });
    }
    // hashing password
    bcrypt
      .hash(password, 12)
      .then((hashPassword) => {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashPassword,
          userType,
        });
        // save to database
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(404).render("auth/signup", {
          pageTitle: "SignUp",
          currentPage: "signup",
          isLoggedIn: false,
          errorMassages: [err.errmsg],
          oldInput: {
            firstName,
            lastName,
            email,
            userType,
          },
          user: {},
        });
      });
  },
];
