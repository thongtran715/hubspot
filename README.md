# Sinch And HubSpot Integration Demo 

## Introduction
Learn how to quickly set up and manage your customer lists, across multiple channels, using the HubSpot CRM and Sinch Conversation API integration.

Visit [HubSpot](https://developers.hubspot.com/) to create a developer account and app to obtain client_id, client_secret. To get these values, go to the Auth Info tab when your app is created. Then, visit [Sinch](https://www.sinch.com/sign-up/) to set up a Sinch Account. 

Our [getting started](https://developers.sinch.com/docs/conversation_quick_guide) page shows you how to configure a variety of channels, get your SINCH_APP_ID and SINCH_PROJECT_ID and generate an access key to obtain your sinch_client_id and sinch_client_secret. Generate an access key to obtain sinch_client_id and sinch_client_secret. Learn more about the channels that are offered by visting https://developers.sinch.com/docs/conversation-channel-support. 

Once you have your SINCH_APP_ID, SINCH_PROJECT_ID and access key, install [Ngrok](https://ngrok.com/) to expose your app to the world and begin leveraging the power of Hubspot and the Sinch Conversation API. Click [here](https://developers.sinch.com/docs/conversation) to learn more about the Sinch Conversation API.

![Message flow](images/message_flow.png)

**Note:** The below information is only for demonstration purposes and is not intended to be used for production or operation.

## Set up

Create a .env file to hold the following variables:

hubspot_client_id=${VALUE} # hubspot client id 

hubspot_client_secret=${VALUE} # Hubspot client secret

hubspot_redirect_uri=${VALUE} # the URI link for the application to obtain access token from Hubspot

SINCH_APP_ID=${VALUE} # Sinch APP ID

SINCH_PROJECT_ID=${VALUE} # Sinch Project Id

sinch_client_id=${VALUE} # Sinch Client Id

sinch_client_secret=${VALUE} # Sinch Client Secret

## Running the application 

Once everything is installed, use your local terminal to run the npm install command and ngrok http 3000 command which will start and run the app, exposing it to the world. 

Note: To configure redirect_uri as {ngrok_link/auth}, visit hubspot. E.g. https://9c88e5323886.ngrok.io/auth


## Disclaimer 

The Sinch Conversation API introduces a concept called `contact_id` which is the identity of the sender (e.g. SMS, WhatsApp phone number, Facebook Contact Id). This app will save the `phone number` to hubspot using `contact_id`. Hubspot can retrieve contact details using the [Sinch Get Contact API] (https://developers.sinch.com/reference#contact_getcontact)
