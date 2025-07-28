import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (updateStatus: any, editSection: any ) => {
  return [
    // { title: "Name", dataIndex: "name", key: "name", filterDropdown: false },
    { title: "Fees Group", dataIndex: "fees_group_name", key: "fees_group_name", filterDropdown: false },
    { title: "Fees Type", dataIndex: "fees_type_name", key: "fees_type_name", filterDropdown: false },
    { title: "Amount", dataIndex: "amount", key: "amount", filterDropdown: false },
    { title: "Due date", dataIndex: "due_date", key: "due_date", filterDropdown: false },
    { title: "Fine Type", dataIndex: "fine_type", key: "fine_type", filterDropdown: false },
    { title: "Fine Value", dataIndex: "fix_amount", key: "fine_type", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editSection(record.id)}
            title="Edit section"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete section ${record.id}`)}
            title="Delete section"
          /> */}
          {/* <Switch
            checked={record.is_active}
            onChange={(checked) => {
              updateStatus(record.id, checked);
            }}
            style={{ marginLeft: 16, maxWidth: 50 }}
            title={record.is_active ? "Active" : "Inactive"}
          /> */}
        </>
      )
    },
  ]
};

export const sectionActions = {
  edit: (id: string) => {
    alert(`Edit section ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete section ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle section ${id} active state to ${isActive}`);
  }
};


export const formFields = ({feeTypeOptions, feeGroupOptions}): FieldType[] => [
  {
    name: 'fees_type',
    label: 'Fees Type',
    type: 'select',
    placeholder: 'Select a Fees Type',
    options: feeTypeOptions, // dynamically loaded options
    rules: [{ required: true, message: 'Please select a Fees type' }],
  },
  {
    name: 'fees_group',
    label: 'Fees Group',
    type: 'select',
    placeholder: 'Select a Fees Group',
    options: feeTypeOptions, // dynamically loaded options
    rules: [{ required: true, message: 'Please select a Fees Group' }],
  },
  // {
  //   name: "name",
  //   label: "Fee Master Name",
  //   type: "text",
  //   placeholder: "Enter Fee Master Name",
  //   rules: [{ required: true, message: "Please enter Fee Master name" }],
  // },
  {
    name: "due_date",
    label: "Due Date",
    type: "date",
    placeholder: "Select Due Date",
    rules: [{ required: true, message: "Please select due date" }],
  },
  {
    name: "amount",
    label: "Amount",
    type: "number",
    placeholder: "Enter Amount",
    rules: [{ required: true, message: "Please enter amount" }],
  },
  {
    name: "fine_type",
    label: "Fine Type",
    type: "radio",
    options: [
      { label: 'Fixed', value: 'Fix' },
      { label: 'Percentage', value: 'Percentage' },
    ],
    placeholder: "Select Fine Type",
    rules: [{ required: true, message: "Please select fine type" }],
  },
  {
    name: "fix_amount",
    label: "Fine Value",
    type: "number",
    placeholder: "Enter Fine Amount",
    rules: [{ required: true, message: "Please enter fine amount" }],
  },
];
