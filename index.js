import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUiExpress from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
const options = { format: "A4" };
// import all routes
import blogRouter from "./routes/blog.js";
import adminRouter from "./routes/admin.js";
import serviceRouter from "./routes/service.js";
import subscribeRouter from "./routes/subscribe.js";
import contactRouter from "./routes/contact.js";
import categoryRouter from "./routes/category.js";
import jobRouter from "./routes/job.js";
import hireJobRouter from "./routes/hirejob.js";
import swaggerDoc from "./helpers/swagger-doc.js";
dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
// fixing "413 Request Entity Too Large" errors
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);

app.use(
  cors({
    origin: [
      "https://sitelabs.vercel.app",
      "https://sitelabs-admin.vercel.app",
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "PATCH", "POST", "DELETE"],
  })
);

app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDoc)
);

app.use(express.static("public"));
app.use("/api/blog", blogRouter);
app.use("/api/service", serviceRouter);
app.use("/api/admin", adminRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subscribe", subscribeRouter);
app.use("/api/contact", contactRouter);
app.use("/api/job", jobRouter);
app.use("/api/hirejob", hireJobRouter);
const PORT = process.env.PORT || 5000;
const MONGO_URL =
  "mongodb+srv://mubosher:halima@cluster0.hnvk0fl.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("mogodb succesfully connecyion");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => {
  console.log(`Server has running ${PORT}`);
});
