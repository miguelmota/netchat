# netchat

> Simple chat server over TCP in [Node.js](https://nodejs.org)

## Install

```bash
npm i -g netchat
```

## Usage

```bash
$ netchat --help

  Simple chat server over TCP

  Usage
    $ netchat server [options]

  Options
    --port, -p Port to run net server

  Examples
    Run net server:
    $ netchat server -p 3000

    Connect to net server over netcat from anywhere:
    $ nc <server ip or domain> 3000
```

### Running chat server

```bash
$ netchat server -p 3000
Server running on port 3000
```

### Connecting to chat server using netcat from anywhere

```bash
nc <server ip address> <port>
```

### Demo

```bash
$ nc netchat.moogs.io 2424

Enter username: moogs
You are now moogs
> yo!
> bot joined the chat
> bot: hello!
>
```

## License

MIT
