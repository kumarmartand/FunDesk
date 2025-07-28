import React, { useEffect, useState, useCallback } from "react";
import {
  Drawer,
  Typography,
  Divider,
  Spin,
  Alert,
  Row,
  Col,
  Avatar,
  Card,
  Tag,
  Space,
  Descriptions,
  Button,
  Badge,
} from "antd";
import {
  CloseOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  BankOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import axiosInstance from "../../shared/api/axiosInstance";

const { Title, Text } = Typography;

type FeeDetail = {
  id: number;
  amount: string;
  paid: string;
  discount: string;
  due_date: string;
  remarks: string | null;
  fees_master: number;
};

type Student = {
  id: number;
  roll_number: string;
  admission_date: string;
  caste_category: string;
  school_class: number;
  section: number;
  house: string | null;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  religion: string;
  caste: string;
  mobile_number: string;
  email: string;
  student_photo: string;
  blood_group: string;
  measurement_date: string;
  allocation_date: string;
  cost_per_bed: string;
  guardian_type: string;
  guardian_name: string;
  guardian_relation: string;
  guardian_phone: string | null;
  guardian_occupation: string | null;
  guardian_email: string | null;
  guardian_photo: string;
  guardian_address: string | null;
  current_address: string;
  permanent_address: string;
  is_guardian_address_same_as_current: boolean;
  is_permanent_same_as_current: boolean;
  bank_account_number: string;
  bank_name: string;
  ifsc_code: string;
  rte: string;
  fee_details: FeeDetail[];
  [key: string]: any;
};

type StudentDrawerProps = {
  open: boolean;
  studentId: number | null;
  onClose: () => void;
};

const StudentDrawer: React.FC<StudentDrawerProps> = ({
  open,
  studentId,
  onClose,
}) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaBaseUrl = 'https://erp.imminenttechnology.com/media/'

  const fetchStudentData = useCallback(
      async (id: number) => {
          setLoading(true);
          setError(null);
          setStudent(null);
          try {
              const res = await axiosInstance.get(`/student/${id}/`);
              if (!res.data.data) {
                  throw new Error("Student not found");
              }
              setStudent(res.data.data);
          } catch (error: any) {
              setError(error?.message || "Failed to fetch student details");
              setTimeout(onClose, 2000);
          } finally {
              setLoading(false);
          }
      },
      [onClose]
  );

  useEffect(() => {
      if (!open || !studentId) return;
      fetchStudentData(studentId);
  }, [open, studentId, fetchStudentData]);

  const getBloodGroupColor = (bloodGroup: string) => {
    const colors: { [key: string]: string } = {
      'A+': 'red',
      'A-': 'volcano',
      'B+': 'orange',
      'B-': 'gold',
      'AB+': 'lime',
      'AB-': 'green',
      'O+': 'cyan',
      'O-': 'blue',
    };
    return colors[bloodGroup] || 'default';
  };

  const calculateDueAmount = (fee: FeeDetail) => {
    return (parseFloat(fee.amount) - parseFloat(fee.paid) - parseFloat(fee.discount)).toFixed(2);
  };

  const renderStudentHeader = () => (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '24px',
      margin: '-24px -24px 24px -24px',
      borderRadius: '8px 8px 0 0'
    }}>
      <Space align="center" size="large">
        { student?.student_photo ? (
          <Avatar
            size={80}
            src={`${mediaBaseUrl}${student.student_photo}`}
            style={{ 
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
        ) : (
          <Avatar
            size={80}
            icon={<UserOutlined />}
            style={{ 
              backgroundColor: '#f0f2f5',
              color: '#1890ff',
              border: '3px solid white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          />
        )
        }
        
        <div>
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            {student?.first_name} {student?.last_name}
          </Title>
          <Space>
            <Tag color="white" style={{ color: '#667eea', fontWeight: 500 }}>
              Roll No: {student?.roll_number}
            </Tag>
            <Tag color={getBloodGroupColor(student?.blood_group || '')}>
              {student?.blood_group}
            </Tag>
          </Space>
        </div>
      </Space>
    </div>
  );

  return (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
            <UserOutlined style={{ marginRight: 8 }} />
            Student Details
          </Title>
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={onClose}
            style={{ border: 'none' }}
          />
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={650}
      closable={false}
      styles={{
        body: { padding: '24px' },
        header: { borderBottom: '2px solid #f0f0f0' }
      }}
    >
      {loading && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '200px' 
        }}>
          <Spin size="large" tip="Loading student details..." />
        </div>
      )}

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      {student && (
        <div>
          {renderStudentHeader()}

          <Card 
            title={
              <Space>
                <UserOutlined style={{ color: '#1890ff' }} />
                <span>Personal Information</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
            headStyle={{ backgroundColor: '#fafafa' }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Gender">
                <Tag color={student.gender === 'Male' ? 'blue' : 'pink'}>
                  {student.gender}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                <Space>
                  <CalendarOutlined />
                  {student.date_of_birth}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Admission Date">
                <Space>
                  <CalendarOutlined />
                  {student.admission_date}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Class & Section">
                <Space>
                  <Tag color="geekblue">{student.school_class_name}</Tag>
                  <Tag color="purple">{student.section_name}</Tag>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Caste Category">
                <Tag color="default">{student.caste_category}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Religion">{student.religion}</Descriptions.Item>
              {student.house && (
                <Descriptions.Item label="House">
                  <Tag color="gold">{student.house}</Tag>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          <Card 
            title={
              <Space>
                <PhoneOutlined style={{ color: '#52c41a' }} />
                <span>Contact Information</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
            headStyle={{ backgroundColor: '#fafafa' }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Mobile">
                <Space>
                  <PhoneOutlined />
                  <Text copyable>{student.mobile_number}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <Space>
                  <MailOutlined />
                  <Text copyable>{student.email}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Current Address">
                <Text ellipsis={{ tooltip: student.current_address }}>
                  {student.current_address}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Permanent Address">
                <Text ellipsis={{ tooltip: student.permanent_address }}>
                  {student.permanent_address}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card 
            title={
              <Space>
                <UserOutlined style={{ color: '#fa8c16' }} />
                <span>Guardian Information</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
            headStyle={{ backgroundColor: '#fafafa' }}
          >
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Guardian Name">
                <Space>
                  <Avatar size="small" src={student.guardian_photo} icon={<UserOutlined />} />
                  {student.guardian_name}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Relation">
                <Tag color="orange">{student.guardian_relation}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Guardian Type">
                <Tag color="volcano">{student.guardian_type}</Tag>
              </Descriptions.Item>
              {student.guardian_phone && (
                <Descriptions.Item label="Guardian Phone">
                  <Space>
                    <PhoneOutlined />
                    <Text copyable>{student.guardian_phone}</Text>
                  </Space>
                </Descriptions.Item>
              )}
              {student.guardian_email && (
                <Descriptions.Item label="Guardian Email">
                  <Space>
                    <MailOutlined />
                    <Text copyable>{student.guardian_email}</Text>
                  </Space>
                </Descriptions.Item>
              )}
              {student.guardian_occupation && (
                <Descriptions.Item label="Occupation">
                  {student.guardian_occupation}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          { student.bank_name && (
            <Card 
              title={
                <Space>
                  <BankOutlined style={{ color: '#13c2c2' }} />
                  <span>Banking Information</span>
                </Space>
              }
              style={{ marginBottom: 16, backgroundColor: '#fafafa' }}
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Bank Name">
                  <Space>
                    <BankOutlined />
                    {student.bank_name}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Account Number">
                  <Text copyable code>{student.bank_account_number}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="IFSC Code">
                  <Text copyable code>{student.ifsc_code}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="RTE">
                  <Tag color={student.rte === 'Yes' ? 'green' : 'red'}>
                    {student.rte}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}

          <Card 
            title={
              <Space>
                <DollarOutlined style={{ color: '#eb2f96' }} />
                <span>Fee Details</span>
                <Badge 
                  count={student.fee_details?.length || 0} 
                  style={{ backgroundColor: '#52c41a' }} 
                />
              </Space>
            }
            style={{ backgroundColor: '#fafafa' }}
          >
            {student.fee_details && student.fee_details.length > 0 ? (
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {student.fee_details.map((fee, index) => {
                  const dueAmount = parseFloat(calculateDueAmount(fee));
                  return (
                    <Card
                      key={fee.id}
                      size="small"
                      style={{ 
                        marginBottom: 8,
                        border: dueAmount > 0 ? '1px solid #ff4d4f' : '1px solid #52c41a'
                      }}
                    >
                      <Row gutter={16}>
                        <Col span={8}>
                          <Text strong>Amount</Text>
                          <div>₹{fee.amount}</div>
                        </Col>
                        <Col span={8}>
                          <Text strong>Paid</Text>
                          <div style={{ color: '#52c41a' }}>₹{fee.paid}</div>
                        </Col>
                        <Col span={8}>
                          <Text strong>Due</Text>
                          <div style={{ color: dueAmount > 0 ? '#ff4d4f' : '#52c41a' }}>
                            ₹{calculateDueAmount(fee)}
                          </div>
                        </Col>
                      </Row>
                      <Divider style={{ margin: '8px 0' }} />
                      <Row>
                        <Col span={24}>
                          <Space>
                            <CalendarOutlined />
                            <Text type="secondary">Due Date: {fee.due_date}</Text>
                          </Space>
                          {fee.discount !== '0' && (
                            <Tag color="green" style={{ marginLeft: 8 }}>
                              Discount: ₹{fee.discount}
                            </Tag>
                          )}
                        </Col>
                      </Row>
                      {fee.remarks && (
                        <div style={{ marginTop: 8 }}>
                          <Text type="secondary" italic>
                            Remarks: {fee.remarks}
                          </Text>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px 0',
                color: '#999'
              }}>
                <DollarOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <div>No fee details available</div>
              </div>
            )}
          </Card>
        </div>
      )}
    </Drawer>
  );
};

export default StudentDrawer;