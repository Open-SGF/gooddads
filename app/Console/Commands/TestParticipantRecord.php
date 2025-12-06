<?php

namespace App\Console\Commands;

use App\Services\Integrations\NeonApiService;
use Illuminate\Console\Command;

class TestParticipantRecord extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-participant-record {id : The ID of the participant to test}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the buildParticipantRecord() method and output the JSON response';

    /**
     * Inject NeonApiService.
     */
    protected NeonApiService $neon;

    public function __construct(NeonApiService $neon)
    {
        parent::__construct();   // required in Laravel Commands
        $this->neon = $neon;
    }

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $id = $this->argument('id');

        $this->info("Testing buildParticipantRecord() for ID: {$id}");
        $this->newLine();

        try {
            $record = $this->neon->buildFullParticipantRecord($id);

            $this->line(json_encode($record, JSON_PRETTY_PRINT));

        } catch (\Throwable $e) {
            $this->error('Error: '.$e->getMessage());

            return self::FAILURE;
        }

        return self::SUCCESS;
    }
}
