<?php

namespace App\Jobs;

use App\Services\PdfIntakeFormService;
use App\Services\NeonDataTransformer;
use App\Services\Integrations\NeonApiService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Hash;

class GenerateTodaysPdfs implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {

    }

    /**
     * Execute the job.
     */
    public function handle(NeonDataTransformer $transformer, PdfIntakeFormService $pdfService, NeonApiService $neonApi): void
    {
        $todaysParticipants = $neonApi->getTodaysParticipants();

        // Fetch amd transform participant data from Neon
        $raw = $neonApi->getParticipant($participantId);
        $participant = $transformer->transformPerson($raw);

        // Generate filled PDF
        $pdfPath = $pdfService->generate($participant);

        $input = $request->only(['first_name', 'last_name', 'birthday']);

        // Convert fields into a stable string
        $string = json_encode($input);

        // Create a 64-char hash
        $hash = hash('sha256', $string);
    }
}
