import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (editRoute: any ) => {
  return [
    { title: "Route Name", dataIndex: "title", key: "title", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editRoute(record.id)}
            title="Edit Route"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete Route ${record.id}`)}
            title="Delete Route"
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

export const RouteActions = {
  edit: (id: string) => {
    alert(`Edit Route ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete Route ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle Route ${id} active state to ${isActive}`);
  }
};

export const formFields: FieldType[] = [
  {
    name: "title",
    label: "Route Name",
    type: "text",
    placeholder: "Enter Route name",
    rules: [{ required: true, message: "Please enter Route name" }],
  }
];
