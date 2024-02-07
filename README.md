# Local Development Setup
[based on Turborepo](https://turbo.build/repo)

## Setup Dependencies

### Docker Desktop for Windows
https://docs.docker.com/desktop/install/windows-install/

### Verify docker is working with the following commands
```zsh
docker -v
docker-compose -v
```

### Orbstack for Mac
```zsh
brew install --cask orbstack
=======

### Setup Node Version Manager and install Node packages
```zsh
brew install nvm
nvm install
nvm use
pnpm install
```

### Populate .env
```zsh
cp .env.example .env
```

### Setup Local DB
Make sure orbstack or docker is running before running this command.
```zsh
pnpm db:start
```

After starting the database, update your .env file with the values for `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ADMIN_KEY` with the output of the `npm db:start` command.

```zsh
pnpm db:seed
pnpm dbreset
```

### Running the project
```
pnpm run dev
```

### Building the project
```
pnpm run build
```

