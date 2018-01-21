# Playlist Player

Enter spotify playlist share link and start to listen music with the player.

## Development

App built with [poi.js](https://poi.js.org/) using [webpack](https://webpack.js.org/) and [yarn](https://yarnpkg.com/lang/en/). These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

The styles are handled by [stylus](http://stylus-lang.com/) `.styl` files, using `flex` as grid-system.

### Prerequisites

This app runs with Node JS and NPM, according `package.json` the version are: 

```
node@6.11.4
npm@5.6.0
```

### Environment

Some environment `flags` are needed to handle autentication with the [spotify](https://developer.spotify.com/web-api/) and [youtube](https://developers.google.com/youtube/v3/) web APIs: 

```
CLIENT (env.CLIENT) -  Spotify's client_id
CLIENT_ID (env.CLIENT_ID) -  Spotify's client_secret
YT_KEY (env.YT_KEY) -  Youtube's key
```

For more info on spotify web API `auth` click [here](https://developer.spotify.com/web-api/authorization-guide/).

### Available CLI tasks

[PoiJS](https://poi.js.org/) provides [handful modes](https://poi.js.org/#/home?id=modes) to manage the application:    

```
poi: Default command, run app in development mode
poi build: Build app in production mode
poi test: The test mode, by default it does nothing, but you can use it with some presets.
poi watch: Run app in webpack's watch mode
```

The default poi task will run [eslint](https://eslint.org/) based on `.eslitrc` rules.

### Add/Remove package(s)
Handling dependencies with yarn is easy: 
```
yarn add <package> - add package
yarn remove <package> - remove pacakge 
```
## Deployment

The build process output static files at `/dist`.

Run `poi build ` with the correspoding `auth` flags.
 
## Next Steps

- [ ] Add tests
- [ ] Add more search providers (e.g. vimeo)
- [ ] Handle keyboard controls
- [ ] Add localStorage compat
- [ ] Analyze bundle size
- [ ] Add service workers 
- [ ] Mobile Friendly 
- [ ] PWA 
