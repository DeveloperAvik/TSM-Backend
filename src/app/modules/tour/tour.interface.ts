import { Types } from "mongoose";


export interface ITourtype {
    name: string;
}


export interface ITour {
    title: string;
    slug: string;
    description?: string;
    images: string[];
    location?: string;
    costFrom?: number;
    startDate?: Date;
    endDate?: Date;
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    tourPlan?: string[];
    maxGuest?: number;
    minAge?: number;
    state: Types.ObjectId;
    division: Types.ObjectId;
    tourType: Types.ObjectId

}