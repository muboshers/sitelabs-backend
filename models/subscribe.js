import mongoose from "mongoose";
const subscribeSchema = mongoose.Schema({
  email: String,
});

const subscribeModel = mongoose.model("subscribeSchema", subscribeSchema);
export default subscribeModel;
