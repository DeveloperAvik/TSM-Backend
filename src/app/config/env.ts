import dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
    nodeEnv: "development" | "production" | "test";
    port: string;
    mongodbUrl: string;
}

const loasEnvVars = (): EnvVars => {

    const requiredVars: string[] = ['NODE_ENV', 'PORT', 'MONGODB_URL'];

    requiredVars.forEach((varName) => {
        if (!process.env[varName]) {
            throw new Error(`Environment variable ${varName} is not set`);
        }
    });

    return {
        nodeEnv: process.env.NODE_ENV as "development",
        port: process.env.PORT as string,
        mongodbUrl: process.env.MONGODB_URL as string,
    };
};

export const envVars: EnvVars = loasEnvVars(); 