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

const FeeTypeMaster: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState({ 
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const fetchFeeType = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post('/master/fees/type/', params);
        setData(res.data.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.count,
          showTotal: (total: number) => `Total ${total} Records`,
        }));
      } catch (error) {
        console.error('Error fetching fees type', error);
        toast.error('Failed to fetch fees type.');
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
      // Re-fetch fees type after adding a new one
      fetchFeeType({
        ...filters,
        search_text: search,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  }

  useEffect(() => {
    fetchFeeType({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  }, [pagination.current, pagination.pageSize, fetchFeeType]);

  const handleTableChange = (pagination: any, filtersArg: any) => {
    setPagination({ ...pagination });
    setFilters(filtersArg);

    fetchFeeType({ ...filtersArg, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  };

  const handleSearch = () => {
    fetchFeeType({ ...filters, search_text: search, page: 1, pageSize: pagination.pageSize });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDownload = async () => {
    alert('Download triggered (dummy)');
  };

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      const updateStatusData = { is_active: isActive };
      const response = await axiosInstance.patch(`/master/fees/type/${id}/`, updateStatusData);
      if (response?.data?.status === 200) {
        toast.success(`Fee Type ${isActive ? 'activated' : 'deactivated'} successfully!`);
        // Re-fetch fees Type after updating status
        fetchFeeType({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
      } else {
        toast.error('Failed to update fees type status.');
      }
    } catch (error) {
      console.error('Error updating fees type status', error);
      toast.error('Failed to update fees type status.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditFeeType = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/master/fees/type/${id}/`);
      if (response?.data?.status === 200) {
        const feeTypeData = response.data.data;
        setFormData(feeTypeData);
        setShowAddForm(true);
        setIsEditing(true);
      } else {
        toast.error('Failed to fetch fees type details.');
        setFormData({});
        setShowAddForm(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error fetching fees type details', error);
      toast.error('Failed to fetch fees type details.');
      setFormData({});
      setShowAddForm(false);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const columns = getColumns(handleUpdateStatus, handleEditFeeType);

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
        heading="Fee Type Master"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        // handleDownload={handleDownload}
        setShowAddForm={setShowAddForm}
        searchPlaceholder="Search fees type..."
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
          label="Fee Type"
          onClose={() => {
            setShowAddForm(false)
            setFormData({});
            setIsEditing(false);
          }}
          logoUrl={logo}
          heading="Add New Fee Type"
          formFields={formFields}
          formData={formData}
          setFormData={setFormData}
          postUrl="/master/fees/type/create/"
          patchUrl="/master/fees/type"
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default FeeTypeMaster;
