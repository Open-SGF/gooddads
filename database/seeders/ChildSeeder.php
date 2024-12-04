<?php

namespace Database\Seeders;

use App\Models\Child;
use App\Models\Participant;
use Illuminate\Database\Seeder;

class ChildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $participants = Participant::all();

        if ($participants->isEmpty()) {
            $this->command->info('No participants found. Skipping child creation.');

            return;
        }

        Child::factory()
            ->count(20)
            ->recycle($participants)
            ->create();
    }
}
