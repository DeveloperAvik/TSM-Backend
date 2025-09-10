import { Types } from "mongoose";

export enum Role {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    USER = "user",
    GUIDE = "guide"
}

export interface IAuthProvider {
    provider: "google" | "credentials";
    providerId: string;
}

export enum isActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export enum isVerified {
    VERIFIED = "VERIFIED",
    UNVERIFIED = "UNVERIFIED"
}

export enum isDeleted {
    DELETED = "DELETED",
    UNDELETED = "UNDELETED"
}

export interface IUser {
    _id?: Types.ObjectId
    name: string;
    email: string;
    password?: string;
    phoneNumber?: string;
    picture?: string;
    address?: string;
    isDeleted?: isDeleted;
    isActive?: isActive;
    isVerified?: isVerified;
    role: Role;

    auths: IAuthProvider[];

    bookings?: Types.ObjectId[]; // Reference to Booking model
    guides?: Types.ObjectId[]
}