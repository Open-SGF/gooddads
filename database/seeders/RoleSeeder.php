<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
  public function __construct(
    private readonly PermissionRegistrar $permissionRegistrar,
  )
  {

  }

  /**
   * Run the database seeds.
   */
  public function run(): void
  {

    // Reset cached roles and permissions
    $this->permissionRegistrar->forgetCachedPermissions();

    $admin = Role::create([
      'uuid' => Str::uuid(),
      'name' => 'admin',
    ]);
    Role::create([
      'uuid' => Str::uuid(),
      'name' => 'director',
    ]);
    Role::create([
      'uuid' => Str::uuid(),
      'name' => 'region director',
    ]);
    Role::create([
      'uuid' => Str::uuid(),
      'name' => 'facilitator',
    ]);
    Role::create([
      'uuid' => Str::uuid(),
      'name' => 'auditor',
    ]);
    Role::create([
      'uuid' => Str::uuid(),
      'name' => 'intake',
    ]);
    Role::create([
      'uuid' => Str::uuid(),
      'name' => 'participant',
    ]);

    $createUsers = Permission::create([
      'uuid' => Str::uuid(),
      'name' => 'create users',
    ]);
    Permission::create([
      'uuid' => Str::uuid(),
      'name' => 'edit users',
    ]);
    Permission::create([
      'uuid' => Str::uuid(),
      'name' => 'delete users',
    ]);
    Permission::create([
      'uuid' => Str::uuid(),
      'name' => 'list users',
    ]);

    // Find Admin user and assign all permissions
    $admin->givePermissionTo('create users');
  }
}
