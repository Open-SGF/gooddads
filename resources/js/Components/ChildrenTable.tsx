import React from "react";
import { Child } from "@/types";
import { Button, Checkbox, Input, InputError, Label } from "@/Components/ui"

export interface ChildrenTableProps {
  children: Child[];
  setChildren: (children: Child[]) => void;
  errors: any;
}

const ChildrenTable = React.forwardRef<HTMLTableElement, ChildrenTableProps>(
  ({ children, setChildren, errors, ...props }, ref) => {
    
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
      <div className="flex flex-col max-w-[768px]">
          <div className="flex flex-col items-center p-8">
            <Label className="text-2xl">Family Information</Label>
          </div>
          <div className="flex flex-col">
            {children.map((child, index) => (
              
              <div key={index} className="grid grid-cols-4 border-b mb-4 pb-4">
                <div className="flex-1 p-2">
                  <Label>First Name</Label>

                  <Input
                    placeholder="First name"
                    className="w-full"
                    autoComplete={'off'}
                    value={child.first_name}
                    onChange={(e) => handleInputChange(index, "first_name", e.target.value)}
                  />
                  <InputError message={errors?.[index]?.first_name?.replace(`children_info.${index}.first_name`, 'First name')} className="mt-2" />
                </div>
                <div className="flex-1 p-2">
                  <Label>Last Name</Label>
                  <Input
                    placeholder="Last name"
                    className="w-full"
                    autoComplete={'off'}
                    value={child.last_name}
                    onChange={(e) => handleInputChange(index, "last_name", e.target.value)}
                  />
                  <InputError message={errors?.[index]?.last_name?.replace(`children_info.${index}.last_name`, 'Last name')} className="mt-2" />
                </div>
                <div className="flex-1 p-2">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    placeholder="Date of Birth"
                    className="w-full"
                    autoComplete={'off'}
                    value={child.date_of_birth}
                    onChange={(e) => handleInputChange(index, "date_of_birth", e.target.value)}
                  />
                  <InputError message={errors?.[index]?.date_of_birth?.replace(`children_info.${index}.date_of_birth`, 'Date of birth')} className="mt-2" />
                </div>
                <div className="flex flex-col p-3 gap-3 row-span-2">
                  <Label>Contact Level</Label>
                  <div className="flex p-2 items-center gap-1">
                    <Checkbox
                      id="custody"
                      checked={child.custody}
                      onCheckedChange={(isChecked) => handleInputChange(index, "custody", isChecked)}
                    />
                    <Label htmlFor="custody">Custody</Label>
                    <InputError message={errors?.[index]?.custody} className="mt-2" />
                  </div>
                  <div className="flex p-2 items-center gap-1">
                    <Checkbox
                      id="visitation"
                      checked={child.visitation}
                      onCheckedChange={(isChecked) => handleInputChange(index, "visitation", isChecked)}
                    />
                    <Label htmlFor="visitation">Visitation</Label>
                    <InputError message={errors?.[index]?.visitation} className="mt-2" />
                  </div>
                  <div className="flex p-2 items-center gap-1">
                    <Checkbox        
                      id="phone_contact"              
                      checked={child.phone_contact}
                      onCheckedChange={(isChecked) => handleInputChange(index, "phone_contact", isChecked)}
                    />
                    <Label htmlFor="phone_contact">Phone Contact</Label>
                    <InputError message={errors?.[index]?.phone_contact?.replace(`children_info.${index}.phone_contact`, 'Phone contact')} className="mt-2" />
                  </div>
                </div>
                <div className="flex-1 p-2 col-span-2">
                  <Label>Monthly Child Support</Label>
                  <Input
                    type="number"
                    placeholder="Monthy Child Support"
                    className="w-full"
                    autoComplete={'off'}
                    value={child.child_support}
                    onChange={(e) => handleInputChange(index, "child_support", parseFloat(e.target.value))}
                  />
                  <InputError message={errors?.[index]?.child_support?.replace(`children_info.${index}.child_support`, 'Child support')} className="mt-2" />
                </div>

                <div className="flex items-end justify-center p-2">
                  <Button
                    type = 'button'
                    onClick={() => handleDelete(index)}
                    size="default"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
      </div>
    );
  }
);
ChildrenTable.displayName = "ChildrenTable";
export {ChildrenTable}
