import mongoose from "mongoose";

function initDb() {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Already Connected");
      return;
    }
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to mongodb"));
  } catch (error) {
    console.log("Error", error);
  }
}

export default initDb;
