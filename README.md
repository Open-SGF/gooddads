## Project Setup
* [Install PHP](https://www.php.net/manual/en/install.php)
* [Install Composer](https://getcomposer.org/doc/00-intro.md)
* Install Docker
  * For Mac: [Docker Desktop](https://docs.docker.com/desktop/install/mac-install/) | [Orbstack](https://docs.orbstack.dev/quick-start#installation)
  * For Windows: [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
  * For Linux: [Docker Desktop](https://docs.docker.com/desktop/install/linux-install/)
* Navigate to the project directory and run `composer install`
* Duplicate the .env.example: `cp .env.example .env`
* For running sail commands, by default, you are required to enter the full path to the executable in `vendor/bin/sail`. Most devs prefer to create an alias in their shell so they only have to type `sail`. Read the sail docs about [configuring a sail alias](https://laravel.com/docs/11.x/sail#configuring-a-shell-alias). Further documentation will assume an alias exists in your shell.

## Updating the Project
* If you get an error with the `composer.lock` file, you may need to update your project
* To update, navigate to the project directory and run `composer update`

## Starting the Project
* Start the project: `sail up -d`
* Run DB migration scripts only on initial setup and after creating new migrations `sail artisan migrate`
* View the project in your browser at http://localhost:80
  - The URL port number is configured in the `.env` file as APP_PORT

## Project Linting
* Navigate to the project directory and run `composer lint`

## Project Static Analysis
* Navigate to the project directory and run `composer analyse`

## Shutting Down the Project
- To stop the containers run `sail down`
