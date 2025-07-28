import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (updateStatus: any, editHostelRoom: any ) => {
  return [
    // { title: "Name", dataIndex: "name", key: "name", filterDropdown: false },
    { title: "Room Number", dataIndex: "room_no", key: "room_no", filterDropdown: false },
    { title: "Hostel", dataIndex: "hostel_name", key: "hostel_name", filterDropdown: false },
    { title: "Room Type", dataIndex: "room_type_name", key: "room_type_name", filterDropdown: false },
    { title: "No of Beds", dataIndex: "number_of_beds", key: "number_of_beds", filterDropdown: false },
    { title: "Cost/Bed (Rs)", dataIndex: "cost_per_bed", key: "cost_per_bed", filterDropdown: false },
    { title: "Description", dataIndex: "description", key: "description", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editHostelRoom(record.id)}
            title="Edit Hostel Room Mapping"
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


export const formFields = ({hostelOptions, hostelRoomOptions}): FieldType[] => [
  {
    name: "room_no",
    label: "Room Number",
    type: "number",
    placeholder: "Enter Room Number",
    rules: [{ required: true, message: "Please enter room number" }],
  },
  {
    name: 'hostel',
    label: 'Hostel',
    type: 'select',
    placeholder: 'Select a Hostel',
    options: hostelOptions, // dynamically loaded options
    rules: [{ required: true, message: 'Please select a hostel' }],
  },
  {
    name: 'room_type',
    label: 'Room Type',
    type: 'select',
    placeholder: 'Select a Room Type',
    options: hostelRoomOptions, // dynamically loaded options
    rules: [{ required: true, message: 'Please select a room type' }],
  },
  {
    name: "number_of_beds",
    label: "Number of beds",
    type: "number",
    placeholder: "Enter number of beds",
    rules: [{ required: true, message: "Please enter number of beds" }],
  },
  {
    name: "cost_per_bed",
    label: "Cost Per Bed",
    type: "number",
    placeholder: "Enter cost per bed",
    rules: [{ required: true, message: "Please enter cost per bed" }],
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter description",
    rules: [{ required: true, message: "Please enter description" }],
  },
];
