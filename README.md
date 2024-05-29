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
* Start the project: `sail up -d`
* Run DB migration scripts only on initial setup and after creating new migrations `sail migrate`
* To stop the containers run `sail down`
* View the project in your browser at http://localhost:80
