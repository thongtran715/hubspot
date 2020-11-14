const request = require("request-promise");
const getAuthToken = () => {
  return request({
    url: "https://eu.auth.sinch.com/oauth2/token",
    method: "POST",
    auth: {
      user: process.env.sinch_client_id,
      pass: process.env.sinch_client_secret,
    },
    form: { grant_type: "client_credentials" },
    json: true,
  });
};

const sendMessage = async (req, text_message) => {
  let body = req.body;
  if (!body.message) {
    return;
  }
  let {
    message: {
      contact_message: {
        text_message: { text },
      },
      channel_identity: { channel },
      contact_id,
    },
  } = body;
  console.log(`Received ${text}`);
  const res = await getAuthToken();
  const token_type = res.token_type;
  const token = res.access_token;
  return request({
    url: `https://eu.conversation.api.sinch.com/v1beta/projects/${process.env.SINCH_PROJECT_ID}/messages:send`,
    method: "POST",
    headers: {
      "Content-Type": "application/json text/plain",
      Authorization: `${token_type} ${token}`,
    },
    body: {
      app_id: process.env.SINCH_APP_ID,
      recipient: {
        contact_id,
      },
      message: {
        text_message: {
          text: text_message,
        },
      },
      channel_priority_order: [channel],
    },
    json: true,
  });
};

module.exports = {
  sendMessage,
};
