const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Debe especificar un email."],
        validate: {
            message: "Este email ya está registrado",
            validator: async (email) => {
                // const items = await mongoose.models["User"].count({ email });
                const items = await mongoose.model("User").count({ email });
                return items === 0;
            }
        }
    },
    password: {
        type: String,
        required: [true, "Debe incluir una contraseña"]
    },
    role : {
        type: String,
        default: "User",
        enum: ["Admin", "User"]
    }
}, {timestamps: true})


module.exports = mongoose.model('User', userSchema);