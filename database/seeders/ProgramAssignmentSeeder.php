<?php

namespace Database\Seeders;

use App\Models\ProgramAssignment;
use Illuminate\Database\Seeder;

class ProgramAssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProgramAssignment::factory()
            ->count(5)
            ->create();
    }
}
