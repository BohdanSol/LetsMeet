# LetsMeet app

App using voximplant service to provide app2app video/audio calls.

## Installation

```
yarn && cd ios && pod install && cd ..
```

## WebRTC

### What is WebRTC?
Web Real-Time Communication - free and open-source project providing web browsers and mobile applications with real-time communication through APIs.


### Communication schema
![communication schema](https://miro.medium.com/max/1400/1*LjKfTXZu08-1_e751P9uxw.png)
### Client role
### Server role
- WebRTC servers are just like any other servers. They’re simply set up to accomplish the tasks which are specific to WebRTC communication.
- WebRTC can easily connect two browsers on a local area network. However, WebRTC and browsers alone aren’t capable of connecting through the internet. WebRTC needs a server to handle tasks like getting through firewalls and routing data outside of your local network.
- Generally speaking, WebRTC servers handle the process of negotiating a connection between the two devices in a real-time conversation and managing the connection once it’s established. Most of the time, the communicating devices do most of the data sending and receiving.
### What is STUN?
Session Traversal Utils for Network Address Translation is a set of methods that allows to deliver real-time voice, video, messages through server URL when initializing WebRTC connection.
![stun scheme](https://miro.medium.com/max/518/1*80Z67TRcEZnqHj3dWSi2cg.png)
### What is TURN?
Traversal Using Relays around  Network Address Translation is a protocol, that assists firewalls for multimedia applications. The main goal of turn is to avoid direct communication.
![turn scheme](https://miro.medium.com/max/590/1*WSa3buqCC42Jc4Qygi9jXw.png)