const hubspot = require('./api/hubspot');
const sinch = require('./api/sinch');

const handleMessageFlow = async (req) => {
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

  if (text.toLowerCase() === 'join') {
    sinch.sendTextMessage(
      contact_id,
      channel,
      'Hello, Please let us know your name'
    );
  } else {
    try {
      await hubspot.createContact({ phone: contact_id, name: text });
    } catch {
      sinch.sendTextMessage(contact_id, channel, 'Contact has been created');
    }
  }
};

const handleOnHubSpotContactCreated = async (objectId) => {
  try {
    const res = await hubspot.getContact(objectId);
    console.log(res);
    const {
      properties: { phone, firstname },
    } = res;
    const { channel_identities } = await sinch.getContact(phone);
    sinch.sendTextMessage(
      phone,
      channel_identities[0].channel,
      `Nice to meet you ${firstname}. I have added you to the account`
    );
  } catch {
    console.log('Something went wrong!!!');
  }
};

module.exports = {
  handleMessageFlow,
  handleOnHubSpotContactCreated,
};
