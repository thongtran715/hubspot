const store = require('../store');
const request = require('request-promise');

const updateAccessToken = async () => {
  try {
    let response = await request({
      url:
        'https://api.hubapi.com/oauth/v1/access-tokens/' + store.ACCESS_TOKEN,
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    const expires = response.expires_in;

    if (expires <= 60) {
      const form = {
        grant_type: 'refresh_token',
        client_id: process.env.hubspot_client_id,
        client_secret: process.env.hubspot_client_secret,
        refresh_token: store.REFRESH_TOKEN,
      };
      const response = await request({
        url: 'https://api.hubapi.com/oauth/v1/token',
        method: 'POST',
        form,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        json: true,
      });
      store.ACCESS_TOKEN = response.data.access_token;
    }
  } catch (e) {}
};

const handleAuth = async (code) => {
  const response = await request({
    url: 'https://api.hubapi.com/oauth/v1/token',
    method: 'POST',
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.hubspot_client_id,
      client_secret: process.env.hubspot_client_secret,
      redirect_uri: `${process.env.hubspot_redirect_uri}`,
      code,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  });
  const access_token = response.access_token;
  store.REFRESH_TOKEN = response.refresh_token;
  store.ACCESS_TOKEN = access_token;
};

const searchContact = (phone) => {
  return request({
    url: 'https://api.hubapi.com/crm/v3/objects/contacts/search',
    method: 'POST',
    body: {
      filterGroups: [
        {
          filters: [{ value: phone, propertyName: 'phone', operator: 'EQ' }],
        },
      ],
    },
    headers: {
      Authorization: `Bearer ${store.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    json: true,
  });
};

const getContact = async (objectId) => {
  return request({
    url: `https://api.hubapi.com/crm/v3/objects/contacts/${objectId}?properties=phone,firstname`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${store.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    json: true,
  });
};

const createContact = async ({ phone, name }) => {
  await updateAccessToken();
  const { total } = await searchContact(phone);
  if (total > 0) {
    throw new Error('Contact existed');
  }
  return request({
    method: 'POST',
    url: 'https://api.hubapi.com/crm/v3/objects/contacts',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${store.ACCESS_TOKEN}`,
    },
    body: {
      properties: {
        firstname: name,
        phone: phone,
      },
    },
    json: true,
  });
};

module.exports = {
  handleAuth,
  updateAccessToken,
  createContact,
  searchContact,
  getContact,
};
