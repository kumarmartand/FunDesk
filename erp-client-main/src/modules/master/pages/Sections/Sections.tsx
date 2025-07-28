import React, { useState, useEffect, useCallback } from 'react';
import { Spin } from 'antd';
import ErpTable from '../../../../Components/ErpTable/ErpTable';
import axiosInstance from '../../../../shared/api/axiosInstance';
import TableTopRow from '../../../../Components/TableTopRow/TableTopRow';
import { formFields, getColumns } from './const.tsx';
import ErpAddForm from '../../../../Components/ErpAddForm/ErpAddForm.tsx';
import { toast } from 'react-toastify';
import logo from '../../../../assets/erp_logo.jpg';
import type { AxiosResponse } from 'axios';

const SectionMaster: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({});
  const [formField, setFormField] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState({ 
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const fetchSections = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post('/master/sections/', params);
        setData(res.data.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.count,
          showTotal: (total: number) => `Total ${total} Records`,
        }));
      } catch (error) {
        console.error('Error fetching sections', error);
        toast.error('Failed to fetch sections.');
      } finally {
        setLoading(false);
      }
    },
    []
  );
  const handleSuccess = (response: AxiosResponse) => {
    if (response.data.status === 201 || response.data.status === 200) {
      setShowAddForm(false);
      setFormData({});
      setIsEditing(false);
      // Re-fetch sections after adding a new one
      fetchSections({
        ...filters,
        search_text: search,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  }

  useEffect(() => {
    fetchSections({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  }, [pagination.current, pagination.pageSize, fetchSections]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get('/master/classes/all/');
        if (!response) {
          toast.error('Failed to fetch classes.');
          return;
        }
        if (response?.data?.status !== 200) {
          toast.error('Failed to fetch classes.');
          return;
        }
        // Assuming response.data is an array of class objects with id and name properties
        
        if (!Array.isArray(response?.data?.data)) {
          toast.error('Invalid data format for classes.');
          return;
        }
        const classOptions = response?.data?.data.map(option => ({
          label: option.name,
          value: option.id,
        }));
        setFormField(formFields(classOptions));
      } catch (error) {
        toast.error('Failed to fetch classes.');
      }
    };
    fetchClasses();
  }, []);

  const handleTableChange = (pagination: any, filtersArg: any) => {
    setPagination({ ...pagination });
    setFilters(filtersArg);

    fetchSections({ ...filtersArg, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  };

  const handleSearch = () => {
    fetchSections({ ...filters, search_text: search, page: 1, pageSize: pagination.pageSize });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDownload = async () => {
    alert('Download triggered (dummy)');
  };

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      const updateStatusData = { is_active: isActive };
      const response = await axiosInstance.patch(`/master/sections/${id}/`, updateStatusData);
      if (response?.data?.status === 200) {
        toast.success(`Section ${isActive ? 'activated' : 'deactivated'} successfully!`);
        // Re-fetch sections after updating status
        fetchSections({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
      } else {
        toast.error('Failed to update section status.');
      }
    } catch (error) {
      console.error('Error updating section status', error);
      toast.error('Failed to update section status.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/master/sections/${id}/`);
      if (response?.data?.status === 200) {
        const sectionData = response?.data?.data;
        setFormData(sectionData);
        setShowAddForm(true);
        setIsEditing(true);
      } else {
        toast.error('Failed to fetch section details.');
        setFormData({});
        setShowAddForm(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error fetching section details', error);
      toast.error('Failed to fetch section details.');
      setFormData({});
      setShowAddForm(false);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const columns = getColumns(handleUpdateStatus, handleEditSection);

  return (
    <div
      style={{
        padding: '10px',
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TableTopRow
        heading="Section Master"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        // handleDownload={handleDownload}
        setShowAddForm={setShowAddForm}
        searchPlaceholder="Search sections..."
      />
      <div style={{ flex: 1, minHeight: 0 }}>
        <Spin spinning={loading}>
          <ErpTable
            columns={columns}
            data={data}
            pagination={pagination}
            onTableChange={handleTableChange}
            rowKey="key"
            loading={loading}
            style={{ height: '100%' }}
          />
        </Spin>
      </div>
      {showAddForm && (
        <ErpAddForm
          visible={showAddForm}
          isEditing={isEditing}
          label="Section"
          onClose={() => {
            setShowAddForm(false)
            setFormData({});
            setIsEditing(false);
          }}
          logoUrl={logo}
          heading="Add New Section"
          formFields={formField}
          formData={formData}
          setFormData={setFormData}
          postUrl="/master/sections/create/"
          patchUrl="/master/sections"
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default SectionMaster;
