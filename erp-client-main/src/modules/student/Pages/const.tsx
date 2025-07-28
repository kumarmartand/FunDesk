import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (editStudent: any, updateStatus: any, handleStudentDrawer: any) => {
  return [
    { title: "Roll Number", dataIndex: "roll_number", key: "roll_number", filterDropdown: false },
    { title: "Name", key: "name", render: (_, record) => `${record?.first_name || ''} ${record?.last_name || ''}` },
    { title: "Class", dataIndex: "school_class_name", key: "school_class_name", filterDropdown: false },
    { title: "Section", dataIndex: "section_name", key: "section_name", filterDropdown: false },
    { title: "Contact", dataIndex: "mobile_number", key: "mobile_number", filterDropdown: false },
    { title: "Email", dataIndex: "email", key: "email", filterDropdown: false },

    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editStudent(record.id)}
            title="Edit Student"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete Pick up point ${record.id}`)}
            title="Delete Pick up point"
          /> */}
          <Button
            type="link"
            style={{ fontSize: 20, color: 'blue', marginLeft: 8 }}
            icon={<EyeOutlined />}
            onClick={() => handleStudentDrawer(record.id)}
            title="View Student Details"
          />
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


export const formFields = (): FieldType[] => [
  {
    name: "distance",
    label: "Distance (km)",
    type: "number",
    placeholder: "Enter Distance in km",
    rules: [{ required: true, message: "Please enter Distance" }],
  },
  {
    name: "pickup_time",
    label: "Pickup Time",
    type: "time",
    placeholder: "Select Pickup Time",
    rules: [{ required: true, message: "Please select Pickup Time" }],
  },
  {
    name: "monthly_fees",
    label: "Monthly Fees",
    type: "number",
    placeholder: "Enter Monthly Fees",
    rules: [{ required: true, message: "Please select monthly fees" }],
  }
];
