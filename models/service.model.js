import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
  title: String,
  serviceImg: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
});

const serviceModel = mongoose.model("serviceModel", serviceSchema);
export default serviceModel;
