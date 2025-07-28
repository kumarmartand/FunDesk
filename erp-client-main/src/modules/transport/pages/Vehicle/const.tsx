import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";
const mediaBaseUrl = 'https://erp.imminenttechnology.com/media/'
export const getColumns = (editVehicle: any, setPreviewImage: any ) => {
  return [
    { title: "Vehicle Number", dataIndex: "vehicle_number", key: "vehicle_number", filterDropdown: false },
    { title: "Vehicle Model", dataIndex: "vehicle_model", key: "vehicle_model", filterDropdown: false },
    { title: "Year Made", dataIndex: "year_made", key: "year_made", filterDropdown: false },
    { title: "Registration Number", dataIndex: "registration_number", key: "registration_number", filterDropdown: false },
    { title: "Chasis Number", dataIndex: "chasis_number", key: "chasis_number", filterDropdown: false },
    { title: "Max Seating Capacity", dataIndex: "max_seating_capacity", key: "max_seating_capacity", filterDropdown: false },
    { title: "Driver Name", dataIndex: "driver_name", key: "driver_name", filterDropdown: false },
    { title: "Driver Licence No.", dataIndex: "driver_licence", key: "driver_licence", filterDropdown: false },
    { title: "Driver Contact No.", dataIndex: "driver_contact_no", key: "driver_contact_no", filterDropdown: false },
    { title: "Note", dataIndex: "note", key: "note", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {record.vehicle_photo && (
            <Button
              type="link"
              style={{ fontSize: 20, color: '#1890ff', marginLeft: 2 }}
              icon={<EyeOutlined />}
              onClick={() => {
                setPreviewImage(mediaBaseUrl+record.vehicle_photo);
              }}
              title={record.vehicle_photo}
            />
          )}
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editVehicle(record.id)}
            title="Edit Vehicle"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete Vehicle ${record.id}`)}
            title="Delete Vehicle"
          /> */}
          {/* <Switch
            checked={record.is_active}
            onChange={(checked) => {
              updateStatus(record.id, checked);
            }}
            style={{ marginLeft: 16, maxWidth: 50 }}
            title={record.is_active ? "Active" : "Inactive"}
          /> */}
        </div>
      )
    },
  ]
};

export const VehicleActions = {
  edit: (id: string) => {
    alert(`Edit Vehicle ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete Vehicle ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle Vehicle ${id} active state to ${isActive}`);
  }
};

export const formFields: FieldType[] = [
  {
    name: "vehicle_number",
    label: "Vehicle Number",
    type: "text",
    placeholder: "Enter Vehicle Number",
    rules: [{ required: true, message: "Please enter Vehicle number" }],
  },
  {
    name: "vehicle_model",
    label: "Vehicle Model",
    type: "text",
    placeholder: "Enter Vehicle Model",
    rules: [{ required: true, message: "Please enter Vehicle model" }],
  },
  {
    name: "year_made",
    label: "Year Made",
    type: "number",
    placeholder: "Enter Year Made",
    rules: [{ required: true, message: "Please enter Year made" }],
  },
  {
    name: "registration_number",
    label: "Registration Number",
    type: "text",
    placeholder: "Enter Registration Number",
    rules: [{ required: true, message: "Please enter Registration number" }],
  },
  {
    name: "chasis_number",
    label: "Chasis Number",
    type: "text",
    placeholder: "Enter Chasis Number",
    // rules: [{ required: true, message: "Please enter Chasis number" }],
  },
  {
    name: "max_seating_capacity",
    label: "Max Seating Capacity",
    type: "number",
    placeholder: "Enter Max Seating Capacity",
    rules: [{ required: true, message: "Please enter Max seating capacity" }],
  },
  {
    name: "driver_name",
    label: "Driver Name",
    type: "text",
    placeholder: "Enter Driver Name",
  },
  {
    name: "driver_licence",
    label: "Driver Licence No.",
    type: "text",
    placeholder: "Enter Driver Licence No.",
  },
  {
    name: "driver_contact_no",
    label: "Driver Contact No.",
    type: "text",
    placeholder: "Enter Driver Contact No.",
  },
  {
    name: "note",
    label: "Note (Optional)",
    type: "textarea",
    placeholder:
      'Any additional information about the vehicle. This field is optional.',
  },
  {
    name: "vehicle_photo",
    label: "Vehicle Photo",
    type: "file",
    accept: "image/*", // "image/*,.pdf",
    maxSizeMB: 2,
    // rules: [{ required: true, message: "Please upload a file" }],
  }
];
