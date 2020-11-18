title Messaging flow

Client->Channel:Client send "Join" to the desired Channel
Channel->ConversationAPI: POST
ConversationAPI->DemoApp: POST
DemoApp->HubSpot: Create Contact
DemoApp-->ConversationAPI: Send Welcome Message
ConversationAPI-->Channel: POST
Channel-->Client: Deliver Welcome Message
HubSpot-->DemoApp: Creation Notification
DemoApp-->ConversationAPI: Get Contact Detail
ConversationAPI->DemoApp: Contact Detail
DemoApp-->ConversationAPI: Send Confirmation Message
ConversationAPI-->Channel: POST
Channel-->Client: Deliver Confirmation Message