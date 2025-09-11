import { Schema } from "mongoose";
import { ITour } from "./tour.interface";
import { string } from "zod";


const tourSchema = new Schema<ITour>({
    title: { type: String }
}, {
    timestamps: true
})