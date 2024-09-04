<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(20)->create();
        $this->call([
            UserSeeder::class,
            RegionSeeder::class,
            ProgramSeeder::class,
            ResponsiblePartySeeder::class,

            DadSeeder::class,
            DadClassSeeder::class,
            ModuleSeeder::class,
            ChildSeeder::class,
            QuizSeeder::class,
            ProgramAssignmentSeeder::class,
            DadClassAssignmentSeeder::class,
            ResponsiblePartyAssignmentSeeder::class,

            QuizQuestionSeeder::class,
            QuizQuestionOptionSeeder::class,
            QuizAssignmentSeeder::class,
        ]);
    }
}
