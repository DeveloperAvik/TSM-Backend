import { IAuthProvider, isActive, isDeleted, isVerified, IUser, Role } from "./user.interface";
import { model, Schema } from "mongoose";


const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
},
    {
        versionKey: false,
        _id: false
    });


const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phoneNumber: { type: String },
    picture: { type: String },
    address: { type: String },
    isDeleted: { type: String, enum: Object.values(isDeleted), default: isDeleted.UNDELETED },
    isActive: { type: String, enum: Object.values(isActive), default: isActive.ACTIVE },
    isVerified: { type: String, enum: Object.values(isVerified), default: isVerified.UNVERIFIED },
    role: { type: String, enum: Object.values(Role), default: Role.USER },

    auths: [authProviderSchema],

    // bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    // guides: [{ type: Schema.Types.ObjectId, ref: "Guide" }]
}, {
    timestamps: true,
    versionKey: false
})


export const User = model<IUser>("User", userSchema);