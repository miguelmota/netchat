var meow = require('meow')
var { server } = require('./index')

var cli = meow(`
    Usage
      $ netchat server [options]

    Options
      --port, -p Port to run net server

    Examples
      Run net server:
      $ netchat server -p 3000

      Connect to net server over netcat from anywhere:
      $ nc <server ip or domain> 3000
`, {
    flags: {
        port: {
            type: 'string',
            alias: 'p'
        }
    }
})

if (cli.input[0] === 'server') {
  server(cli.flags.port)
} else {
  cli.showHelp()
}
