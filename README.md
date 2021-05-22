# brandsome.io

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.7.

## tech

this is built using `node.js` &amp; `mongoDB`

## api

request
`GET https://api.brandsome.io/search?q=<transaction details>`

response (success)
```{
    "status": true,
    "data": {
        "brand_name": "Spotify",
        "brand_domain": "spotify.com",
        "brand_logo": "https://logo.clearbit.com/spotify.com"
    }
}
```

response (failure)
```{
    "status": false,
    "message": "Brand not found"
}
```

## public roadmap

[trello board](https://trello.com/b/EPdv5BDV/brandsomeio)