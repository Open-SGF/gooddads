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

### Running the project
```
pnpm run web:dev
```

### Login
The seed.sql will add several users to the database. The following users are available for login:
- Admin
  - Username: admin@email.local
  - Password: NotAGoodPassword123
- Dad
  - Username: dad@email.local
  - Password: NotAGoodPassword123
- Intake
  - Username: intake@email.local
  - Password: NotAGoodPassword123

### Building the project
```
pnpm run build
```

## Adding UI Components
We are using [shadcn](https://ui.shadcn.com/) and [Storybook](https://storybook.js.org/) to build and track our components library.  The following steps walk through how to add a component to the Good Dads project, create a component stories file for Storybook, and launch Storybook for easy viewing and styling.

### Prerequisites:
- Fork the [Open SGF Good Dads repo](https://github.com/Open-SGF/gooddads)
- [Install pnpm](https://pnpm.io/installation)
- Run `pnpm install` in the root directory of your local repo
- Create and checkout a new branch for the component to be added.  Make sure someone else on the team isn't working on that component

### Step 1 - Add the component:
- `cd` into `packages/ui`
- Run `pnpm run ui:add`
- Use the interactive terminal to add the component you need.  Press `space` to select the component and `enter` to submit your selection

### Step 2 - Create the component's stories file:
- In the [shadcn GitHub repo](https://github.com/shadcn-ui/ui/pull/1561/files), find the code for your component.  It will be a `.tsx` file under `apps/www/registry/stories`.
- Copy the code for your component
- In Good Dads, create a stories file for the component under `apps/packages/ui/src` in the format `Component.stories.tsx`
- Paste the code from the shadcn repo into the stories file you just created
- Update the `import` statement to correctly point to your component's file path

### Step 3 - Open Storybook:
- From the root, run `pnpm run docs:dev`.  Storybook should open in your browser automatically
- Check to see that your component appears in Storybook

Congrats!  You can now view and style the component to match the Figma designs.  Happy coding!

PS:  Remember to review [Tailwind CSS]( https://tailwindcss.com/) for styling!