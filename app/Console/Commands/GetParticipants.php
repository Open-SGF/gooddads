<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Integrations\NeonApiService;

class GetParticipants extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-participants';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $neonService = new NeonApiService();
        $participants = $neonService->getTodaysParticipants();

        return 0;
    }
}
