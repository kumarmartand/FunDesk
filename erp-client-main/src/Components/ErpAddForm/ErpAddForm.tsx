import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
    Form,
    Input,
    Button,
    message,
    Select,
    Radio,
    Switch,
    Modal,
    DatePicker,
    TimePicker,
    Upload,
    Progress,
    Tooltip,
    Spin,
    Alert,
    Space,
    Typography,
} from "antd";
import axiosInstance from "../../shared/api/axiosInstance";
import dayjs from "dayjs";
import type { FieldType, ErpAddFormProps } from "./TypeConst";
import { toast } from "react-toastify";
import { 
    InboxOutlined, 
    EyeOutlined, 
    DeleteOutlined, 
    InfoCircleOutlined,
    SaveOutlined,
    CloseOutlined 
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const ErpAddForm: React.FC<ErpAddFormProps> = ({
    visible,
    isEditing,
    label,
    onClose,
    logoUrl,
    heading,
    formFields,
    formData = {},
    setFormData,
    postUrl,
    patchUrl,
    onSuccess,
    onError,
}) => {
    const [filePreview, setFilePreview] = useState<Record<string, string | null>>({});
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

    // Memoize form fields to prevent unnecessary re-renders
    const memoizedFormFields = useMemo(() => formFields, [formFields]);

    // Enhanced date formatting with better error handling
    const formatDateFields = useCallback((values: any) => {
        const formatted = { ...values };
        
        memoizedFormFields.forEach((field) => {
            const value = values[field.name];
            if (!value) return;
            
            // **CRITICAL FIX**: Don't process File objects as dates
            if (field.type === "file" && value instanceof File) {
                // Keep File objects as-is
                formatted[field.name] = value;
                return;
            }
            try {
                switch (field.type) {
                    case "date":
                        formatted[field.name] = dayjs(value).isValid() 
                            ? dayjs(value).format("YYYY-MM-DD") 
                            : null;
                        break;
                    case "time":
                        formatted[field.name] = dayjs(value).isValid() 
                            ? dayjs(value).format("HH:mm:ss") 
                            : null;
                        break;
                    case "datetime":
                        formatted[field.name] = dayjs(value).isValid() 
                            ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") 
                            : null;
                        break;
                    case "daterange":
                        if (Array.isArray(value) && value.length === 2) {
                            const startDate = dayjs(value[0]);
                            const endDate = dayjs(value[1]);
                            if (startDate.isValid() && endDate.isValid()) {
                                formatted[`${field.name}Start`] = startDate.format("YYYY-MM-DD");
                                formatted[`${field.name}End`] = endDate.format("YYYY-MM-DD");
                                delete formatted[field.name];
                            }
                        }
                        break;
                }
            } catch (error) {
                console.warn(`Error formatting date field ${field.name}:`, error);
            }
        });

        return formatted;
    }, [memoizedFormFields]);
    // FIX 3: Add useEffect to initialize form data properly when editing
    useEffect(() => {
        if (isEditing && formData && Object.keys(formData).length > 0) {
                form.setFieldsValue(formData);
                
                // **CRITICAL FIX**: Don't lose existing file references when editing
                Object.keys(formData).forEach(key => {
                    if (formData[key] instanceof File) {
                        // File object already exists, keep it in formData state
                        setFormData(prev => ({
                            ...prev,
                            [key]: formData[key]
                        }));
                    }
                });
            }
        }, []);
    const handleFinish = async (values: any) => {
        setLoading(true);
        setValidationErrors({});
        
        try {
            let finalValues = { ...values };
            
            // Replace any file fields with actual File objects from formData
            Object.keys(formData).forEach(key => {
                if (formData[key] instanceof File) {
                    finalValues[key] = formData[key];  // Use the preserved File object
                }
            });
            
            // Also check form values for File objects
            const formValues = form.getFieldsValue();
            Object.keys(formValues).forEach(key => {
                if (formValues[key] instanceof File) {
                    finalValues[key] = formValues[key];
                }
            });
            
            const formattedValues = formatDateFields(finalValues);
            console.log("Formatted Values:", formattedValues);
            
            // **NEW**: For editing mode, only send changed fields
            if (isEditing) {
                const changedFields = {};
                
                Object.keys(formattedValues).forEach(key => {
                    const currentValue = formattedValues[key];
                    const originalValue = formData[key];
                    
                    // Include field if:
                    // 1. It's a new file (File object)
                    // 2. Value has changed from original
                    // 3. Original value was null/undefined and current has value
                    // 4. It's the ID field (always needed for editing)
                    if (
                        currentValue instanceof File ||
                        currentValue !== originalValue ||
                        ((!originalValue || originalValue === '') && currentValue) ||
                        key === 'id'
                    ) {
                        changedFields[key] = currentValue;
                    }
                });
                
                // Only proceed if there are actual changes
                if (Object.keys(changedFields).length < 1) { // <= 1 because ID is always included
                    toast.info("No changes detected to update.");
                    setLoading(false);
                    return;
                }
                
                finalValues = changedFields;
            }
            

            // Detect file presence
            const hasFile = Object.values(finalValues).some(val => val instanceof File);

            let dataToSend: any = formattedValues;
            let config: any = { timeout: 30000 };

            if (hasFile) {
                const formDataToSend = new FormData();
                Object.entries(finalValues).forEach(([key, val]) => {
                    if (val !== null && val !== undefined) {
                        if (val instanceof File) {
                            formDataToSend.append(key, val, val.name);
                        } else {
                            formDataToSend.append(key, String(val));
                        }
                    }
                });
                dataToSend = formDataToSend;
                
                config.headers = {
                    ...config.headers,
                    "Content-Type": "multipart/form-data",
                }
            }

            const id = formData?.id;
            const url = isEditing && id ? `${patchUrl}/${id}/` : postUrl;
            const method = isEditing && id ? "patch" : "post";
            console.log("dataToSend:", dataToSend);
            
            const response = await axiosInstance[method](url, dataToSend, config);

            const isSuccess = (response?.status === 200 || response?.status === 201) &&
                            (!response.data.status || response.data.status === 200 || response.data.status === 201);

            if (isSuccess) {
                form.resetFields();
                setFormData({});
                setHasUnsavedChanges(false);
                setFilePreview({});
                toast.success(`${label} ${isEditing ? "updated" : "added"} successfully!`);

                onSuccess?.(response);
            } else {
                handleFormErrors(response?.data?.errors || response?.data?.message);
            }
        } catch (error: any) {
            console.error("Form submission error:", error);

            if (error.response?.status === 422 || error.response?.status === 400) {
                handleFormErrors(error.response.data?.errors || error.response.data?.message);
            } else {
                const errorMessage = error?.response?.data?.message || error?.message || "Submission failed!";
                toast.error(errorMessage);
            }

            onError?.(error);
        } finally {
            setLoading(false);
        }
    };

    // Enhanced error handling
    const handleFormErrors = (errors: any) => {
        if (typeof errors === "object" && errors !== null) {
            const fieldErrors: Record<string, string[]> = {};
            
            Object.entries(errors).forEach(([key, value]: [string, any]) => {
                const errorMessages = Array.isArray(value) ? value : [value];
                fieldErrors[key] = errorMessages;
                
                form.setFields([{
                    name: key,
                    errors: errorMessages,
                }]);
            });
            
            setValidationErrors(fieldErrors);
        } else if (typeof errors === "string") {
            toast.error(errors);
        } else {
            toast.error("Please check the form for errors and try again.");
        }
    };

    // Enhanced cancel handler with unsaved changes warning
    const handleCancel = () => {
        form.resetFields();
        setHasUnsavedChanges(false);
        setFilePreview({});
        setValidationErrors({});
        onClose();
    };

    // Track form changes
    const handleFormChange = useCallback(() => {
        setHasUnsavedChanges(true);
    }, []);

    // Enhanced file validation
    const validateFile = useCallback((file: File, field: FieldType): boolean => {
        const allowedTypes = (field.accept || "*").split(",").map((type) => type.trim());
        const maxSize = (field.maxSizeMB || 10) * 1024 * 1024; // Default 10MB

        const isAllowed = allowedTypes.some((type) => {
            if (type === "*") return true;
            if (type.endsWith("/*")) {
                const baseType = type.split("/")[0];
                return file.type.startsWith(baseType + "/");
            }
            return file.type === type || file.name.toLowerCase().endsWith(type.replace(".", ""));
        });

        if (!isAllowed) {
            toast.error(`Invalid file type. Allowed: ${field.accept}`);
            return false;
        }

        if (file.size > maxSize) {
            toast.error(`File size must be less than ${field.maxSizeMB || 10}MB`);
            return false;
        }

        return true;
    }, []);

    // Enhanced file preview generation
    const generateFilePreview = useCallback((file: File, fieldName: string) => {
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFilePreview((prev) => ({
                    ...prev,
                    [fieldName]: e.target?.result as string,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFilePreview((prev) => ({
                ...prev,
                [fieldName]: null,
            }));
        }
    }, []);

    // Initialize form data with better error handling
    useEffect(() => {
        if (visible) {
            form.resetFields();
            setHasUnsavedChanges(false);
            setValidationErrors({});
            
            const convertedData = { ...formData };
            const initialPreviews: Record<string, string | null> = {};

            memoizedFormFields.forEach((field) => {
                const value = formData[field.name];
                if (!value) return;

                try {
                    switch (field.type) {
                        case "date":
                        case "datetime":
                            const dateValue = dayjs(value);
                            if (dateValue.isValid()) {
                                convertedData[field.name] = dateValue;
                            }
                            break;
                        case "time":
                            const timeValue = dayjs(value, "HH:mm:ss");
                            if (timeValue.isValid()) {
                                convertedData[field.name] = timeValue;
                            }
                            break;
                        case "daterange":
                            const startKey = `${field.name}Start`;
                            const endKey = `${field.name}End`;
                            if (formData[startKey] && formData[endKey]) {
                                const startDate = dayjs(formData[startKey]);
                                const endDate = dayjs(formData[endKey]);
                                if (startDate.isValid() && endDate.isValid()) {
                                    convertedData[field.name] = [startDate, endDate];
                                }
                            }
                            break;
                        case "file":
                            if (typeof value === "string" && (value.startsWith("http") || value.startsWith("/"))) {
                                initialPreviews[field.name] = value;
                            }
                            break;
                        default:
                            break;
                    }
                } catch (error) {
                    console.warn(`Error processing field ${field.name}:`, error);
                }
            });

            setFilePreview(initialPreviews);
            form.setFieldsValue(convertedData);
        }
    }, []);

    // Enhanced field rendering with better UI
    const renderField = useCallback((field: FieldType) => {
        const commonProps = {
            placeholder: field.placeholder,
            disabled: field.disabled || loading,
            ...field
        };

        switch (field.type) {
            case "password":
                return (
                    <Input.Password 
                        {...commonProps}
                        autoComplete="new-password"
                        visibilityToggle
                    />
                );
            
            case "textarea":
                return (
                    <Input.TextArea 
                        {...commonProps}
                        autoSize={{ minRows: 3, maxRows: 6 }}
                        showCount
                        maxLength={field.maxLength}
                    />
                );
            
            case "select":
                return (
                    <Select 
                        {...commonProps}
                        showSearch
                        allowClear
                        optionFilterProp="label"
                        filterOption={(input, option) => {
                            if (!option) return false;
                            // Use the label prop for filtering
                            const label = option.label || option.children;
                            return String(label)
                                .toLowerCase()
                                .includes(input.toLowerCase());
                        }}
                    >
                        {field.options?.map((opt) => (
                            <Select.Option 
                                key={opt.value} 
                                value={opt.value}
                                label={opt.label}
                            >
                                {opt.label}
                            </Select.Option>
                        ))}
                    </Select>
                );

            case "multiselect":
                return (
                    <Select 
                        mode="multiple" 
                        {...commonProps}
                        showSearch
                        allowClear
                        optionFilterProp="label"
                        filterOption={(input, option) => {
                            if (!option) return false;
                            // Use the label prop for filtering
                            const label = option.label || option.children;
                            return String(label)
                                .toLowerCase()
                                .includes(input.toLowerCase());
                        }}
                        maxTagCount="responsive"
                        maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} more`}
                    >
                        {field.options?.map((opt) => (
                            <Select.Option 
                                key={opt.value} 
                                value={opt.value}
                                label={opt.label}
                            >
                                {opt.label}
                            </Select.Option>
                        ))}
                    </Select>
                );
            case "radio":
                return (
                    <Radio.Group {...commonProps}>
                        <Space direction={field.direction || "horizontal"}>
                            {field.options?.map((opt) => (
                                <Radio key={opt.value} value={opt.value}>
                                    {opt.label}
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                );
            
            case "switch":
                return (
                    <Switch 
                        {...commonProps}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                    />
                );
            
            case "date":
                return (
                    <DatePicker 
                        style={{ width: "100%" }} 
                        {...commonProps}
                        format="YYYY-MM-DD"
                        disabledDate={field.disabledDate}
                    />
                );
            
            case "time":
                return (
                    <TimePicker 
                        style={{ width: "100%" }} 
                        {...commonProps}
                        format="HH:mm:ss"
                    />
                );
            
            case "datetime":
                return (
                    <DatePicker 
                        showTime 
                        style={{ width: "100%" }} 
                        {...commonProps}
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={field.disabledDate}
                    />
                );
            
            case "daterange":
                return (
                    <RangePicker 
                        style={{ width: "100%" }} 
                        {...commonProps}
                        format="YYYY-MM-DD"
                        disabledDate={field.disabledDate}
                    />
                );
            
            case "file":
                
                return (
                    <div>
                        <Upload.Dragger
                            name={field.name}
                            multiple={false}
                            accept={field.accept || "*"}
                            showUploadList={false}
                            disabled={loading}
                            style={{ width: "100%" }}
                            beforeUpload={(file) => {
                                if (!validateFile(file, field)) {
                                    return Upload.LIST_IGNORE;
                                }

                                // **CRITICAL FIX**: Store the actual File object immediately
                                form.setFieldsValue({ [field.name]: file });
                                
                                // **CRITICAL FIX**: Also store in formData state
                                setFormData(prev => ({
                                    ...prev,
                                    [field.name]: file  // This ensures the File object is preserved
                                }));
                                
                                generateFilePreview(file, field.name);
                                setHasUnsavedChanges(true);

                                return false;
                            }}
                        >
                            {filePreview?.[field.name] ? (
                                <div style={{ textAlign: "center" }}>
                                    {filePreview[field.name]?.startsWith("http") ||
                                    filePreview[field.name]?.startsWith("data:") ? (
                                        <div>
                                            <img
                                                src={filePreview[field.name]!}
                                                alt="preview"
                                                style={{ 
                                                    maxWidth: "100%", 
                                                    maxHeight: 200, 
                                                    marginBottom: 8,
                                                    borderRadius: 8,
                                                    objectFit: "cover"
                                                }}
                                            />
                                            <div style={{ marginTop: 8 }}>
                                                <Space>
                                                    <Button 
                                                        size="small" 
                                                        danger
                                                        icon={<DeleteOutlined />}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            form.setFieldsValue({ [field.name]: null });
                                                            
                                                            // **ADD THIS BLOCK**
                                                            setFormData(prev => {
                                                                const updated = { ...prev };
                                                                delete updated[field.name];
                                                                return updated;
                                                            });
                                                            
                                                            setFilePreview(prev => ({
                                                                ...prev,
                                                                [field.name]: null,
                                                            }));
                                                            setHasUnsavedChanges(true);
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Space>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <Text strong>
                                                {form.getFieldValue(field.name)?.name || "Uploaded File"}
                                            </Text>
                                            <div style={{ marginTop: 8 }}>
                                                {/* 🔥 REPLACE THIS REMOVE BUTTON - LOCATION 2 */}
                                                <Button 
                                                    size="small" 
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        form.setFieldsValue({ [field.name]: null });
                                                        
                                                        // **ADD THIS BLOCK**
                                                        setFormData(prev => {
                                                            const updated = { ...prev };
                                                            delete updated[field.name];
                                                            return updated;
                                                        });
                                                        
                                                        setFilePreview(prev => ({
                                                            ...prev,
                                                            [field.name]: null,
                                                        }));
                                                        setHasUnsavedChanges(true);
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    <Text type="secondary" style={{ fontSize: '12px' }}>
                                        Click or drag to replace
                                    </Text>
                                </div>
                            ) : (
                                // Empty state - no changes needed here
                                <div>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to upload
                                    </p>
                                    <p className="ant-upload-hint">
                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                            Formats: {field.accept || "All files"} • 
                                            Max size: {field.maxSizeMB || 10}MB
                                        </Text>
                                    </p>
                                </div>
                            )}
                        </Upload.Dragger>
                    </div>
                );

            case "number":
                return (
                    <Input 
                        type="number"
                        {...commonProps}
                        min={field.min}
                        max={field.max}
                        step={field.step || 1}
                    />
                );

            case "email":
                return (
                    <Input 
                        type="email"
                        autoComplete="email"
                        {...commonProps}
                    />
                );

            case "url":
                return (
                    <Input 
                        type="url"
                        {...commonProps}
                    />
                );

            default:
                return (
                    <Input 
                        {...commonProps}
                        maxLength={field.maxLength}
                        showCount={!!field.maxLength}
                    />
                );
        }
    }, [filePreview, loading, form, validateFile, generateFilePreview]);

    // Show validation errors summary
    const hasValidationErrors = Object.keys(validationErrors).length > 0;

    return (
        <Modal
            title={null}
            open={visible}
            closable={false}
            keyboard={!hasUnsavedChanges}
            maskClosable={!hasUnsavedChanges}
            centered
            onCancel={handleCancel}
            width="80%"
            style={{ maxWidth: 1000 }}
            footer={null}
        >
            <Spin spinning={loading} tip="Processing...">
                <div style={{ 
                    background: "#fff", 
                    display: "flex", 
                    flexDirection: "row", 
                    width: "100%",
                    minHeight: "60vh"
                }}>
                    {/* Left Image Section */}
                    <div
                        style={{
                            width: "33%",
                            minWidth: 220,
                            background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "2rem 1rem",
                            borderRadius: "8px 0 0 8px",
                            position: "relative",
                            boxShadow: "inset -2px 0 8px rgba(0,0,0,0.1)"
                        }}
                    >
                        <div style={{
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.2)"
                        }}>
                            <img
                                src={logoUrl || "https://dummyimage.com/200x80/1890ff/fff&text=ERP"}
                                alt="Logo"
                                style={{
                                    width: "100%",
                                    maxWidth: 160,
                                    marginBottom: "1rem",
                                    objectFit: "contain",
                                    filter: "brightness(1.1)"
                                }}
                                onError={(e) => {
                                    (e.currentTarget as HTMLImageElement).src = 
                                        "https://dummyimage.com/200x80/1890ff/fff&text=ERP";
                                }}
                            />
                        </div>
                        <h2 style={{ 
                            color: "#fff", 
                            textAlign: "center",
                            marginTop: "1rem",
                            fontSize: "1.4rem",
                            fontWeight: 600,
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                        }}>
                            {heading}
                        </h2>
                        {isEditing && (
                            <div style={{
                                position: "absolute",
                                top: "1rem",
                                right: "1rem",
                                background: "rgba(255,255,255,0.2)",
                                padding: "0.5rem 1rem",
                                borderRadius: "20px",
                                color: "#fff",
                                fontSize: "0.8rem",
                                fontWeight: 500
                            }}>
                                EDIT MODE
                            </div>
                        )}
                    </div>

                    {/* Right Form Section */}
                    <div style={{ 
                        width: "66%", 
                        padding: "2rem", 
                        paddingBottom: 0, 
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "82vh",
                        overflowY: "auto",
                        marginTop: 0,
                    }}>
                        {/* Header with close button */}
                        <div style={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center",
                            marginBottom: "1rem",
                            paddingBottom: "1rem",
                            borderBottom: "1px solid #f0f0f0",
                            top: '-5vh',
                            zIndex: 10,
                            maxHeight: "10%",
                            position: "sticky",
                            background: "#fff",
                        }}>
                            <div>
                                <h3 style={{ margin: 0, color: "#1890ff" }}>
                                    {isEditing ? `Edit ${label}` : `Add New ${label}`}
                                </h3>
                                {hasUnsavedChanges && (
                                    <Text type="warning" style={{ fontSize: "12px" }}>
                                        <InfoCircleOutlined /> Unsaved changes
                                    </Text>
                                )}
                            </div>
                            <Tooltip title="Close">
                                <Button 
                                    type="text" 
                                    icon={<CloseOutlined />} 
                                    onClick={handleCancel}
                                    style={{ color: "#666" }}
                                />
                            </Tooltip>
                        </div>

                        {/* Validation errors summary */}
                        <div style={{ maxHeight: "10%"}}>
                        {/* {hasValidationErrors && (
                            <Alert
                                message="Please fix the following errors:"
                                description={
                                    <ul style={{ margin: 0, paddingLeft: "1rem" }}>
                                        {Object.entries(validationErrors).map(([field, errors]) => (
                                            <li key={field}>
                                                <strong>{field}:</strong> {errors.join(", ")}
                                            </li>
                                        ))}
                                    </ul>
                                }
                                type="error"
                                style={{ marginBottom: "1rem" }}
                                closable
                                onClose={() => setValidationErrors({})}
                            />
                        )} */}

                        <Form 
                            form={form} 
                            layout="vertical" 
                            onFinish={handleFinish}
                            onValuesChange={handleFormChange}
                            style={{ flex: 1, display: "flex", flexDirection: "column" }}
                            scrollToFirstError
                        >
                            {/* Scrollable form fields */}
                            <div style={{ 
                                flex: 1,
                                maxHeight: "100%",
                                height: "100%",
                                overflowY: 'auto',
                                paddingRight: "8px",
                                marginRight: "-8px",
                            }}>
                                {memoizedFormFields.map((field) => (
                                    <Form.Item
                                        key={field.name}
                                        name={field.name}
                                        label={
                                            <span>
                                                {field.label}
                                                {field.required && <span style={{ color: 'red' }}> *</span>}
                                                {field.tooltip && (
                                                    <Tooltip title={field.tooltip}>
                                                        <InfoCircleOutlined style={{ marginLeft: 4, color: '#1890ff' }} />
                                                    </Tooltip>
                                                )}
                                            </span>
                                        }
                                        rules={field.rules}
                                        valuePropName={field.type === "switch" ? "checked" : "value"}
                                        help={field.help}
                                        extra={field.extra}
                                    >
                                        {renderField(field)}
                                    </Form.Item>
                                ))}
                            </div>

                            {/* Fixed footer with buttons */}
                            <div style={{ 
                                bottom: 0,
                                borderTop: "1px solid #f0f0f0",
                                zIndex: 10,
                                position: "sticky",
                                background: "#fff",
                                paddingTop: "1rem",
                                marginTop: "1rem"
                            }}>
                                <Form.Item style={{ margin: 0, textAlign: "right" }}>
                                    <Space>
                                        <Button 
                                            onClick={handleCancel} 
                                            disabled={loading}
                                            size="large"
                                        >
                                            Cancel
                                        </Button>
                                        <Button 
                                            type="primary" 
                                            htmlType="submit" 
                                            loading={loading}
                                            icon={<SaveOutlined />}
                                            size="large"
                                        >
                                            {loading ? "Saving..." : "Save"}
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </div>
                        </Form>
                        </div>
                    </div>
                </div>
            </Spin>
        </Modal>
    );
};

export default ErpAddForm;
