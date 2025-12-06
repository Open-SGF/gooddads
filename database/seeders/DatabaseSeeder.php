<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PermissionsSeeder::class,
            UserSeeder::class,
            RegionSeeder::class,
            ProgramSeeder::class,
            ParticipantSeeder::class,
            ParticipantClassSeeder::class,
            ModuleSeeder::class,
            ChildSeeder::class,
            QuizSeeder::class,
            ProgramAssignmentSeeder::class,
            ParticipantClassAssignmentSeeder::class,
            ParticipantStaffAssignmentSeeder::class,
            QuizQuestionSeeder::class,
            QuizQuestionOptionSeeder::class,
            QuizAssignmentSeeder::class,
        ]);
    }
}
