const { Client, Databases, Messaging } = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);
  const messaging = new Messaging(client);
  const payload = req.payload ? JSON.parse(req.payload) : {};

  try {
    // Example: payload should include postId and views
    if (payload.views && payload.views > 1000) {
      await messaging.createMessage({
        title: 'Your article is trending! 🔥',
        content: `🔥 Your article is trending! ${payload.postTitle || ''}`,
        users: payload.ownerId ? [payload.ownerId] : [],
        topics: ['trending']
      });
    }

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: String(err) });
  }
};
