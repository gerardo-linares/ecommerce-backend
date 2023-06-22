import mongoose from "mongoose";

async function connect() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.URL_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

export default connect;
