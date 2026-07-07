const { Client, Messaging } = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const messaging = new Messaging(client);
  const payload = req.payload ? JSON.parse(req.payload) : {};

  try {
    // Example: payload { subject, body, topics }
    await messaging.createEmail({
      subject: payload.subject || 'Announcement from Scriptora',
      content: payload.body || '<p>Update</p>',
      topics: payload.topics || ['all-users']
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: String(err) });
  }
};
