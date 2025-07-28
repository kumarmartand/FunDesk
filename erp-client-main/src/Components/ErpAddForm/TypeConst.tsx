import type { AxiosResponse } from "axios";

export type FieldType = {
    name: string;
    label: string;
    type:
        | "text"
        | "password"
        | "email"
        | "number"
        | "textarea"
        | "select"
        | "multiselect"
        | "radio"
        | "switch"
        | "date"
        | "time"
        | "datetime"
        | "daterange"
        | "file";
    rules?: any[];
    placeholder?: string;
    options?: { label: string; value: any }[];
    [key: string]: any;
};

export type ErpAddFormProps = {
    visible: boolean;
    isEditing: boolean;
    label: string;
    onClose: () => void;
    logoUrl: string;
    heading: string;
    formFields: FieldType[];
    postUrl: string;
    patchUrl: string;
    formData: object;
    setFormData: (data: object) => void;
    onSuccess: (response: AxiosResponse) => void;
    onError?: (error: any) => void;  // Optional error callback
};

