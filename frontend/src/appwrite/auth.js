import configVariables from "../configVariables/configVariables";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(configVariables.appwriteUrl)
            .setProject(configVariables.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // Create Account
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            if (userAccount) {
                // Auto login after signup
                return await this.login({ email, password });
            }

            return userAccount;

        } catch (error) {
            console.log("Appwrite createAccount error:", error);
            throw error;
        }
    }

    // Login User
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.log("Appwrite login error:", error);
            throw error;
        }
    }

    // Get Current User
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(
                "Appwrite service :: getCurrentUser :: error",
                error
            );
            return null;
        }
    }

    // Logout User
    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(
                "Appwrite service :: logout :: error",
                error
            );
        }
    }
}

const authService = new AuthService();

export default authService;