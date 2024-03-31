import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "UserData",
        })
        .then((e) => console.log(`Database connected to ${e.connection.host}`))
        .catch((e) => console.log(e));
};
