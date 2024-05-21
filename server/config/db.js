import mongoose from "mongoose";
import keys from "./keys.js";

// MongoDB options
const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

// Connect to MongoDB
mongoose
  .connect(keys.mongoURI, options)
  .then(() => {
    console.log("Connection to MongoDB has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to MongoDB:", err);
  });

// Export mongoose connection
export default mongoose.connection;