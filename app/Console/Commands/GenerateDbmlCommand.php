<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class GenerateDbmlCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dbml:generate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a DBML file from the current database schema';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        [$driver, $dsn] = $this->getConnectionInfo();
        $db2dbmlPath = $this->getDbmlExecutablePath();

        if (! file_exists($db2dbmlPath)) {
            $this->error('db2dbml executable not found in node_modules/.bin');

            return 1;
        }

        $outputFile = base_path('database/schema.dbml');

        $command = "\"$db2dbmlPath\" $driver '$dsn' -o \"$outputFile\"";

        $this->info('Generating DBML file...');

        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            $this->error('Failed to generate DBML file');
            $this->error(implode("\n", $output));

            return 1;
        }

        $this->info('DBML file generated successfully at '.$outputFile);

        $this->deleteEmptyErrorLog();

        return 0;
    }

    /**
     * @return array{string, string}
     */
    private function getConnectionInfo(): array
    {
        $connection = Config::get('database.default');
        $config = Config::get("database.connections.$connection");

        $driver = $config['driver'];
        $host = $config['host'];
        $port = $config['port'] ?? ($driver === 'mysql' ? 3306 : '');
        $database = $config['database'];
        $username = $config['username'];
        $password = $config['password'];

        $passwordEncoded = urlencode($password); // Encode password to handle special characters
        $dsn = "$driver://$username:$passwordEncoded@$host:$port/$database";

        return [$driver, $dsn];
    }

    private function getDbmlExecutablePath(): string
    {

        if (DIRECTORY_SEPARATOR === '\\') {
            return base_path('node_modules/.bin/db2dbml.cmd');
        }

        return base_path('node_modules/.bin/db2dbml');
    }

    private function deleteEmptyErrorLog(): void
    {
        $errorLogFile = base_path('dbml-error.log');
        if (file_exists($errorLogFile)) {
            if (filesize($errorLogFile) === 0) {
                unlink($errorLogFile);
            }
        }
    }
}
