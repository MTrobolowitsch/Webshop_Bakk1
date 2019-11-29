
# Microservice Based Architecture Prototype (Movie Webshop)

 ## Grundlegende Architektur
Communication über http
Push messages über socket.io Websockets.
Swagger als Interface Doku.
 ### Frontend
 **Angular** 
 Client (Monolith).
 ### Public Gateway
 **Express Gateway**
 Wird als Proxy und Loadbalancer verwendet.
 Token Validierung und Session Handling wird hier gehandelt.
 Kein direkter Zugriff von außen.
 Unterteilung in Private / Public Endpoints.
 JWT Token als Session.
 ### APIs
 **Node JS APIs**
 1 bis N node.js Express APIs
 Hier wird keine Authentication gehandelt.
 Von "Außen" nicht erreichbar.
 Keine Connection zur DB.
 Thematisch gegliedert (z.B. auth.api => signup & login).
  ### Microservices Gateway
 **Express Gateway**
 Wird als Proxy und Loadbalancer verwendet.
 Keine Authentication.
 Kein direkter Zugriff von außen.
 Nur Private Endpoints.
 
 ### Microservices
 **Node JS Microservices**
 1 bis N node.js Express Services.
 "Function as a Service" Ansatz.
 1 Service = 1 Endpoint.
 Verbindung zu MongoDB.
 ### Database
 **MongoDB Cluster**
1 bis N MongoDB Instanzen

TODO:
 - Docker Compose -> Das ganze System sollte mit einem Command lokal zu starten sein
 - MongoDB Init Script
 - Restliche Funktionalität implementieren (Einkaufswagen, Kaufen, Leihen, Userdaten ändern etc...)
 - Websocket für Push messages implementieren
 - Refactorings
 - ...
