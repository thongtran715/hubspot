# Sinch And HubSpot Integration Demo 

## Problem: 
Given that we need to manage a list of customers from a CRM such as HubSpot 
from various channels such as Messenger, Viber, SMS, WhatsApp. It is a pain to manage api integration for individual 
channel. Developers need to spend quite time for learning, configuring different APIs. This demo will show how can we use one api that 
can work across multiple channels , reducing the learning curve to minimal , and setting up quickly. 

## What in this demo:

The demo will show how different clients from various channels can interact to the application. From there, we can save the information of the 
client to HubSpot, and Hubspot can use a universal Conversation API to interact back to the client. 

The demo will use Facebook Messenger, and SMS for the demo. Of course, we can configure more channels. 

![Message flow](images/message_flow.png)

## Set up

Create `.env` file to hold the following variables 

```
hubspot_client_id=${VALUE} # hubspot client id 
hubspot_client_secret=${VALUE} # Hubspot client secret
hubspot_redirect_uri=${VALUE} # the URI link for the application to obtain access token from Hubspot
SINCH_APP_ID=${VALUE} # Sinch APP ID
SINCH_PROJECT_ID=${VALUE} # Sinch Project Id
sinch_client_id=${VALUE} # Sinch Client Id
sinch_client_secret=${VALUE} # Sinch Client Secret
```

Visit [HubSpot](https://developers.hubspot.com/) to create a developer account and obtain client_id, client_secret. 

Visit [Sinch](https://developers.sinch.com/) to configure Sinch Account. 

Install [Ngrok](https://ngrok.com/) to expose your app to the world. 

Follow Sinch [Quick Start](https://developers.sinch.com/docs/conversation_quick_guide) to configure Messenger, and SMS channel. 

## Running App. 

Run the following command to start the app
```
npm install 
```

Run the following command to expose your app to the world 
```
ngrok http 3000
```

Visit [hubspot](https://developers.hubspot.com/) to configure redirect_uri as {ngrok_link/auth} for example `https://9c88e5323886.ngrok.io/auth`
