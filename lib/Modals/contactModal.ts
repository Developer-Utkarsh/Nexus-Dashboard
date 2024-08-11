import mongoose, { Schema, model, models } from "mongoose";

// Contact Schema
const ContactSchema = new Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	email: { type: String, required: true, index: true },
	createdAt: { type: String },

	firstName: { type: String },
	lastName: { type: String },
	message: { type: String },
});

const Contact = models?.contacts || model("contacts", ContactSchema);

export { Contact };
