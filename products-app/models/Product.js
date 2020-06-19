const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Debe indicar el nombre"],
        validate: {
            message: "El nombre ya existe",
            validator: async (name) => {
                const items = await mongoose.models["Product"].count({ name });
                return items < 1;
            }
        }
    },
    image: {
        type: String,
        required: [true, "Debe incluir una imagen del producto."]
    },
    price: {
        type: Number,
        min: [1, "El precio debe ser mayor a 1."]
    },
    description: {
        type: String,
        required: [true, "Debe incluir una descripción."]
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Debe tener un vendedor asociado."]
    }
}, { timestamps: true });

// timestamps agrega dos nuevos campos: cuándo fue creado el documento y cuándo fue actualizado.

module.exports = mongoose.model("Product", productSchema);