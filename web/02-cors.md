CORS is a security mechanism that allows web applications to request resources from different origins using additional HTTP headers.

## Before CORS

Restrictions prevented `https://vishal.com` from accessing resources from:
- `google.com/api/getData`
- `api.vishal.com`
- `vishal.com:5050`
- `http://vishal.com`

## CORS Process

1. Domain A requests resources from Domain B
2. Browser initiates a pre-flight OPTIONS request
3. Domain B verifies the request
4. Domain B sends additional headers:
   - `Access-Control-Allow-Origin: *` (all domains allowed)
   - `Access-Control-Allow-Origin: https://vishal.com` (specific domain allowed)
   - `Access-Control-Allow-Methods: POST, PUT, DELETE, GET`
5. Browser confirms safety and makes the actual API call

## Types of CORS Requests

1. Simple requests
2. Pre-flight requests