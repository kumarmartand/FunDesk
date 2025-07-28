import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";
import type { FieldType } from "../../../../Components/ErpAddForm/TypeConst";

export const getColumns = (updateStatus: any, editSection: any ) => {
  return [
    { title: "Class Name", dataIndex: "class_name", key: "class_name", filterDropdown: false },
    { title: "Section Name", dataIndex: "name", key: "name", filterDropdown: false },
    {
      title: "Actions", key: "actions", render: (_, record) => (
        <>
          <Button
            type="link"
            style={{ fontSize: 20 }}
            icon={<EditOutlined />}
            onClick={() => editSection(record.id)}
            title="Edit section"
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


export const formFields = (classData: object): FieldType[] => [
  {
    name: 'class_id',
    label: 'Class',
    type: 'select',
    placeholder: 'Select a Class',
    options: classData, // dynamically loaded options
    rules: [{ required: true, message: 'Please select a class' }],
  },
  {
    name: "name",
    label: "Section Name",
    type: "text",
    placeholder: "Enter Section Name",
    rules: [{ required: true, message: "Please enter section name" }],
  },
];
