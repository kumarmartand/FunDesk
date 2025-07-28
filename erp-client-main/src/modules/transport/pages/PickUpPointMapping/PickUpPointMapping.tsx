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

const PickUpPointMapping: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [formField, setFormField] = useState({});
  const [enableAdd, setEnableAdd] = useState(true);
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
        const res = await axiosInstance.post('/master/transport/route-pickup-points/', params);
        setData(res.data.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.count,
          showTotal: (total: number) => `Total ${total} Records`,
        }));
      } catch (error) {
        console.error('Error fetching pickup point mapping', error);
        toast.error('Failed to fetch pickup point mapping.');
      } finally {
        setLoading(false);
      }
    },
    []
  );
  useEffect(() => {
      const fetchDependentOptions = async () => {
        try {
          const response = await axiosInstance.get('/master/transport/routes/all/');
          if (!response) {
            toast.error('Failed to fetch routes.');
            return;
          }
          if (response?.data?.status !== 200) {
            toast.error('Failed to fetch routes.');
            return;
          }
          // Assuming response.data is an array of class objects with id and name properties
          
          if (!Array.isArray(response?.data?.data)) {
            toast.error('Invalid data format for routes.');
            return;
          }
          const routeOptions = response?.data?.data.map(option => ({
            label: option.title,
            value: option.id,
          }));
          const pickupPointResponse = await axiosInstance.get('/master/transport/pickup-points/all/');
          if (!pickupPointResponse || pickupPointResponse?.data?.status !== 200) {
            toast.error('Failed to fetch pickup point.');
            return;
          }
          const pickupPointOptions = pickupPointResponse?.data?.data.map(option => ({
            label: option.pickup_point,
            value: option.id,
          })); 
          setFormField(formFields({routeOptions, pickupPointOptions}));
        } catch (error) {
          toast.error('Failed to fetch master settings! Please contact admin.');
          setEnableAdd(false);
        }
      };
      fetchDependentOptions();
    }, []);
  
  const handleSuccess = (response: AxiosResponse) => {
    if (response.data.status === 201 || response.data.status === 200) {
      setShowAddForm(false);
      setFormData({});
      setIsEditing(false);
      // Re-fetch pickup point mapping after adding a new one
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
      const response = await axiosInstance.patch(`/master/transport/route-pickup-points/${id}/`, updateStatusData);
      if (response?.data?.status === 200) {
        toast.success(`pickup point mapping ${isActive ? 'activated' : 'deactivated'} successfully!`);
        // Re-fetch PickUpPoint after updating status
        fetchPickUpPoint({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
      } else {
        toast.error('Failed to update pickup point mapping status.');
      }
    } catch (error) {
      console.error('Error updating pickup point mapping status', error);
      toast.error('Failed to update pickup point mapping status.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPickUpPoint = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/master/transport/route-pickup-points/${id}/`);
      if (response?.data?.status === 200) {
        const PickUpPointData = response.data.data;
        setFormData(PickUpPointData);
        setShowAddForm(true);
        setIsEditing(true);
      } else {
        toast.error('Failed to fetch pickup point mapping details.');
        setFormData({});
        setShowAddForm(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error fetching pickup point mapping details', error);
      toast.error('Failed to fetch pickup point mapping details.');
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
        heading="Pickup point mapping Master"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        // handleDownload={handleDownload}
        setShowAddForm={setShowAddForm}
        searchPlaceholder="Search pickup point mapping..."
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
          label="Pickup point mapping"
          onClose={() => {
            setShowAddForm(false)
            setFormData({});
            setIsEditing(false);
          }}
          logoUrl={logo}
          heading="Add New Pickup point mapping"
          formFields={formField}
          formData={formData}
          setFormData={setFormData}
          postUrl="/master/transport/route-pickup-points/create/"
          patchUrl="/master/transport/route-pickup-points"
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default PickUpPointMapping;
