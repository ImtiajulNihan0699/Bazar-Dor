import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db("bazar-dor-app");

export const auth = betterAuth({
  baseURL: "https://bazar-dor-seven-nu.vercel.app",
  trustedOrigins: [
    "https://bazar-dor-seven-nu.vercel.app",
  ],
  verification: {
		storeInDatabase: true, // Adds DB fallback if using secondaryStorage
	},
     emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string, 
        }, 
           github: { 
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET as string, 
        }, 
      },
  database: mongodbAdapter(db, {
    client,
  }),
 
});