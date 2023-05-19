# MyIp

Simple proxy server to forward outside my router ip address

It uses web sockets to make a direct connection.

## Usage

Start internal server at home (need to replace `client.connect('ws://localhost:8083/')` with you public server address) 

`npm run start-internal`

Start external server on you public server

`npm run start-external`
