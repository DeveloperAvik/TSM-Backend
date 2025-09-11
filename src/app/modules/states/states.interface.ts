import { model, Schema } from "mongoose";
import { IState } from "./states.model";


const stateSchema = new Schema<IState>({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String }
}, {
    timestamps: true
})


export const State = model<IState>("State", stateSchema)