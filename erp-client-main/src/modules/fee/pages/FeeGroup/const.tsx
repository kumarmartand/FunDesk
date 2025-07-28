import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (updateStatus: any, editFeeGroup: any ) => {
  return [
    { title: "Name", dataIndex: "name", key: "name", filterDropdown: false },
    { title: "Description", dataIndex: "description", key: "description", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editFeeGroup(record.id)}
            title="Edit Fee Group"
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
    label: "Fee Group Name",
    type: "text",
    placeholder: "Enter Group name",
    rules: [{ required: true, message: "Please enter fees group name" }],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Please enter description",
    rules: [],
  },
];
