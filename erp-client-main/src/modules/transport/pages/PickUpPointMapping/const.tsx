import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (editPickUpPointMapping: any ) => {
  return [
    { title: "Route Name", dataIndex: "route_title", key: "route_title", filterDropdown: false },
    { title: "Pickup Point Name", dataIndex: "pickup_point_name", key: "pickup_point_name", filterDropdown: false },
    { title: "Distance (km)", dataIndex: "distance", key: "distance", filterDropdown: false },
    { title: "Pickup Time", dataIndex: "pickup_time", key: "pickup_time", filterDropdown: false },
    { title: "Monthly Fees", dataIndex: "monthly_fees", key: "monthly_fees", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editPickUpPointMapping(record.id)}
            title="Edit Pick up point mapping"
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

export const PickUpPointMappingActions = {
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


export const formFields = ({routeOptions, pickupPointOptions}): FieldType[] => [
  {
    name: "route",
    label: "Route Name",
    type: "select",
    placeholder: "Select Route",
    options: routeOptions,
    rules: [{ required: true, message: "Please select Route" }],
  },
  {
    name: "pickup_point",
    label: "Pick up point Name",
    type: "select",
    placeholder: "Select Pick up point",
    options: pickupPointOptions,
    rules: [{ required: true, message: "Please select Pick up point" }],
  },
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
