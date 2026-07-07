# Appwrite Functions — Messaging

This folder contains example Appwrite cloud functions used by Scriptora to send notifications (email, push, messages).

Environment variables (set in the Appwrite Function settings):

- `APPWRITE_ENDPOINT` — Appwrite endpoint URL
- `APPWRITE_PROJECT_ID` — Appwrite project ID
- `APPWRITE_API_KEY` — API key with required scopes (Messaging, Databases as needed)
- `APP_URL` — Public site URL (optional, used in email links)
- `APPWRITE_DATABASE_ID` — (optional) database id for digest
- `POSTS_COLLECTION_ID` — (optional) collection id for digest

How to deploy

1. Push this repository to a Git remote that Appwrite can access (GitHub/GitLab).
2. Create a new Function in Appwrite for each folder under `functions/` and point the root to the corresponding folder.
3. Set the runtime to Node.js 22 and install dependencies by uploading the package or using Appwrite's build options.
4. Set the environment variables listed above in the Function settings.
5. Attach database triggers (e.g., `documents.create` on `posts`) to call the appropriate function.

Notes

- These are minimal examples meant to be adapted to your schema and security model.
- For bulk sends use `topics` instead of individual `users` where appropriate.
- Verify permissions on messaging API keys and avoid exposing admin keys client-side.
