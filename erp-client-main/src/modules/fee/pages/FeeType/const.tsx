import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (updateStatus: any, editFeeType: any ) => {
  return [
    { title: "Name", dataIndex: "name", key: "name", filterDropdown: false },
    { title: "Code", dataIndex: "fees_code", key: "fees_code", filterDropdown: false },
    { title: "Description", dataIndex: "description", key: "description", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editFeeType(record.id)}
            title="Edit Fee Type"
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
    label: "Fee Type Name",
    type: "text",
    placeholder: "Enter fees type name",
    rules: [{ required: true, message: "Please enter fees type name" }],
  },
  {
    name: "fees_code",
    label: "Fees Code",
    type: "text",
    placeholder: "Enter fees code",
    rules: [{ required: true, message: "Please enter fees code" }],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Please enter description",
    rules: [],
  },
];
