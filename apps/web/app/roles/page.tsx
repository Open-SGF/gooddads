import AdminTableRow, { Role } from '@/components/AdminTableRow/AdminTableRow';
import React from 'react';
import { Table } from '@radix-ui/themes';

const AdminRoles = () => {
  const dummyData: Role[] = [
    {
      id: '123456',
      fullName: 'Danilo Sousa',
      emailAddress: 'danilo@example.com',
      userName: 'dsousa',
    },
    {
      id: '837483',
      fullName: 'Zahra Ambessa',
      emailAddress: 'zahra@example.com',
      userName: 'zambessa',
    },
    {
      id: '384923',
      fullName: 'Jasper Eriksson',
      emailAddress: 'jasper@example.com',
      userName: 'jeriksson',
    },
  ];

	return (
		<>
      {dummyData.map((user) => {
        console.log(user)
      })}
      <Table.Root variant='surface' size='2'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        {dummyData.map(user => (
          <AdminTableRow role={user} />
        ))}
      </Table.Root>
		</>
	);
}

export default AdminRoles;