const { Client, Messaging } = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.TINYMCE_API_KEY);

  const messaging = new Messaging(client);
  const payload = req.payload ? JSON.parse(req.payload) : {};

  try {
    const postUrl = `${process.env.APP_URL || ''}/post/${payload.postId || ''}`;

    await messaging.createEmail({
      subject: 'Your blog is live 🎉',
      content: `
        <h2>Your blog is live 🎉</h2>
        <p>Read your blog: <a href="${postUrl}">${postUrl}</a></p>
      `,
      users: payload.authorId ? [payload.authorId] : []
    });

    // Optionally send push via topics
    if (payload.topics && payload.topics.length) {
      await messaging.createMessage({
        title: 'New blog published',
        content: `🔔 ${payload.title || 'A new blog'} is live`,
        topics: payload.topics
      });
    }

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: String(err) });
  }
};
