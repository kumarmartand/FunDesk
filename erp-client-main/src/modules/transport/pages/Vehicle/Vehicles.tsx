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
import ImagePreview from '../../../../Components/ImagePreview/ImagePreview.tsx';

const VehiclesMaster: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);
  const [pagination, setPagination] = useState({ 
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const fetchVehicles = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post('/master/transport/vehicles/', params);
        setData(res.data.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.count,
          showTotal: (total: number) => `Total ${total} Records`,
        }));
      } catch (error) {
        console.error('Error fetching vehicles', error);
        toast.error('Failed to fetch vehicles.');
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
      // Re-fetch vehicles after adding a new one
      fetchVehicles({
        ...filters,
        search_text: search,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  }

  useEffect(() => {
    fetchVehicles({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  }, [pagination.current, pagination.pageSize, fetchVehicles]);

  const handleTableChange = (pagination: any, filtersArg: any) => {
    setPagination({ ...pagination });
    setFilters(filtersArg);

    fetchVehicles({ ...filtersArg, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  };

  const handleSearch = () => {
    fetchVehicles({ ...filters, search_text: search, page: 1, pageSize: pagination.pageSize });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDownload = async () => {
    alert('Download triggered (dummy)');
  };

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      const updateStatusData = { is_active: isActive };
      const response = await axiosInstance.patch(`/master/transport/vehicles/${id}/`, updateStatusData);
      if (response?.data?.status === 200) {
        toast.success(`Vehicle ${isActive ? 'activated' : 'deactivated'} successfully!`);
        // Re-fetch vehicles after updating status
        fetchVehicles({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
      } else {
        toast.error('Failed to update Vehicle status.');
      }
    } catch (error) {
      console.error('Error updating Vehicle status', error);
      toast.error('Failed to update Vehicle status.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  }, [showAddForm])
  const handleEditVehicle = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/master/transport/vehicles/${id}/`);
      if (response?.data?.status === 200) {
        const VehicleData = response.data.data;
        setFormData(VehicleData);
        setShowAddForm(true);
        setIsEditing(true);
      } else {
        toast.error('Failed to fetch vehicle details.');
        setFormData({});
        setShowAddForm(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error fetching vehicle details', error);
      toast.error('Failed to fetch vehicle details.');
      setFormData({});
      setShowAddForm(false);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const columns = getColumns(handleEditVehicle, setPreviewImage);

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
        heading="Vehicle Master"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        // handleDownload={handleDownload}
        setShowAddForm={setShowAddForm}
        searchPlaceholder="Search Vehicles..."
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
          label="Vehicle"
          onClose={() => {
            setShowAddForm(false)
            setFormData({});
            setIsEditing(false);
          }}
          logoUrl={logo}
          heading="Add New Vehicle"
          formFields={formFields}
          formData={formData}
          setFormData={setFormData}
          postUrl="/master/transport/vehicles/create/"
          patchUrl="/master/transport/vehicles"
          onSuccess={handleSuccess}
        />
      )}
      { previewImage && (
        < ImagePreview
          visible={!!previewImage}
          imageUrl={previewImage}
          onClose={() => {
            setPreviewImage(false);
          }}
        />
      )}
    </div>
  );
};

export default VehiclesMaster;
