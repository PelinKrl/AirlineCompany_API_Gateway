AirlineCompany_API_Gateway
Table of Contents
Introduction
Project Design
Assumptions
Issues Encountered
Demo Video
Source Code
Introduction
This project implements an API Gateway using Node.js and http-proxy-middleware. The gateway:

Manages and forwards API requests to a backend airline system.
Adds authorization headers for secure communication.
Handles proper body formatting for POST requests.
Endpoints:
GET /flights → Query flight details.
POST /book → Book a ticket with required details.
POST /checkin → Check-in for a booked ticket.
Project Design
Technologies Used:
Node.js: JavaScript runtime environment.
Express.js: Web framework for creating HTTP server.
http-proxy-middleware: Middleware for creating a proxy server.
Body-parser: Middleware for parsing JSON request bodies.
Code Structure:
fixRequestBody Function:
Ensures POST requests forward the correct JSON body to the backend.
Routes:
Route	Method	Target Endpoint
/flights	GET	/v1/Flight/QueryFlights
/book	POST	/v1/Ticket/Book
/checkin	POST	/v1/Ticket/CheckIn
Assumptions
Backend APIs are hosted at:
https://airlinecompanyapi20241128160828.azurewebsites.net

Authorization Token:
All requests require a Bearer Authorization Token.

/book Endpoint:
The body must include:

json
Copy code
{
  "flightId": 1,
  "passengerFullName": "John Doe",
  "bookingDate": "2024-12-15T10:00:00Z"
}
/checkin Endpoint:
The body must be a raw integer:

Copy code
1
Issues Encountered
1. POST Body Forwarding
Issue: http-proxy-middleware does not forward POST bodies by default.
Solution: Created a helper function fixRequestBody to stringify and forward the body explicitly.
2. Content-Type Mismatch
Issue: The backend rejected incorrect Content-Type headers.
Solution: Set:
application/json → For structured JSON bodies (e.g., /book).
text/plain → For raw integer bodies (e.g., /checkin).
3. Timeouts
Issue: Requests timed out due to body streaming issues.
Solution:
Properly set Content-Length.
Used proxyReq.write() to explicitly forward request bodies.
Demo Video
Watch the project demo here:
https://youtu.be/bh_1ChBmjpQ
