import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (editRoomType: any ) => {
  return [
    { title: "Room Type", dataIndex: "room_type", key: "room_type", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editRoomType(record.id)}
            title="Edit Room Type"
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

export const roomTypeActions = {
  edit: (id: string) => {
    alert(`Edit room type ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete room type ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle room type ${id} active state to ${isActive}`);
  }
};

export const formFields: FieldType[] = [
  {
    name: "room_type",
    label: "Room Type",
    type: "text",
    placeholder: "Enter Room Type",
    rules: [{ required: true, message: "Please enter Room Type" }],
  }
];

