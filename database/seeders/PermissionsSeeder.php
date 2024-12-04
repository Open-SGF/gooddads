<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
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

        Role::create([
            'uuid' => Str::uuid(),
            'name' => 'Admin',
            'guard_name' => 'web',
        ]);
        Role::create([
            'uuid' => Str::uuid(),
            'name' => 'Participant',
            'guard_name' => 'web',
        ]);
    }
}
