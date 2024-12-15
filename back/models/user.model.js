import mongoose from "mongoose";
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, required: false, default: true},
    adress: {type: String, required: false},
    postal: {type: Number, required: false},
    phone: {type: Number, required: false}, 
    role: {type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},  {timestamps: {createdAT: true}
})

userSchema.plugin(mongooseUniqueValidator)
export default mongoose.model("User", userSchema)