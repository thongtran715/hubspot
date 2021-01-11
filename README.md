# Sinch And HubSpot Integration Demo 

## Introduction
With CRMs like HubSpot, you can manage a list of customers by using one API for multiple channels. This saves time from learning and configuring various APIs. 

Follow this demo to set up Conversation API to work across multiple channels and to reduce the learning curve to a minimal. 

## Set up

First, create a .env file to hold the following variables

hubspot_client_id=${VALUE} # hubspot client id 

hubspot_client_secret=${VALUE} # Hubspot client secret

hubspot_redirect_uri=${VALUE} # the URI link for the application to obtain access token from Hubspot

SINCH_APP_ID=${VALUE} # Sinch APP ID

SINCH_PROJECT_ID=${VALUE} # Sinch Project Id

sinch_client_id=${VALUE} # Sinch Client Id

sinch_client_secret=${VALUE} # Sinch Client Secret

Visit [HubSpot](https://developers.hubspot.com/) to create a developer account and app to obtain client_id, client_secret. To get these values, go under the Auth Info tab when your app is created. 

![Message flow](images/hubspot_auth.png)

Visit [Sinch](https://www.sinch.com/sign-up/) to set up a Sinch Account. 

To configure channels within Sinch, visit [Quick Start](https://developers.sinch.com/docs/conversation_quick_guide). When a new app is set up, you can get the SINCH_APP_ID and SINCH_PROJECT_ID. Generate an access key to obtain sinch_client_id and sinch_client_secret. There is a variety of channels that can be configured (i.e. Messenger, SMS, Viber, Whatsapp, and RCS). To learn more about the channels that are offered visit https://developers.sinch.com/. 


Next, install [Ngrok](https://ngrok.com/) to expose your app to the world. 


## What is in this demo:

The demo will show how to use a HupSpot application with Conversation API for various of channels. From there, client information will be saved to HubSpot, and you can interact back to the client using Conversation API. 

![Message flow](images/message_flow.png)

## Running App. 

Once everything is installed, use your local terminal to run the following command and start the app.
npm install 

Run the next command.
ngrok http 3000

The app is now running and exposed to the world!

Note: To configure redirect_uri as {ngrok_link/auth}, visit hubspot  
e.g. https://9c88e5323886.ngrok.io/auth


## Disclaimer 

Conversation API introduces a concept called `contact_id` which iss the identity of the sender (e.g. SMS, WhatsApp phone number, Facebook Contact Id)

This app will save the `phone number` to hubspot using `contact_id`. And Hubspot can retrieve contact details using Sinch Get Contact API (https://developers.sinch.com/reference#contact_getcontact)