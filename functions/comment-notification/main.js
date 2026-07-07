const { Client, Messaging } = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.TINYMCE_API_KEY);

  const messaging = new Messaging(client);
  const payload = req.payload ? JSON.parse(req.payload) : {};

  try {
    const content = `${payload.commenterName || 'Someone'} commented: ${payload.commentText || ''}`;

    await messaging.createMessage({
      title: 'New Comment',
      content,
      users: payload.ownerId ? [payload.ownerId] : []
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: String(err) });
  }
};
