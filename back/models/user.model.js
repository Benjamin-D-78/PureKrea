import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator'

userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},  {timestamps: {createdAT: true}
})

userSchema.plugin(mongooseUniqueValidator)
export default mongoose.model("User", userSchema)