<?php

namespace Database\Seeders;

use App\Models\ResponsibleParty;
use Illuminate\Database\Seeder;

class ResponsiblePartySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a specified number of ResponsibleParty instances
        ResponsibleParty::factory()
            ->count(50)  // Adjust the count as needed
            ->create();

        // Ensure we have at least one of each role
        $roles = ['admin', 'caseManager', 'other'];
        foreach ($roles as $role) {
            if (! ResponsibleParty::where('role', $role)->exists()) {
                ResponsibleParty::factory()->create(['role' => $role]);
            }
        }
    }
}
