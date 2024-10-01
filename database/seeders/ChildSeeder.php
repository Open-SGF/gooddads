<?php

namespace Database\Seeders;

use App\Models\Child;
use App\Models\Dad;
use Illuminate\Database\Seeder;

class ChildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dads = Dad::all();

        if ($dads->isEmpty()) {
            $this->command->info('No dads found. Skipping child creation.');

            return;
        }

        Child::factory()
            ->count(20)
            ->recycle($dads)
            ->create();
    }
}
