import dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
    nodeEnv: "development" | "production" | "test";
    port: string;
    mongodbUrl: string;
    BCRYPT_SALT_ROUND: string;
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string
}

const loasEnvVars = (): EnvVars => {

    const requiredVars: string[] = ['NODE_ENV', 'PORT', 'MONGODB_URL', 'BCRYPT_SALT_ROUND', 'JWT_ACCESS_SECRET', 'JWT_ACCESS_EXPIRES'];

    requiredVars.forEach((varName) => {
        if (!process.env[varName]) {
            throw new Error(`Environment variable ${varName} is not set`);
        }
    });

    return {
        nodeEnv: process.env.NODE_ENV as "development",
        port: process.env.PORT as string,
        mongodbUrl: process.env.MONGODB_URL as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string
    };
};

export const envVars: EnvVars = loasEnvVars(); 