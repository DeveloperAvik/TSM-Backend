import { Types } from "mongoose";

export interface IDivision {
    name: string;                 
    code?: string;                
    state: Types.ObjectId;        
}
