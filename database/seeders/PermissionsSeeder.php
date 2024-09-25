<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    public function __construct(
        private readonly PermissionRegistrar $permissionRegistrar,
    ) {

    }

    /**
     * Create the initial roles and permissions.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        $this->permissionRegistrar->forgetCachedPermissions();

        // create permissions
        // Permission::create(['name' => 'edit articles']);
        // Permission::create(['name' => 'delete articles']);
        // Permission::create(['name' => 'publish articles']);
        // Permission::create(['name' => 'unpublish articles']);

        $roleSuperAdmin = Role::create(['name' => 'Super Admin']);
        // $roleDirector = Role::create(['name' => 'Director']);
        // $roleRegionDirector = Role::create(['name' => 'Region Director']);
        // $roleRegionDirector->givePermissionTo('publish articles');
        // $roleAuditor = Role::create(['name' => 'Auditor']);
        // $roleIntake = Role::create(['name' => 'Intake']);
        $roleParticipant = Role::create(['name' => 'Participant']);

        $userAdmin = User::where('name', 'Admin User')->first();
        $userExample = User::where('name', 'Example User')->first();

        $userAdmin->assignRole($roleSuperAdmin);
        $userExample->assignRole($roleParticipant);
    }
}
