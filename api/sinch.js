const request = require('request-promise');

const safeLimit = 10000;
let expiresOn = 0;
let token, type;

const getAuthToken = async () => {
  if (expiresOn < Date.now()) {
    try {
      const res = await request({
        url: 'https://eu.auth.sinch.com/oauth2/token',
        method: 'post',
        auth: {
          user: process.env.sinch_client_id,
          pass: process.env.sinch_client_secret,
        },
        form: { grant_type: 'client_credentials' },
        json: true,
      });
      expiresOn = Date.now() + res.expires_in * 1000 - safeLimit;
      token = res.access_token;
      type = res.token_type;
    } catch {
      console.log('Authorization failed');
    }
  }
  return `${type} ${token}`;
};

const getContact = async (contact_id) => {
  const auth = await getAuthToken();
  return request({
    url: `https://eu.conversation.api.sinch.com/v1/projects/${process.env.SINCH_PROJECT_ID}/contacts/${contact_id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json text/plain',
      Authorization: `${auth}`,
    },
    json: true,
  });
};

const sendMessageHelper = async ({
  contact_id,
  channel,
  text_message = null,
  media_message = null,
  choice_message = null,
  card_message = null,
  carousel_message = null,
}) => {
  const auth = await getAuthToken();
  return request({
    url: `https://eu.conversation.api.sinch.com/v1beta/projects/${process.env.SINCH_PROJECT_ID}/messages:send`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json text/plain',
      Authorization: `${auth}`,
    },
    body: {
      app_id: process.env.SINCH_APP_ID,
      recipient: {
        contact_id,
      },
      message: {
        text_message: text_message,
        media_message: media_message,
        choice_message: choice_message,
        card_message: card_message,
        carousel_message: carousel_message,
      },
      channel_priority_order: [channel],
    },
    json: true,
  });
};

const sendTextMessage = (contact_id, channel, text) => {
  return sendMessageHelper({ contact_id, channel, text_message: { text } });
};

module.exports = {
  sendTextMessage,
  getContact,
};
