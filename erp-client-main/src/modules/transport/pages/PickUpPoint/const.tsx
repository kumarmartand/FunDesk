import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (editPickUpPoint: any ) => {
  return [
    { title: "Pickup Point Name", dataIndex: "pickup_point", key: "pickup_point", filterDropdown: false },
    { title: "Latitude", dataIndex: "latitude", key: "latitude", filterDropdown: false },
    { title: "Longitude", dataIndex: "longitude", key: "longitude", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editPickUpPoint(record.id)}
            title="Edit Pick up point"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete Pick up point ${record.id}`)}
            title="Delete Pick up point"
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

export const PickUpPointActions = {
  edit: (id: string) => {
    alert(`Edit Pick up point ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete Pick up point ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle Pick up point ${id} active state to ${isActive}`);
  }
};

export const formFields: FieldType[] = [
  {
    name: "pickup_point",
    label: "Pick up point Name",
    type: "text",
    placeholder: "Enter Pick up point name",
    rules: [{ required: true, message: "Please enter Pick up point name" }],
  },
  {
    name: "latitude",
    label: "Latitude",
    type: "number",
    placeholder: "Enter Latitude",
    rules: [{ required: true, message: "Please enter Latitude" }],
  },
  {
    name: "longitude",
    label: "Longitude",
    type: "number",
    placeholder: "Enter Longitude",
    rules: [{ required: true, message: "Please enter Longitude" }],
  },
];
