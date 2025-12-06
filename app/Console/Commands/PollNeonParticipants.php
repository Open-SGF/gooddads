<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Integrations\NeonApiService;
use App\Jobs\GenerateParticipantPdfJob; 
use App\Models\NeonHash;

class PollNeonParticipants extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'neon:poll-participants';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Polls Neon for today\'s participants and queues PDFs for new records';

    /**
     * Inject NeonApiService.
     */
    protected NeonApiService $neonApi;

    public function __construct(NeonApiService $neonApi)
    {
        parent::__construct();
        $this->neonApi = $neonApi;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $participants = $this->neonApi->getTodaysParticipants();

        foreach ($participants as $person) {
            $participantId = (int) $person['persons_id']['value'];

            // Build the full participant record
            $fullRecord = $this->neonApi->buildFullParticipantRecord($participantId);

            // Create a hash of the full record
            $hash = hash('sha256', json_encode($fullRecord));

            // Check if hash already exists
            if (!NeonHash::where('id', $hash)->exists()) {
                NeonHash::create(['id' => $hash]);
                dispatch(new GenerateParticipantPdfJob($participantId));
            }
        }

        $this->info('Polling complete.');
    }
}
