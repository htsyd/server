# HOW TO START YOUR DAY APP

##Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:5500
Server URL : http://localhost:3000
```
### POST/register
>Create User


_Request Header_
```
not needed
```

_Request Body_
```
{

  "name": "<User's Name>",
  "email": "<User's email>",
  "password": "<User's password>"

}
```

_Response(201)_
```
{

  "name": "Candra",
  "email": "Candra@gmail.com",
  "password": "Candra"

}
```
_Response(400- bad request)_
```
{

  "message": "Name can't be empty,Email can't be empty,Password can't be empty"

}
```

_Response (500 - Internal server error)_
```
{

  "message": "Internal server error"

}
```

### POST/login

>Login User


_Request Header_
```
not needed
```

_Request Body_
```
{

  "email": "<User's email>",
  "password": "<User's password>"

}
```
_Response(200)_
```
{

  "access_token": token

}
```
_Response(400- bad request)_
```
{

  "message": "Name can't be empty,Email can't be empty,Password can't be empty"

}
```

_Response(404- Not Found)_
```
{

  "message": "Invalid Account!!"

}
```

_Response (500 - Internal server error)_
```
{

  "message": "Internal server error"

}
```
### POST/google-sign-in

>Google Sign IN User

_Request Header_
```
not needed
```

_Request Body_
```
{

  "id_token": "id_token";

}
```

_Response(200)_
```
Google's Payload
```


_Response (500 - Internal server error)_
```
{

  "message": "Error undescribable"

}
```

### GET /news

> Get international news from NYT's 3rd party API 

_Request Header_
```
{

  access_token: token

}
```

_Request Body_
```
not needed
```

_Example Response (200)_
```
{

  "title": "U.S. Border Agency Settles With 2 Americans Detained for Speaking Spanish",
  "abstract": "In a video of the 2018 incident in Havre, Mont., a Border Patrol agent is heard telling the two American women he detains that speaking Spanish in the small city is “very unheard-of.”",
  "url": "https://www.nytimes.com/2020/11/26/us/montana-spanish-border-patrol.html",
  "thumbnail_standard: "https://static01.nyt.com/images/2019/02/17/us/26xp-border-patrol/15xp-montana-thumbStandard.jpg"

}
```

_Response (500 - Internal server error)_
```
{

  "message": "Internal server error"

}
```


### GET /covid

> Get covid news from covid19api's 3rd party API 

_Request Header_
```
{

  access_token: token

}
```

_Request Body_
```
not needed
```

_Example Response (200)_
```
{

  "NewConfirmed": 5534,
  "TotalConfirmed": 511836,
  "NewDeaths": 114,
  "TotalDeaths": 16225,
  "NewRecovered": 4494,
  "TotalRecovered": 429807

}
```

_Response (500 - Internal server error)_
```
{
  
  "message": "Internal server error"

}
```


### GET /domnews

> Get domestic news from CNN Indonesia's 3rd party API 

_Request Header_
```
{

  access_token: token

}
```

_Request Body_
```
not needed
```

_Example Response (200)_
```
{
  "title": "Berita Nasional",
  "abstract": "Mohammad Idris Positif Corona, KPU Depok Tetap Gelar Debat",
  "url": "https://www.cnnindonesia.com/nasional/20201127105022-32-575222/mohammad-idris-positif-corona-kpu-depok-tetap-gelar-debat",
  "thumbnail_standard": "https://akcdn.detik.net.id/visual/2020/03/02/61e9b479-0aa0-4e2f-ac2c-5684682a7527_169.jpeg?w=270&q=90"
}
```

_Response (500 - Internal server error)_
```
{
  
  "message": "Internal server error"

}
```