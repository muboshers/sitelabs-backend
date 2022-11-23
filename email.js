import path from "path";
import hbs from "nodemailer-express-handlebars";
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "muboshermuydinov5@gmail.com",
    pass: "htawcusnrrgutfsn",
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

export const sendMessageEmail = (title, email, description, blogTitle) => {
  let mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: title,
    template: "email",
    context: {
      title: blogTitle,
      text: description.slice(0, 45),
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export const sendEmailForContactMessage = (title, email, description, msg) => {
  let mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: title,
    template: "contact",
    context: {
      title: title,
      text: description,
      currentEmail: msg.email,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
