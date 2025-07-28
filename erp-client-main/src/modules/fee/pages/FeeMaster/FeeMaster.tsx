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

const FeeMaster: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({});
  const [formField, setFormField] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [enableAdd, setEnableAdd] = useState(true);
  const [pagination, setPagination] = useState({ 
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const fetchFeeMaster = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post('/master/fees/master/', params);
        setData(res.data.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.count,
          showTotal: (total: number) => `Total ${total} Records`,
        }));
      } catch (error) {
        console.error('Error fetching fees master', error);
        toast.error('Failed to fetch fees master.');
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
      // Re-fetch fees master after adding a new one
      fetchFeeMaster({
        ...filters,
        search_text: search,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  }

  useEffect(() => {
    fetchFeeMaster({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  }, [pagination.current, pagination.pageSize, fetchFeeMaster]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosInstance.get('/master/fees/type/all/');
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
        const feeTypeOptions = response?.data?.data.map(option => ({
          label: option.name,
          value: option.id,
        }));
        const feeGroupResponse = await axiosInstance.get('/master/fees/group/all/');
        if (!feeGroupResponse || feeGroupResponse?.data?.status !== 200) {
          toast.error('Failed to fetch fee groups.');
          return;
        }
        const feeGroupOptions = feeGroupResponse?.data?.data.map(option => ({
          label: option.name,
          value: option.id,
        })); 
        setFormField(formFields({feeTypeOptions, feeGroupOptions}));
      } catch (error) {
        toast.error('Failed to fetch master settings! Please contact admin.');
        setEnableAdd(false);
      }
    };
    fetchClasses();
  }, []);

  const handleTableChange = (pagination: any, filtersArg: any) => {
    setPagination({ ...pagination });
    setFilters(filtersArg);

    fetchFeeMaster({ ...filtersArg, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  };

  const handleSearch = () => {
    fetchFeeMaster({ ...filters, search_text: search, page: 1, pageSize: pagination.pageSize });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDownload = async () => {
    alert('Download triggered (dummy)');
  };

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      const updateStatusData = { is_active: isActive };
      const response = await axiosInstance.patch(`/master/fees/master/${id}/`, updateStatusData);
      if (response?.data?.status === 200) {
        toast.success(`Fees master ${isActive ? 'activated' : 'deactivated'} successfully!`);
        // Re-fetch fees master after updating status
        fetchFeeMaster({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
      } else {
        toast.error('Failed to update fees master status.');
      }
    } catch (error) {
      console.error('Error updating fees master status', error);
      toast.error('Failed to update fees master status.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditFeeMaster = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/master/fees/master/${id}/`);
      if (response?.data?.status === 200) {
        const feeMasterData = response?.data?.data;
        setFormData(feeMasterData);
        setShowAddForm(true);
        setIsEditing(true);
      } else {
        toast.error('Failed to fetch fees master details.');
        setFormData({});
        setShowAddForm(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error fetching fees master details', error);
      toast.error('Failed to fetch fees master details.');
      setFormData({});
      setShowAddForm(false);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const columns = getColumns(handleUpdateStatus, handleEditFeeMaster);

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
        heading="Fees Master"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        // handleDownload={handleDownload}
        setShowAddForm={setShowAddForm}
        searchPlaceholder="Search fees master..."
        showAdd={enableAdd}
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
          label="Fees master"
          onClose={() => {
            setShowAddForm(false)
            setFormData({});
            setIsEditing(false);
          }}
          logoUrl={logo}
          heading="Add New Fees master"
          formFields={formField}
          formData={formData}
          setFormData={setFormData}
          postUrl="/master/fees/master/create/"
          patchUrl="/master/fees/master"
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default FeeMaster;
