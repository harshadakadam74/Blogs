import configVariables from "../configVariables/configVariables";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(configVariables.appwriteUrl)
      .setProject(configVariables.appwriteProjectId);

    // Database service
    this.databases = new Databases(this.client);

    // Storage service
    this.bucket = new Storage(this.client);
  }

  // Create Post
  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status,
    category,
    userId,
    featured = false,
  }) {
    try {
      return await this.databases.createDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          category,
          userId,
          featured,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  // Update Post
  async updatePost(
    slug,
    { title, content, featuredImage, status, category, featured },
  ) {
    try {
      return await this.databases.updateDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          category,
          featured,
        },
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }

  // Delete Post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCollectionId,
        slug,
      );

      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);

      return false;
    }
  }

  // Get Single Post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);

      return false;
    }
  }

  // Get All Posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);

      return false;
    }
  }

  async getFeaturedPosts() {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCollectionId,
        [Query.equal("featured", true), Query.limit(6)],
      );
    } catch (error) {
      console.log("Appwrite service :: getFeaturedPosts :: error", error);

      return false;
    }
  }

  async toggleFeatured(postId, featured) {
    try {
      return await this.databases.updateDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCollectionId,
        postId,
        { featured },
      );
    } catch (error) {
      console.log("Appwrite service :: toggleFeatured :: error", error);

      return false;
    }
  }


  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        configVariables.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);

      return false;
    }
  }


  
  // Delete File
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(configVariables.appwriteBucketId, fileId);

      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);

      return false;
    }
  }

  // File Preview
  getFilePreview(fileId) {
    return this.bucket.getFileView(configVariables.appwriteBucketId, fileId);
  }

  // Avatar Functions
  async uploadAvatar(file) {
    try {
      return await this.bucket.createFile(
        configVariables.profileBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAvatar(fileId) {
    try {
      return await this.bucket.deleteFile(
        configVariables.profileBucketId,
        fileId,
      );
    } catch (error) {
      console.log(error);
    }
  }

  getAvatarPreview(fileId) {
    return this.bucket.getFileView(configVariables.profileBucketId, fileId);
  }

  async updateUserAvatar(userId, avatar) {
    try {
      return await this.databases.updateDocument(
        configVariables.databaseId,
        configVariables.usersCollectionId,
        userId,
        { avatar },
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Get File Download Link
  async addLike(postId, userId) {
    try {
      return await this.databases.createDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteLikesCollectionId,
        ID.unique(),
        {
          postId,
          userId,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Remove Like
  async removeLike(documentId) {
    try {
      await this.databases.deleteDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteLikesCollectionId,
        documentId,
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Get Likes for a Post
  async getPostLikes(postId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteLikesCollectionId,
        [Query.equal("postId", postId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Get User Like for a Post
  async getUserLike(postId, userId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteLikesCollectionId,
        [Query.equal("postId", postId), Query.equal("userId", userId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Add Comment
  async addComment({ postId, userId, authorName, comment }) {
    try {
      return await this.databases.createDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCommentsCollectionId,
        ID.unique(),
        {
          postId,
          userId,
          autherName: authorName,
          comment,
          createdAt: new Date().toISOString(),
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Get Comments for a Post
  async getComments(postId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCommentsCollectionId,
        [Query.equal("postId", postId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Get Posts by User
  async getPostsByUser(userId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteCollectionId,
        [Query.equal("userId", userId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Get User Likes
  async getUserLikes(userId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteLikesCollectionId,
        [Query.equal("userId", userId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Save Bookmark
  async addBookmark(postId, userId) {
    try {
      return await this.databases.createDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteBookmarksCollectionId,
        ID.unique(),
        {
          postId,
          userId,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Remove Bookmark
  async removeBookmark(documentId) {
    try {
      await this.databases.deleteDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteBookmarksCollectionId,
        documentId,
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Check Bookmark
  async getUserBookmark(postId, userId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteBookmarksCollectionId,
        [Query.equal("postId", postId), Query.equal("userId", userId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Get User Bookmarks
  async getUserBookmarks(userId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteBookmarksCollectionId,
        [Query.equal("userId", userId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // follow user
  async followUser(followerId, followingId) {
    try {
      return await this.databases.createDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteFollowscCollectionId,
        ID.unique(),
        {
          followerId,
          followingId,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  // unfollow
  async unfollowUser(docId) {
    try {
      return await this.databases.deleteDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteFollowscCollectionId,
        docId,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getFollow(followerId, followingId) {
    return this.getUserFollow(followerId, followingId);
  }

  // get user follow
  async getUserFollow(followerId, followingId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteFollowscCollectionId,
        [
          Query.equal("followerId", followerId),
          Query.equal("followingId", followingId),
        ],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // get followers
  async getFollowers(userId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteFollowscCollectionId,
        [Query.equal("followingId", userId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // get following
  async getFollowing(userId) {
    try {
      return await this.databases.listDocuments(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteFollowscCollectionId,
        [Query.equal("followerId", userId)],
      );
    } catch (error) {
      console.log(error);
    }
  }

  // update notification
  async updateNotificationSettings(data) {
    try {
      return await this.databases.updateDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteUserSettingsCollectionId,
        data.userId,
        {
          emailNotifications: data.emailNotifications,
          newFollowerAlerts: data.newFollowerAlerts,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  // get notification
  async getNotificationSettings(userId) {
    try {
      return await this.databases.getDocument(
        configVariables.appwriteDatabaseId,
        configVariables.appwriteUserSettingsCollectionId,
        userId,
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  
}

const service = new Service();

export default service;
