import React, { useState, useEffect, useCallback } from 'react';
import { Spin } from 'antd';
import ErpTable from '../../../../Components/ErpTable/ErpTable.tsx';
import axiosInstance from '../../../../shared/api/axiosInstance.ts';
import TableTopRow from '../../../../Components/TableTopRow/TableTopRow.tsx';
import { formFields, getColumns } from './const.tsx';
import ErpAddForm from '../../../../Components/ErpAddForm/ErpAddForm.tsx';
import { toast } from 'react-toastify';
import logo from '../../../../assets/erp_logo.jpg';
import type { AxiosResponse } from 'axios';

const PickUpPointMaster: React.FC = () => {
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

  const fetchPickUpPoint = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post('/master/transport/pickup-points/', params);
        setData(res.data.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.count,
          showTotal: (total: number) => `Total ${total} Records`,
        }));
      } catch (error) {
        console.error('Error fetching Pickup point', error);
        toast.error('Failed to fetch Pickup point.');
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
      // Re-fetch Pickup point after adding a new one
      fetchPickUpPoint({
        ...filters,
        search_text: search,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  }

  useEffect(() => {
    fetchPickUpPoint({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  }, [pagination.current, pagination.pageSize, fetchPickUpPoint]);

  const handleTableChange = (pagination: any, filtersArg: any) => {
    setPagination({ ...pagination });
    setFilters(filtersArg);

    fetchPickUpPoint({ ...filtersArg, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  };

  const handleSearch = () => {
    fetchPickUpPoint({ ...filters, search_text: search, page: 1, pageSize: pagination.pageSize });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDownload = async () => {
    alert('Download triggered (dummy)');
  };

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      const updateStatusData = { is_active: isActive };
      const response = await axiosInstance.patch(`/master/transport/pickup-points/${id}/`, updateStatusData);
      if (response?.data?.status === 200) {
        toast.success(`Pickup point ${isActive ? 'activated' : 'deactivated'} successfully!`);
        // Re-fetch PickUpPoint after updating status
        fetchPickUpPoint({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
      } else {
        toast.error('Failed to update Pickup point status.');
      }
    } catch (error) {
      console.error('Error updating Pickup point status', error);
      toast.error('Failed to update Pickup point status.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPickUpPoint = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/master/transport/pickup-points/${id}/`);
      if (response?.data?.status === 200) {
        const PickUpPointData = response.data.data;
        setFormData(PickUpPointData);
        setShowAddForm(true);
        setIsEditing(true);
      } else {
        toast.error('Failed to fetch Pickup point details.');
        setFormData({});
        setShowAddForm(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error fetching Pickup point details', error);
      toast.error('Failed to fetch Pickup point details.');
      setFormData({});
      setShowAddForm(false);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const columns = getColumns(handleEditPickUpPoint);

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
        heading="Pickup point Master"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        // handleDownload={handleDownload}
        setShowAddForm={setShowAddForm}
        searchPlaceholder="Search Pickup point..."
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
          label="Pickup point"
          onClose={() => {
            setShowAddForm(false)
            setFormData({});
            setIsEditing(false);
          }}
          logoUrl={logo}
          heading="Add New Pickup point"
          formFields={formFields}
          formData={formData}
          setFormData={setFormData}
          postUrl="/master/transport/pickup-points/create/"
          patchUrl="/master/transport/pickup-points"
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default PickUpPointMaster;
