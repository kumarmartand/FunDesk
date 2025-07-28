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

const SessionMaster: React.FC = () => {
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

  const fetchSessions = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post('/master/sessions/', params);
        setData(res.data.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.count,
          showTotal: (total: number) => `Total ${total} Records`,
        }));
      } catch (error) {
        console.error('Error fetching sessions', error);
        toast.error('Failed to fetch sessions.');
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
      // Re-fetch sessions after adding a new one
      fetchSessions({
        ...filters,
        search_text: search,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  }

  useEffect(() => {
    fetchSessions({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  }, [pagination.current, pagination.pageSize, fetchSessions]);

  const handleTableChange = (pagination: any, filtersArg: any) => {
    setPagination({ ...pagination });
    setFilters(filtersArg);

    fetchSessions({ ...filtersArg, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  };

  const handleSearch = () => {
    fetchSessions({ ...filters, search_text: search, page: 1, pageSize: pagination.pageSize });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDownload = async () => {
    alert('Download triggered (dummy)');
  };

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      const updateStatusData = { is_active: isActive };
      const response = await axiosInstance.patch(`/master/sessions/${id}/`, updateStatusData);
      if (response?.data?.status === 200) {
        toast.success(`Session ${isActive ? 'activated' : 'deactivated'} successfully!`);
        // Re-fetch sessions after updating status
        fetchSessions({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
      } else {
        toast.error('Failed to update session status.');
      }
    } catch (error) {
      console.error('Error updating session status', error);
      toast.error('Failed to update session status.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSession = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/master/sessions/${id}/`);
      if (response?.data?.status === 200) {
        const sessionData = response.data.data;
        setFormData(sessionData);
        setShowAddForm(true);
        setIsEditing(true);
      } else {
        toast.error('Failed to fetch session details.');
        setFormData({});
        setShowAddForm(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error fetching session details', error);
      toast.error('Failed to fetch session details.');
      setFormData({});
      setShowAddForm(false);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const columns = getColumns(handleUpdateStatus, handleEditSession);

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
        heading="Session Master"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        // handleDownload={handleDownload}
        setShowAddForm={setShowAddForm}
        searchPlaceholder="Search sessions..."
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
          label="Session"
          onClose={() => {
            setShowAddForm(false)
            setFormData({});
            setIsEditing(false);
          }}
          logoUrl={logo}
          heading="Add New Session"
          formFields={formFields}
          formData={formData}
          setFormData={setFormData}
          postUrl="/master/sessions/create/"
          patchUrl="/master/sessions"
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default SessionMaster;
