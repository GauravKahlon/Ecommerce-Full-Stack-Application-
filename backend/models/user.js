import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: [true, "Please enter your ID"],
        },
        name: {
            type: String,
            required: [true, "Please enter your Name"],
        },
        email: {
            type: String,
            unique: [true, "Email already exists"],
            required: [true, "Please enter your Name"],
            validate: validator.default.isEmail,
        },
        photo: {
            type: String,
            required: [true, "Please add your ID"],
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        gender: {
            type: String,
            enum: ["male", "female"],
            required: [true, "Please choose your Gender"],
        },
        dob: {
            type: String,
            required: [true, "Please enter your DOB"],
        },
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("age").get(() => {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();

    if (today.getMonth < dob.getMonth || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});

export const User = mongoose.model("User", userSchema);
