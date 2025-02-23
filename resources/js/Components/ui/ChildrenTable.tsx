import React from "react";
import { Child } from "@/types";
import { Button } from "@/Components/ui"

export interface ChildrenTableProps {
  children: Child[];
  setChildren: (children: Child[]) => void;
}

const ChildrenTable = React.forwardRef<HTMLTableElement, ChildrenTableProps>(
  ({ children, setChildren, ...props }, ref) => {
    
    const handleInputChange = (index: number, field: keyof Child, value: any) => {
        // Update the value of a specific field in the child object at the given index
        const updatedChildren = [...children];
        updatedChildren[index] = { ...updatedChildren[index], [field]: value };
        setChildren(updatedChildren);
    };

    const handleDelete = (index: number) => {
        const updatedChildren = children.filter((_, i) => i !== index);
        setChildren(updatedChildren); // Make sure to update the parent state
    };

    return (
      <table ref={ref} {...props}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Montly Child Support</th>
            <th>Custody</th>
            <th>Visitation</th>
            <th>Phone Contact</th>
          </tr>
        </thead>
        <tbody>
          {children.map((child, index) => (
            <tr key={index}>
<td>
                <input
                  type="text"
                  value={child.first_name}
                  onChange={(e) => handleInputChange(index, "first_name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={child.last_name}
                  onChange={(e) => handleInputChange(index, "last_name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="date"
                  value={child.date_of_birth}
                  onChange={(e) => handleInputChange(index, "date_of_birth", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={child.child_support}
                  onChange={(e) => handleInputChange(index, "child_support", parseFloat(e.target.value))}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={child.custody}
                  onChange={(e) => handleInputChange(index, "custody", e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={child.visitation}
                  onChange={(e) => handleInputChange(index, "visitation", e.target.checked)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={child.phone_contact}
                  onChange={(e) => handleInputChange(index, "phone_contact", e.target.checked)}
                />
              </td>
              <td>
                <Button
                  onClick={() => handleDelete(index)}
                  size="default"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);
ChildrenTable.displayName = "ChildrenTable";
export {ChildrenTable}
