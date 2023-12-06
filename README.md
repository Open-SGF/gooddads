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

```zsh
brew install gnupg
brew install dopplerhq/cli/doppler
brew install yarn
brew install nvm
nvm install
nvm use
```

## Populate .env
The project uses Doppler to manage environment variables. However, doppler limits the number of users that can belong to
three users. Because of this, for local development you can also use the .env.local.example file to populate your .env 
file.

#### With Doppler
```zsh
doppler login
doppler setup
yarn env
```

#### With .env.local.example
```zsh
cp .env.example .env
```

## Setup Local DB for the first time

Supabase hosts the staging and production databases for this project. To get started with local development, create a 
Supabase account and [contact Nathan Toombs on Discord](https://discord.com/channels/@me/171065467736162304) be added to
the project. You'll also need to update `SUPABASE_PROJECT_ID` in your .env file with the project id from Supabase.
You can get the project id from the project's dashboard URL: `https://supabase.com/dashboard/project/<project-id>`. 
Once you've been added to the project and updated your env, you can run the following commands to setup your local 
database.

```zsh
supabase login
supabase link
yarn db:start
```

After starting the database, update your .env file with the values for `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
`SUPABASE_SERVICE_ADMIN_KEY` from the output of the `yarn db:start` command.