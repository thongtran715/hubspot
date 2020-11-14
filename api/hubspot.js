const store = require("../store");
const request = require("request-promise");

const updateAccessToken = async () => {
  try {
    let response = await request({
      url:
        "https://api.hubapi.com/oauth/v1/access-tokens/" + store.ACCESS_TOKEN,
      method: "GET",
      headers: { accept: "application/json" },
    });
    const expires = response.expires_in;

    if (expires <= 60) {
      const form = {
        grant_type: "refresh_token",
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        refresh_token: store.REFRESH_TOKEN,
      };
      const response = await request({
        url: "https://api.hubapi.com/oauth/v1/token",
        method: "POST",
        form,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        json: true,
      });
      store.ACCESS_TOKEN = response.data.access_token;
    }
  } catch (e) {}
};

const handleAuth = async (code) => {
  const response = await request({
    url: "https://api.hubapi.com/oauth/v1/token",
    method: "POST",
    form: {
      grant_type: "authorization_code",
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      redirect_uri: "https://882dd2ca380a.ngrok.io/auth",
      code,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  });
  const access_token = response.access_token;
  store.REFRESH_TOKEN = response.refresh_token;
  store.ACCESS_TOKEN = access_token;
};

const searchContact = async (phone) => {
  request({
    url: "https://api.hubapi.com/crm/v3/objects/contacts/search",
    method: "POST",
    body: {
      query: phone,
    },
    headers: {
      Authorization: `Bearer ${store.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    json: true,
  });
};

const createContact = async (req) => {
  updateAccessToken();
  const {
    message: { contact_id },
  } = req.body;
  //   searchContact(contact_id);
  const res = await request({
    method: "POST",
    url: "https://api.hubapi.com/crm/v3/objects/contacts",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Bearer ${store.ACCESS_TOKEN}`,
    },
    body: {
      properties: {
        firstname: "Brayn",
        phone: contact_id,
      },
    },
    json: true,
  });
  console.log(res);
};

module.exports = {
  handleAuth,
  updateAccessToken,
  createContact,
};
