## Project Setup
* [Install PHP](https://www.php.net/manual/en/install.php)
* [Install Composer](https://getcomposer.org/doc/00-intro.md)
* Install Docker
  * For Mac: [Orbstack](https://docs.orbstack.dev/quick-start#installation)
  * For Windows: [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
  * For Linux: [Docker Desktop](https://docs.docker.com/desktop/install/linux-install/)
* Navigate to the project directory and run `composer install`
* For running sail commands, by default, you are required to enter the full path to the executable in `vendor/bin/sail`. Most devs prefer to create an alias in their shell so they only have to type `sail`. Read the sail docs about [configuring a sail alias](https://laravel.com/docs/11.x/sail#configuring-a-shell-alias). Further documentation will assume an alias exists in your shell.
* Start the project: `sail up`
