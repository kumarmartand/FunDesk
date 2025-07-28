import { EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (updateStatus: any, editFeeDiscount: any ) => {
  return [
    { title: "Name", dataIndex: "name", key: "name", filterDropdown: false },
    { title: "Discount Code", dataIndex: "discount_code", key: "discount_code", filterDropdown: false },
    { title: "Discount Type", dataIndex: "discount_type", key: "discount_type", filterDropdown: false },
    { title: "Discount Value", dataIndex: "amount", key: "amount", filterDropdown: false },
    { title: "Description", dataIndex: "description", key: "description", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editFeeDiscount(record.id)}
            title="Edit Fee Discount"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete session ${record.id}`)}
            title="Delete session"
          /> */}
          <Switch
            checked={record.is_active}
            onChange={(checked) => {
              updateStatus(record.id, checked);
            }}
            style={{ marginLeft: 16, maxWidth: 50 }}
            title={record.is_active ? "Active" : "Inactive"}
          />
        </>
      )
    },
  ]
};

export const formFields: FieldType[] = [
  {
    name: "name",
    label: "Fee Discount Name",
    type: "text",
    placeholder: "Enter session name",
    rules: [{ required: true, message: "Please enter fees discount name" }],
  },
  {
    name: "discount_code",
    label: "Fee Discount Code",
    type: "text",
    placeholder: "Enter Discount Code",
    rules: [{ required: true, message: "Please enter fees discount Code" }],
  },
  {
    name: "discount_type",
    label: "Discount Type",
    type: "radio",
    options: [
      { label: 'Fixed', value: 'Fix' },
      { label: 'Percentage', value: 'Percentage' },
    ],
    placeholder: "Select Discount Type",
    rules: [{ required: true, message: "Please select discount type" }],
  },
  {
    name: "amount",
    label: "Discount Value",
    type: "number",
    placeholder: "Enter Discount Value",
    rules: [{ required: true, message: "Please enter discount value" }],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Please enter description",
    rules: [],
  },
];
