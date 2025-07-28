import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (editVehicleMapping: any ) => {
  return [
    { title: "Route Name", dataIndex: "route_title", key: "route_title", filterDropdown: false },
    {
      title: "Vehicles",
      key: "vehicles",
      render: (_, record) => {
        if (!record.vehicles || !Array.isArray(record.vehicles)) return "-";
        // @ts-ignore
        const vehicleNames = (record.vehicles_data || []).filter((v: any) =>
          record.vehicles.includes(v.id)
        ).map((v: any) => v.vehicle_number);
        return vehicleNames.length ? vehicleNames.join(", ") : "-";
      }
    },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editVehicleMapping(record.id)}
            title="Edit Vehicle Mapping"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete Vehicle Mapping ${record.id}`)}
            title="Delete Vehicle Mapping"
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

export const VehicleMappingActions = {
  edit: (id: string) => {
    alert(`Edit Vehicle Mapping ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete Vehicle Mapping ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle Vehicle Mapping ${id} active state to ${isActive}`);
  }
};

export const formFields = ({routeOptions, vehicleOptions}): FieldType[] => [
  
  {
    name: "route",
    label: "Route Name",
    type: "select",
    placeholder: "Select Route",
    options: routeOptions,
    rules: [{ required: true, message: "Please select Route" }],
  },
  {
    name: "vehicles",
    label: "Vehicle Selection",
    type: "multiselect",
    placeholder: "Select Vehicles",
    options: vehicleOptions,
    rules: [{ required: true, message: "Please select one vehicle" }],
  },
];

