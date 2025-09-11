import { Schema, model, Types } from "mongoose";
import { ITour, ITourtype } from "./tour.interface";
import { IDivision } from "../divisions/divisions.interface";


const divisionSchema = new Schema<IDivision>({
    name: { type: String, required: true, unique: true },
}, { timestamps: true });

export const Division = model<IDivision>("Division", divisionSchema);


const tourTypeSchema = new Schema<ITourtype>({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true,
})


export const TourType = model<ITourtype>("TourType", tourTypeSchema)


const tourSchema = new Schema<ITour>({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    images: { type: [String], default: [] },
    location: { type: String },
    costFrom: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    tourPlan: { type: [String], default: [] },
    maxGuest: { type: Number },
    minAge: { type: Number },
    state: { type: Schema.Types.ObjectId, ref: "State", required: true },
    division: { type: Schema.Types.ObjectId, ref: "Division", required: true },
    tourType: { type: Schema.Types.ObjectId, ref: "TourType", required: true },
}, {
    timestamps: true
});


const Tour = model<ITour>("Tour", tourSchema);
export default Tour;
