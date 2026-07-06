const configVariables = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    profileBucketId: String(import.meta.env.VITE_APPWRITE_PROFILE_BUCKET_ID),
    appwriteApiKey: String(import.meta.env.VITE_APPWRITE_API_KEY),
    appwriteLikesCollectionId: String(import.meta.env.VITE_APPWRITE_LIKES_COLLECTION_ID),
    appwriteCommentsCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    appwriteBookmarksCollectionId: String(import.meta.env.VITE_APPWRITE_BOOKMARK_COLLECTION_ID),
    appwriteFollowscCollectionId: String(import.meta.env.VITE_APPWRITE_FOLLOWS_COLLECTION_ID),
    appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    usersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwriteUserSettingsCollectionId: String(import.meta.env.VITE_APPWRITE_USERSETTINGS_COLLECTION_ID),
    appwriteOpenAIAPIKey: String(import.meta.env.VITE_APPWRITE_OPENAI_API_KEY)
    
    
};

export default configVariables;