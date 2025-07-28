import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (editHostel: any ) => {
  return [
    { title: "Hostel Name", dataIndex: "name", key: "name", filterDropdown: false },
    { title: "Type", dataIndex: "hostel_type", key: "hostel_type", filterDropdown: false },
    { title: "Location", dataIndex: "address", key: "address", filterDropdown: false },
    { title: "Intake", dataIndex: "intake", key: "intake", filterDropdown: false },
    { title: "Description", dataIndex: "description", key: "description", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editHostel(record.id)}
            title="Edit Hostel"
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
    alert(`Edit Hostel ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete Hostel ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle Hostel ${id} active state to ${isActive}`);
  }
};

export const formFields: FieldType[] = [
  {
    name: "name",
    label: "Hostel Name",
    type: "text",
    placeholder: "Enter Hostel Name",
    rules: [{ required: true, message: "Please enter hostel name" }],
  },
  {
    name: "hostel_type",
    label: "Hostel Type",
    type: "select",
    options: [
      {label: "Girls", value: "Girls"},
      {label: "Boys", value: "Boys"},
      {label: "Common", value: "Common"},
    ],
    placeholder: "Enter Hostel Type",
    rules: [{ required: true, message: "Please enter hostel type" }],
  },
  {
    name: "address",
    label: "Hostel Location",
    type: "text",
    placeholder: "Enter Hostel Location",
    rules: [{ required: true, message: "Please enter hostel location" }],
  },
  {
    name: "intake",
    label: "Intake",
    type: "number",
    placeholder: "Enter Intake value",
    rules: [{ required: true, message: "Please enter intake value" }],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter Description",
  }
];
