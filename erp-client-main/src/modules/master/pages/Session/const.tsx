import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (updateStatus: any, editSession: any ) => {
  return [
    { title: "Session Name", dataIndex: "name", key: "name", filterDropdown: false },
    { title: "Start Date", dataIndex: "start_date", key: "start_date", filterDropdown: false },
    { title: "End Date", dataIndex: "end_date", key: "end_date", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editSession(record.id)}
            title="Edit session"
          />
          {/* <Button
            type="link"
            style={{ fontSize: 20, color: 'red', marginLeft: 8 }}
            icon={<DeleteOutlined />}
            onClick={() => alert(`Delete session ${record.id}`)}
            title="Delete session"
          /> */}
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

export const SessionActions = {
  edit: (id: string) => {
    alert(`Edit session ${id}`);
  }
  ,
  delete: (id: string) => {
    alert(`Delete session ${id}`);
  }
  ,
  toggleActive: (id: string, isActive: boolean) => {
    alert(`Toggle session ${id} active state to ${isActive}`);
  }
};

export const formFields: FieldType[] = [
  {
    name: "name",
    label: "Session Name",
    type: "text",
    placeholder: "Enter session name",
    rules: [{ required: true, message: "Please enter session name" }],
  },
  {
    name: "start_date",
    label: "Start Date",
    type: "date",
    placeholder: "Select start date",
    rules: [{ required: true, message: "Please select start date" }],
  },
  {
    name: "end_date",
    label: "End Date",
    type: "date",
    placeholder: "Select end date",
    rules: [{ required: true, message: "Please select end date" }],
  }
];
