import mongoose, { Schema, model, models } from "mongoose";

// Contact Schema
const AdminSchema = new Schema({
	_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
	email: { type: String, required: true, index: true },
});

const Admins = models?.admins || model("admins", AdminSchema);

export { Admins };
