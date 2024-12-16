# AirlineCompany_API_Gateway
#Table of Contents
* Introduction
* Project Design
Assumptions
Issues Encountered
Demo Video
Source Code
Introduction
This project implements an API Gateway using Node.js and http-proxy-middleware. The gateway acts as a proxy server to manage and forward API requests to a backend airline system. It includes the following endpoints:

GET /flights: Query flight details.
POST /book: Book a ticket with required details.
POST /checkin: Check-in for a booked ticket.
The gateway adds authorization headers to secure communication and ensures proper body handling for POST requests.

Project Design
Technologies Used
Node.js: JavaScript runtime environment.
Express.js: Web framework for creating HTTP server.
http-proxy-middleware: Middleware for creating a proxy server.
Body-parser: Middleware to handle JSON body parsing.
Code Structure
fixRequestBody Function: Ensures POST requests forward the correct JSON body to the backend.
Routes:
/flights → GET → Proxies to /v1/Flight/QueryFlights.
/book → POST → Proxies to /v1/Ticket/Book.
/checkin → POST → Proxies to /v1/Ticket/CheckIn.
Assumptions
Backend APIs are hosted at https://airlinecompanyapi20241128160828.azurewebsites.net.
The backend requires a Bearer Authorization Token for all requests.
The /book endpoint requires a structured JSON body:
json
Copy code
{
  "flightId": 1,
  "passengerFullName": "John Doe",
  "bookingDate": "2024-12-15T10:00:00Z"
}
The /checkin endpoint expects a raw integer in the request body.
Issues Encountered
POST Body Forwarding:
http-proxy-middleware does not automatically forward the body for POST requests.
Solution: Created a helper function fixRequestBody to stringify and forward the body explicitly.

Content-Type Mismatch:
The backend rejected incorrect Content-Type headers.
Solution: Set Content-Type as application/json or text/plain based on the endpoint.

Timeouts:
Initially, some requests timed out due to body streaming issues.
Solution: Properly set Content-Length and use proxyReq.write() for body transmission.

Demo Video
Watch the project demo here: https://youtu.be/bh_1ChBmjpQ
