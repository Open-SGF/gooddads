<?php

namespace Database\Seeders;

use App\Models\Participant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ParticipantDisclosureSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::factory()->create(['email' => 'pdftest@example.com']);
        $participant = Participant::factory()->create();

        DB::table('participant_disclosure_authorization')->insert([
            'id' => Str::uuid(),
            'participant_id' => $participant->id,
            'is_dss_authorized' => true,
            'is_dys_authorized' => false,
            'is_mhd_authorized' => true,
            // ...other fields...
            'consumer_signature' => 'Jane Doe',
            'signature_date' => now(),
            'survey_by_email' => true,
            'survey_by_mail' => false,
            'survey_by_online' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
