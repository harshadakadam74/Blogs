const { Client, Messaging } = require('node-appwrite');

module.exports = async function (req, res) {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const messaging = new Messaging(client);

  // Expecting payload: { userId, name, email }
  const payload = req.payload ? JSON.parse(req.payload) : {};

  try {
    await messaging.createEmail({
      subject: 'Welcome to Scriptora 🚀',
      content: `
        <h2>Welcome to Scriptora</h2>
        <p>Hi ${payload.name || 'there'}, thanks for joining Scriptora — happy writing!</p>
      `,
      users: payload.userId ? [payload.userId] : [],
      topics: []
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, error: String(err) });
  }
};
