import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Modal, 
  Tabs, 
  Spin, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Upload, 
  Button, 
  InputNumber,
  Card,
  Row,
  Col,
  Checkbox,
  Collapse,
  Typography,
  Space,
  Divider,
  Progress,
  Tag,
  message
} from 'antd';
import { 
  ExclamationCircleOutlined, 
  UploadOutlined, 
  DeleteOutlined,
  FileOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  UserOutlined,
  HomeOutlined,
  BookOutlined,
  BankOutlined
} from '@ant-design/icons';
import type { FormInstance, UploadFile } from 'antd';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import axiosInstance from '../../shared/api/axiosInstance';

const { TextArea } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { Text, Title } = Typography;

interface StudentFormProps {
  initialData?: any;
  onSubmit?: (data: any) => void;
  isEdit?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

interface TabError {
  [key: string]: boolean;
}

interface FeeStructure {
  id: int;
  name: string;
  amount: number;
  description?: string;
  subFees?: FeeStructure[];
  isSelected?: boolean;
}

interface DocumentField {
  id: string;
  title: string;
  file?: UploadFile;
  isRequired?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  onSubmit,
  isEdit = false,
  isOpen = false,
  onClose = () => {},
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tabErrors, setTabErrors] = useState<TabError>({});
  const [activeTab, setActiveTab] = useState('basic');
  const [documents, setDocuments] = useState<DocumentField[]>([]);
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);
  const [formProgress, setFormProgress] = useState(0);
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [hostels, setHostels] = useState<any[]>([]);
  const [hostelRooms, setHostelRooms] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [pickupPoints, setPickupPoints] = useState<any[]>([]);
  const [houses, setHouses] = useState<any[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedHostelId, setSelectedHostelId] = useState<number | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const [totalFee, setTotalFee] = useState(0);

  // Mock fee structures data
  const mockFeeStructures: FeeStructure[] = [
    {
      id: 1,
      name: 'Tuition Fees',
      amount: 5000,
      description: 'Regular academic fees',
      subFees: [
        { id: '1a', name: 'Class Fees', amount: 3000 },
        { id: '1b', name: 'Laboratory Fees', amount: 1500 },
        { id: '1c', name: 'Library Fees', amount: 500 }
      ]
    },
    {
      id: 2,
      name: 'Transport Fees',
      amount: 2000,
      description: 'Bus transportation fees',
      subFees: [
        { id: '2a', name: 'Monthly Pass', amount: 1500 },
        { id: '2b', name: 'Fuel Charges', amount: 500 }
      ]
    },
    {
      id: 3,
      name: 'Hostel Fees',
      amount: 8000,
      description: 'Accommodation charges',
      subFees: [
        { id: '3a', name: 'Room Rent', amount: 5000 },
        { id: '3b', name: 'Mess Charges', amount: 2500 },
        { id: '3c', name: 'Maintenance', amount: 500 }
      ]
    }
  ];

  const tabs = [
    { key: 'basic', label: '📋 Basic Info' },
    { key: 'personal', label: '👤 Personal' },
    { key: 'other', label: '🚌 Other' },
    { key: 'documents', label: '📄 Documents' },
    { key: 'fees', label: '💰 Fees' },
  ];

  // Field configuration by tab with validation rules
  const fieldsByTab: { [key: string]: string[] } = {
    basic: ['roll_number', 'school_class', 'section', 'admission_date', 'house'],
    personal: ['first_name', 'last_name', 'gender', 'date_of_birth'],
    other: [],
    documents: [],
    fees: [],
  };

  // Initialize form data
  useEffect(() => {
    if (isOpen) {
      
      // Fetch all masters data
      axiosInstance.get('master/masters/all/')
        .then(res => {
          const data = res?.data?.data || {};
          setFeeStructures(data.fees_master || []);
          const dummyClasses =  [
            { id: 1, name: 'Class 1' },
          ];
          const dummySections = [
            { id: 1, name: 'Section A', class: 1 },
          ];
          setClasses(data.classes || dummyClasses);
          setSections(data.sections || dummySections);
          setHostels(data.hostels || []);
          setHostelRooms(data.hostel_rooms || []);
          setRoutes(data.route_vehicles || []);
          setPickupPoints(data.route_pickup_points || []);
          setHouses(data.houses || []);
          // setCategories(data.caegory || []);
        })
        .catch(err => {
          toast.error('Failed to fetch master data');
          console.error('Masters fetch error:', err);
        });

      if (initialData && isEdit) {
        const formattedData = { ...initialData };
        if (formattedData.admission_date) {
          formattedData.admission_date = dayjs(formattedData.admission_date);
        }
        if (formattedData.date_of_birth) {
          formattedData.date_of_birth = dayjs(formattedData.date_of_birth);
        }

        form.setFieldsValue(formattedData);
        setSelectedClassId(formattedData.school_class);
        setSelectedHostelId(formattedData.hostel);
        setSelectedRouteId(formattedData.route_id);
        setDocuments(formattedData.documents || []);
        
        // Extract all fee group IDs from the response and set them in selectedFees
        if (Array.isArray(initialData.fee_details)) {
          const feeIds = initialData.fee_details.map((fee: any) => fee.fees_group).filter(Boolean);
          
          setSelectedFees(feeIds);
        } else {
          setSelectedFees([]);
        }

      } else {
        form.resetFields();
        setDocuments([]);
        setSelectedFees([]);
      }

      // Defer progress calculation to allow React to register fields
      setTimeout(() => {
        calculateProgress();
      }, 0);
    }
  }, [initialData, isEdit, isOpen]);


  // Calculate form completion progress
  const calculateProgress = useCallback(() => {
    const allFields = Object.values(fieldsByTab).flat();
    const values = form.getFieldsValue();
    const filledFields = allFields.filter(field => {
      const value = values[field];
      return value !== undefined && value !== null && value !== '';
    });
    const progress = Math.round((filledFields.length / allFields.length) * 100);
    setFormProgress(progress);
  }, [form, fieldsByTab]);

  // Validate tab without re-rendering
  const validateTab = async (tabKey: string): Promise<boolean> => {
    const fieldsToValidate = fieldsByTab[tabKey] || [];

    if (fieldsToValidate.length === 0) {
      setTabErrors(prev => ({ ...prev, [tabKey]: false }));
      return true;
    }

    try {
      // ⏳ Wait one tick for React/AntD to catch up
      await new Promise(resolve => setTimeout(resolve, 0));

      await form.validateFields(fieldsToValidate);
      setTabErrors(prev => ({ ...prev, [tabKey]: false }));
      return true;
    } catch (error) {
      setTabErrors(prev => ({ ...prev, [tabKey]: true }));
      console.error(`Tab ${tabKey} validation failed`, error);
      return false;
    }
  };



  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
    calculateProgress();
  }, [calculateProgress]);
  // Document management
  const addDocument = useCallback(() => {
    setDocuments(prev => {
      const newIndex = prev.length + 1;
      const newDoc: DocumentField = {
        id: `document_${newIndex}`,
        title: '',
        isRequired: false
      };
      return [...prev, newDoc];
    });
  }, []);

  // When a document is removed, re-index the IDs and update form fields accordingly
  const removeDocument = useCallback((docId: string) => {
    setDocuments(prev => {
      const filtered = prev.filter(doc => doc.id !== docId);
      // Re-index IDs as document_1, document_2, ...
      const reIndexed = filtered.map((doc, idx) => ({
        ...doc,
        id: `document_${idx + 1}`
      }));
      // Reset form fields for all document fields
      prev.forEach(doc => {
        form.setFieldsValue({
          [`${doc.id}_title`]: undefined,
          [`${doc.id}_file`]: undefined,
        });
      });
      // Set form fields for re-indexed docs
      reIndexed.forEach(doc => {
        form.setFieldsValue({
          [`${doc.id}_title`]: doc.title,
          [`${doc.id}_file`]: doc.file,
        });
      });
      return reIndexed;
    });
  }, []);


  const updateDocument = useCallback((docId: string, field: string, value: any) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, [field]: value } : doc
    ));
  }, []);

  // Fee management
  const handleFeeSelection = useCallback((feeId: string, checked: boolean) => {
    setSelectedFees(prev => {
      if (checked) {
        return [...prev, feeId];
      } else {
        return prev.filter(id => id !== feeId);
      }
    });
  }, []);

  useEffect(() => {
    setTotalFee(feeStructures
      .filter(fee => selectedFees.includes(fee.group_id))
      .filter(fee => selectedFees.includes(fee.group_id))
      .reduce((total, fee) => total + fee.amount, 0));
  }, [feeStructures, selectedFees]);

  // Enhanced upload props
  const uploadProps = {
    beforeUpload: (file: File) => {
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      const isValidType = [
        'image/jpeg', 
        'image/png', 
        'image/gif', 
        'application/pdf', 
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ].includes(file.type);
      
      if (!isValidSize) {
        toast.error('File size must be less than 5MB');
        return false;
      }
      if (!isValidType) {
        toast.error('Only image and document files are allowed');
        return false;
      }
      return false; // Prevent auto upload
    },
    maxCount: 1,
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
  };

  // Form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Validate all tabs
      const tabKeys = tabs.map(t => t.key);
      const validationResults = await Promise.all(
        tabKeys.map(tab => validateTab(tab))
      );
      
      if (!validationResults.every(Boolean)) {
        toast.error('Please fill all required fields');
        setLoading(false);
        return;
      }

      const values = await form.validateFields();
      const submitData = new FormData();
      
      // Process form values
      const getComparableValue = (val: any) => {
        if (dayjs.isDayjs(val)) return val.format('YYYY-MM-DD');
        if (typeof val === 'object' && val?.fileList) return val.fileList[0]?.originFileObj?.name;
        return val;
      };

      const compareInitial = initialData || {};

      Object.keys(values).forEach(key => {
        const newVal = getComparableValue(values[key]);
        const oldVal = getComparableValue(compareInitial[key]);

        if (newVal !== oldVal) {
          if (key === 'admission_date' || key === 'date_of_birth') {
            if (dayjs.isDayjs(values[key])) {
              submitData.append(key, values[key].format('YYYY-MM-DD'));
            }
          } else if (key.includes('_photo') || key.includes('_file')) {
            const file = values[key]?.fileList?.[0]?.originFileObj;
            if (file) {
              submitData.append(key, file);
            }
          } else {
            submitData.append(key, String(values[key]));
          }
        }
      });

      // Add selected fees
      submitData.append('fee_details', JSON.stringify(selectedFees));
      
      const endpoint = isEdit ? `student/${initialData.id}/` : 'student/create/';
      const method = isEdit ? 'patch' : 'post';  // Lowercase for axiosInstance[method]

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axiosInstance[method](endpoint, submitData, config);

      const isSuccess = (
        (response?.status === 200 || response?.status === 201) &&
        (!response.data.status || response.data.status === 200 || response.data.status === 201)
      );

      if (isSuccess) {
        toast.success(`Student ${isEdit ? 'updated' : 'created'} successfully!`);
        onSubmit?.(response.data);
        onClose();
      } else {
        throw new Error('Failed to submit form');
      }

    } catch (error: any) {
      console.error('Submit error:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Tab content renderers
  const renderBasicInfo = () => (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} lg={8}>
        <Form.Item
          name="roll_number"
          label="Roll Number"
          rules={[
            { required: true, message: 'Roll Number is required' },
            { pattern: /^[A-Za-z0-9]+$/, message: 'Only alphanumeric characters allowed' }
          ]}
        >
          <Input placeholder="Enter roll number" />
        </Form.Item>
      </Col>
      
      <Col xs={24} sm={12} lg={8}>
        <Form.Item
          name="school_class"
          label="Class"
          rules={[{ required: true, message: 'Class is required' }]}
        >
          <Select 
            placeholder="Select class"
            onChange={(value) => {
              setSelectedClassId(value);
              form.setFieldsValue({ section: undefined });
            }}
          >
            {classes.map(cls => (
              <Option key={cls.id} value={cls.id}>{cls.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Form.Item
        name="section"
        label="Section"
        rules={[{ required: true, message: 'Section is required' }]}
      >
        <Select placeholder="Select section" disabled={!selectedClassId} style={{ width: '26.4vw', marginLeft: '0.6vw' }}>
          {sections
            .filter(sec => sec.class_id === selectedClassId)
            .map((section) => (
              <Option key={section.id} value={section.id}>
                {section.name}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Col xs={24} sm={12} lg={8}>
        <Form.Item
          name="admission_date"
          label="Admission Date"
          rules={[{ required: true, message: 'Admission Date is required' }]}
        >
          <DatePicker 
            className="w-full" 
            placeholder="Select admission date"
            disabledDate={(current) => current && current > dayjs().endOf('day')}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} lg={8}>
        <Form.Item
          name="house"
          label="House"
          rules={[{ required: true, message: 'House is required' }]}
        >
          <Select 
            placeholder="Select House"
          >
            {houses.map(cls => (
              <Option key={cls.id} value={cls.id}>{cls.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col xs={24} sm={12} lg={8}>
        <Form.Item name="caste_category" label="Caste Category">
          <Select placeholder="Select caste category">
            <Option value="General">General</Option>
            <Option value="OBC">OBC</Option>
            <Option value="SC">SC</Option>
            <Option value="ST">ST</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col xs={24} lg={12}>
        <Form.Item 
          name="current_address" 
          label="Current Address"
          rules={[{ max: 200, message: 'Address should not exceed 200 characters' }]}
        >
          <TextArea rows={3} placeholder="Enter current address" showCount maxLength={200} />
        </Form.Item>
      </Col>

      <Col xs={24} lg={12}>
        <Form.Item 
          name="permanent_address" 
          label="Permanent Address"
          rules={[{ max: 200, message: 'Address should not exceed 200 characters' }]}
        >
          <TextArea rows={3} placeholder="Enter permanent address" showCount maxLength={200} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderPersonalInfo = () => (
    <div style={{maxHeight: '50vh', overflowX: 'hidden', overflowY: 'auto' }}>
      {/* Student Details */}
      <Card size="small" title="Student Information" className="mb-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[
                { required: true, message: 'First Name is required' },
                { pattern: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces allowed' }
              ]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="last_name"
              label="Last Name"
              rules={[
                { required: true, message: 'Last Name is required' },
                { pattern: /^[a-zA-Z\s]+$/, message: 'Only letters and spaces allowed' }
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Gender is required' }]}
            >
              <Select placeholder="Select gender">
                <Option value="Male">👨 Male</Option>
                <Option value="Female">👩 Female</Option>
                <Option value="Other">⚧ Other</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="date_of_birth"
              label="Date of Birth"
              rules={[{ required: true, message: 'Date of Birth is required' }]}
            >
              <DatePicker 
                className="w-full" 
                placeholder="Select date of birth"
                disabledDate={(current) => current && current > dayjs().endOf('day')}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="religion" label="Religion">
              <Input placeholder="Enter religion" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="caste" label="Caste">
              <Input placeholder="Enter caste" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="mobile_number"
              label="Mobile Number"
              rules={[
                { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit mobile number' }
              ]}
            >
              <Input placeholder="Enter mobile number" prefix="+91" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="height" label="Height (cm)">
              <InputNumber className="w-full" placeholder="Height" min={50} max={250} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={4}>
            <Form.Item name="weight" label="Weight (kg)">
              <InputNumber className="w-full" placeholder="Weight" min={10} max={200} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} lg={8}>
            <Form.Item name="blood_group" label="Blood Group">
              <Select placeholder="Select blood group">
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                  <Option key={group} value={group}>🩸 {group}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item name="student_photo" label="Student Photo">
              <Upload {...uploadProps} listType="picture-card">
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload Photo</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Parent Details */}
      <Card size="small" title="Parent Information" className="mb-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Form.Item name="father_name" label="Father's Name">
              <Input placeholder="Enter father's name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="mother_name" label="Mother's Name">
              <Input placeholder="Enter mother's name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="father_occupation" label="Father Occupation">
              <Input placeholder="Enter father ocucupation" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="mother_occupation" label="Mother Occupation">
              <Input placeholder="Enter mother ocucupation" />
            </Form.Item>
          </Col>             
          <Col xs={24} sm={12}>
            <Form.Item name="father_phone" label="Father Phone">
              <Input placeholder="Enter father phone" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="mother_phone" label="Mother Phone">
              <Input placeholder="Enter mother phone" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="father_photo" label="Father's Photo">
              <Upload {...uploadProps} listType="picture-card">
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload Photo</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>      
          <Col xs={24} sm={12}>
            <Form.Item name="mother_photo" label="Mother's Photo">
              <Upload {...uploadProps} listType="picture-card">
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload Photo</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Guardian & Bank Details */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card size="small" title="Guardian Information">
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Form.Item name="guardian_name" label="Guardian Name">
                  <Input placeholder="Enter guardian name" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="guardian_relation" label="Guardian Relation">
                  <Input placeholder="Enter guardian relation" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="guardian_occupation" label="Guardian Occupation">
                    <Select placeholder="Select guardian relation" defaultValue="Other">
                    {['Father', 'Mother', 'Other'].map(relation => (
                      <Option key={relation} value={relation}>
                      {relation}
                      </Option>
                    ))}
                    </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="guardian_phone" label="Guardian Phone">
                  <Input placeholder="Enter guardian phone" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="guardian_photo" label="Guardian Photo">
                  <Upload {...uploadProps} listType="picture-card">
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload Photo</div>
                    </div>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card size="small" title={<><BankOutlined /> Bank Details</>}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Form.Item 
                  name="bank_account_number" 
                  label="Account Number"
                  rules={[
                    { pattern: /^\d{9,18}$/, message: 'Account number should be 9-18 digits' }
                  ]}
                >
                  <Input placeholder="Enter account number" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="bank_name" label="Bank Name">
                  <Input placeholder="Enter bank name" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item 
                  name="ifsc_code" 
                  label="IFSC Code"
                >
                  <Input placeholder="Enter IFSC code" style={{ textTransform: 'uppercase' }} />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderOtherInfo = () => (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12}>
        <Form.Item name="vehicle" label="Transport Vehicle">
          <Select
            placeholder="Select vehicle"
            onChange={(value, option) => {
              const routeId = option.routeId;
              setSelectedRouteId(routeId);
              form.setFieldsValue({ pickup_point: undefined });
            }}
          >
            {routes.map((routeGroup) => (
              <Select.OptGroup key={routeGroup.id} label={routeGroup.route_title}>
                {routeGroup.vehicles_data.map(vehicle => (
                  <Option 
                    key={vehicle.id} 
                    value={vehicle.id} 
                    routeId={routeGroup.route}
                  >
                    🚐 {vehicle.vehicle_number}
                  </Option>
                ))}
              </Select.OptGroup>
            ))}
          </Select>
        </Form.Item>

      </Col>

      <Col xs={24} sm={12}>
        <Form.Item name="pickup_point" label="Pickup Point">
          <Select placeholder="Select pickup point" disabled={!selectedRouteId}>
            {pickupPoints
              .filter(p => p.route === selectedRouteId)
              .map(point => (
                <Option key={point.id} value={point.id}>
                  📍 {point.pickup_point_name}
                </Option>
              ))}
          </Select>
        </Form.Item>

      </Col>

      <Col xs={24} sm={12}>
        <Form.Item name="hostel" label="Hostel">
          <Select
            placeholder="Select hostel"
            onChange={(value) => {
              setSelectedHostelId(value);
              form.setFieldsValue({ hostel_room: undefined });
            }}
          >
            {hostels.map(h => (
              <Option key={h.id} value={h.id}>
                🏠 {h.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col xs={24} sm={12}>
        <Form.Item name="hostel_room" label="Room">
          <Select placeholder="Select room" disabled={!selectedHostelId}>
            {hostelRooms
              .filter(room => room.hostel === selectedHostelId)
              .map(room => (
                <Option key={room.id} value={room.id}>
                  🛏️ {room.room_no} ({room.room_type_name})
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );

  const renderDocuments = () => (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title level={5}>📄 Document Management</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={addDocument}
          style={{ marginBottom: 16 }}
        >
          Add Document
        </Button>
      </div>

      {documents.length === 0 ? (
        <Card>
          <div className="text-center py-8">
            <FileOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
            <p className="text-gray-500 mt-4">No documents added yet</p>
            <Button type="dashed" onClick={addDocument} icon={<PlusOutlined />}>
              Add First Document
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <Card
              key={doc.id}
              size="small"
              title={`Document ${index + 1}`}
              extra={
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeDocument(doc.id)}
                >
                  Remove
                </Button>
              }
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                  <Form.Item 
                    name={`${doc.id}_title`} 
                    label="Document Title"
                    rules={[{ required: true, message: 'Document title is required' }]}
                  >
                    <Input 
                      placeholder="Enter document title"
                      onChange={(e) => updateDocument(doc.id, 'title', e.target.value)}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item 
                    name={`${doc.id}_file`} 
                    label="Document File"
                    rules={[{ required: true, message: 'Document file is required' }]}
                  >
                    <Upload 
                      {...uploadProps} 
                      listType="picture-card"
                      onChange={(info) => updateDocument(doc.id, 'file', info)}
                    >
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload File</div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderFees = () => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <Title level={5}>💰 Fee Structure</Title>
      <Tag color="blue" style={{ fontSize: '14px', padding: '4px 8px' }}>
        Total: ₹{totalFee}
      </Tag>
    </div>

    <Collapse
      className="mb-4"
      items={feeStructures.map(fee => ({
        key: fee.group_id,
        label: (
          <div className="flex items-center justify-between w-full">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Checkbox
                checked={selectedFees.includes(fee.group_id)}
                onChange={(e) => handleFeeSelection(fee.group_id, e.target.checked)}
                onClick={(e) => e.stopPropagation()}
              />
              <span className="ml-2 font-medium">{fee.group_name}</span>
              <Tag color="green" className="ml-2">₹{fee?.amount?.toLocaleString() || 0}</Tag>
            </div>
          </div>
        ),
        children: (
          <div>
            {fee.fees_types && fee.fees_types.length > 0 && (
              <div>
                <div className="mt-2" >
                  {fee.fees_types.map(subFee => (
                    <div
                      key={subFee.fees_type_id}
                      style={{ display: 'flex', justifyContent: 'space-between', padding: '5px', border: '2px solid #f0f0f0' }}
                    >
                      <span>{subFee.fees_type_name}</span>
                      <Tag>₹{subFee?.amount?.toLocaleString()}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ),
      }))}
    />
  </div>
  );


  return (
    <Modal
      title={
        <Space>
          {isEdit ? '✏️ Edit Student' : '➕ Add New Student'}
          <Progress percent={formProgress} size="small" status="active" />
        </Space>
      }
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={isEdit ? 'Update' : 'Submit'}
      confirmLoading={loading}
      width={1300}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit} loading={loading}>
          {isEdit ? 'Update Student' : 'Create Student'}
        </Button>,
      ]}
    > 
      <div>
        <Spin spinning={loading}>
          <Form
            layout="vertical"
            form={form}
            onValuesChange={calculateProgress}
          >
            <Tabs
              activeKey={activeTab}
              onChange={handleTabChange}
              type="card"
              items={tabs.map(tab => ({
                key: tab.key,
                label: (
                  <span>
                    <span className={tabErrors[tab.key] ? 'text-red-500 font-semibold' : ''}>
                      {tab.label}
                    </span>
                  </span>
                ),
                children: (
                  tab.key === 'basic' ? renderBasicInfo() :
                  tab.key === 'personal' ? renderPersonalInfo() :
                  tab.key === 'other' ? renderOtherInfo() :
                  tab.key === 'documents' ? renderDocuments() :
                  tab.key === 'fees' ? renderFees() :
                  null
                )
              }))}
            />
          </Form>
        </Spin>
      </div>
    </Modal>
  );
};

export default StudentForm;
