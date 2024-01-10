# Local Development Setup

## Setup Dependencies

### Docker Desktop for Windows
https://docs.docker.com/desktop/install/windows-install/

### Orbstack for Mac and Linux
```zsh
brew install --cask orbstack
```

### Verify docker is working with the following commands
```zsh
docker -v
docker-compose -v
```

### Setup Node Version Manager and install Node packages
```zsh
brew install nvm
nvm install
nvm use
npm install
```

### Populate .env
```zsh
cp .env.example .env
```

### Setup Local DB
```zsh
npm db:start
```

After starting the database, update your .env file with the values for `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ADMIN_KEY` from the output of the `npm db:start` command.

### Generate Seed Data
```zsh
snaplet setup
```
Follow the prompts from the command line. A snaplet cloud account is not needed. This command only needs to be run once.
```zsh
npm db:seed
npm db:reset
```