'use client';

import React, { ReactNode } from 'react';
import { Button, Table } from '@radix-ui/themes';
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';
import './roles.css';

interface Props {
  children?: ReactNode;
  className?: string;
  value: string;
}
type Ref = HTMLDivElement;

const SelectItem = React.forwardRef<Ref, Props>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className={classnames('SelectItem', className)} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export type Role = {
  id: string,
  fullName: string,
  emailAddress: string,
  userName: string
}

const AdminTableRow = ({role}: { role: Role }) => {
  const deleteUser = () => {
    console.log(`deleted user: ${role.userName}`);
  };

  return (
    <>
      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>{role.userName}</Table.RowHeaderCell>
          <Table.RowHeaderCell>{role.fullName}</Table.RowHeaderCell>
          <Table.Cell>{role.emailAddress}</Table.Cell>
          <Table.Cell>
            <Select.Root>
              <Select.Trigger className="SelectTrigger" aria-label="Food">
                <Select.Value placeholder="Role" />
                <Select.Icon className="SelectIcon">
                  <ChevronDownIcon />
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="SelectContent">
                  <Select.ScrollUpButton className="SelectScrollButton">
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="SelectViewport">
                    <Select.Group>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton className="SelectScrollButton">
                    <ChevronDownIcon />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </Table.Cell>
          <Table.Cell>
            <Button color='red' onClick={deleteUser}>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </>
  )   
}

export default AdminTableRow;