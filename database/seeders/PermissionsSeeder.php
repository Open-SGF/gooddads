<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Permission;
use App\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
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

		/**
		 * Create roles
		 */

		$admin = Role::create([
			'id' => Str::uuid(),
			'name' => 'admin',
		]);
		$director = Role::create([
			'id' => Str::uuid(),
			'name' => 'director',
		]);
		$regionDirector = Role::create([
			'id' => Str::uuid(),
			'name' => 'region director',
		]);
    $programDirector = Role::create([
      'id' => Str::uuid(),
      'name' => 'program director',
    ]);
		$facilitator = Role::create([
			'id' => Str::uuid(),
			'name' => 'facilitator',
		]);
		$auditor = Role::create([
			'id' => Str::uuid(),
			'name' => 'auditor',
		]);
		$intake = Role::create([
			'id' => Str::uuid(),
			'name' => 'intake',
		]);
		$participant = Role::create([
			'id' => Str::uuid(),
			'name' => 'participant',
		]);

		/**
		 * Create permissions
		 */

		// User permissions ***************************************************
		Permission::create([
			'id' => Str::uuid(),
			'name' => 'create users',
		]);
		Permission::create([
			'id' => Str::uuid(),
			'name' => 'edit users',
		]);
		Permission::create([
			'id' => Str::uuid(),
			'name' => 'delete users',
		]);
		Permission::create([
			'id' => Str::uuid(),
			'name' => 'list users',
		]);


		/**
		 * Assign permissions to roles
		 */
		$admin->givePermissionTo(Permission::all());
		$director->givePermissionTo([
			'create users',
			'edit users',
			'delete users',
			'list users',
		]);
		$regionDirector->givePermissionTo(['list users']);
    $programDirector->givePermissionTo(['list users']);
		$facilitator->givePermissionTo(['list users']);
		$auditor->givePermissionTo([]);
		$intake->givePermissionTo('create users');
		$participant->givePermissionTo([]);
	}
}
