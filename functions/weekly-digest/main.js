const { Client, Databases, Messaging } = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  const messaging = new Messaging(client);

  try {
    // Minimal example: collect summary stats from a collection named 'posts'
    // Replace databaseId and collectionId with your values via env vars
    const dbId = process.env.APPWRITE_DATABASE_ID;
    const postsCollectionId = process.env.POSTS_COLLECTION_ID;

    // NOTE: For large datasets, implement aggregation in a safer way.
    const posts = await databases.listDocuments(dbId, postsCollectionId, []);

    const stats = {
      views: posts.sum ? posts.sum : posts.total || posts.documents.length,
      posts: posts.total || posts.documents.length
    };

    const content = `Weekly digest:\nViews: ${stats.views}\nPosts: ${stats.posts}`;

    // Send to a topics or admin list; here example sends to 'newsletter' topic
    await messaging.createEmail({
      subject: 'Weekly Scriptora Digest',
      content: `<pre>${content}</pre>`,
      topics: ['newsletter']
    });

    res.json({ success: true, stats });
  } catch (err) {
    res.json({ success: false, error: String(err) });
  }
};
