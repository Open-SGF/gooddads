<?php

namespace Database\Seeders;

use App\Enums\Permissions;
use App\Enums\Roles;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
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

        /**
         * Create roles
         */
        $roles = Roles::cases();
        foreach ($roles as $role) {
            Role::create([
                'id' => Str::uuid(),
                'name' => $role->value,
            ]);
        }
        $admin = Role::get()->where('name', Roles::Admin)->first();
        $director = Role::get()->where('name', Roles::Director)->first();
        $regionDirector = Role::get()->where('name', Roles::RegionDirector)->first();
        $programDirector = Role::get()->where('name', Roles::ProgramDirector)->first();
        $facilitator = Role::get()->where('name', Roles::Facilitator)->first();
        $auditor = Role::get()->where('name', Roles::Auditor)->first();
        $intake = Role::get()->where('name', Roles::Intake)->first();
        $participant = Role::get()->where('name', Roles::Participant)->first();

        /**
         * Create permissions
         */
        $permissions = Permissions::cases();
        foreach ($permissions as $permission) {
            Permission::create([
                'name' => $permission->value,
            ]);
        }

        /**
         * Assign permissions to roles
         */
        $admin->givePermissionTo(Permission::all());
        $director->givePermissionTo([
            Permissions::CreateUsers,
            Permissions::EditUsers,
            Permissions::DeleteUsers,
            Permissions::ListUsers,
            Permissions::ListCurriculum,
            Permissions::ListClasses,
            Permissions::ListReports,
        ]);
        $regionDirector->givePermissionTo([Permissions::ListUsers]);
        $programDirector->givePermissionTo([Permissions::ListUsers]);
        $facilitator->givePermissionTo([Permissions::ListUsers]);
        $auditor->givePermissionTo([]);
        $intake->givePermissionTo(Permissions::CreateUsers);
        $participant->givePermissionTo([]);
    }
}
