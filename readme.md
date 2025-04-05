#login
method : POST
URL : http://localhost:3000/api/register

Body:
{
"name": "Prathmesh Khandare",
"email": "prathmesh@example.com",
"password": "strongPassword123"
}
response:

{
"message": "User registered successfully",
"user": {
"id": "67f0c0a12ffce6b10fabaed2",
"name": "Prathmesh Khandare",
"email": "prathmesh@example.com"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjBjMGExMmZmY2U2YjEwZmFiYWVkMiIsImlhdCI6MTc0MzgzMTIwMSwiZXhwIjoxNzQ0MjYzMjAxfQ.2Mwgz5SGGoVZ_N3Cf7lI_tQeE2-QOD1hF3o3VCpft24"
}

**Login**
http://localhost:3000/api/login
body:
{
"email": "prathmesh@example.com",
"password": "strongPassword123"
}

response:

"message": "Login successful",
"user": {
"id": "67f0c0a12ffce6b10fabaed2",
"email": "prathmesh@example.com"
},
