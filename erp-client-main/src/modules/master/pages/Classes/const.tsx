import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (editClass: any ) => {
  return [
    { title: "Class Name", dataIndex: "name", key: "name", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editClass(record.id)}
            title="Edit class"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete class ${record.id}`)}
            title="Delete class"
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

export const ClassActions = {
  edit: (id: string) => {
    alert(`Edit class ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete class ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle class ${id} active state to ${isActive}`);
  }
};

export const formFields: FieldType[] = [
  {
    name: "name",
    label: "Class Name",
    type: "text",
    placeholder: "Enter class name",
    rules: [{ required: true, message: "Please enter class name" }],
  }
];
