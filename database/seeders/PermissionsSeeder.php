<?php

namespace Database\Seeders;

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    public function __construct(
        private readonly PermissionRegistrar $permissionRegistrar,
    ) {
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        $this->permissionRegistrar->forgetCachedPermissions();

        // Create roles
        $admin = Role::create(['name' => Roles::Admin]);
        $director = Role::create(['name' => Roles::Director]);
        $regionDirector = Role::create(['name' => Roles::RegionDirector]);
        $programDirector = Role::create(['name' => Roles::ProgramDirector]);
        $facilitator = Role::create(['name' => Roles::Facilitator]);
        $auditor = Role::create(['name' => Roles::Auditor]);
        $intake = Role::create(['name' => Roles::Intake]);
        $participant = Role::create(['name' => Roles::Participant]);

        // Create permissions
        $permissions = Permissions::cases();
        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission->value,
            ]);
        }

        // Assign permissions to roles
        $admin->givePermissionTo(Permission::all());
        $director->givePermissionTo([
            Permissions::CreateUsers,
            Permissions::EditUsers,
            Permissions::DeleteUsers,
            Permissions::ListUsers,
            Permissions::ViewUsers,
            Permissions::ListCurriculum,
            Permissions::ListClasses,
            Permissions::ListReports,
        ]);
        $regionDirector->givePermissionTo([
            Permissions::ListUsers,
            Permissions::ViewUsers,
        ]);
        $programDirector->givePermissionTo([
            Permissions::ListUsers,
            Permissions::ViewUsers,
        ]);
        $facilitator->givePermissionTo([
            Permissions::ListUsers,
            Permissions::ViewUsers,
        ]);
        $auditor->givePermissionTo([]);
        $intake->givePermissionTo(Permissions::CreateUsers);
        $participant->givePermissionTo([]);
    }
}
