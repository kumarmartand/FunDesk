import React, { useState, useEffect, useCallback } from 'react';
import { Spin } from 'antd';
import ErpTable from '../../../Components/ErpTable/ErpTable.tsx';
import axiosInstance from '../../../shared/api/axiosInstance.ts';
import TableTopRow from '../../../Components/TableTopRow/TableTopRow.tsx';
import { formFields, getColumns } from './const.tsx';
import ErpAddForm from '../../../Components/ErpAddForm/ErpAddForm.tsx';
import { toast } from 'react-toastify';
import logo from '../../../assets/erp_logo.jpg';
import type { AxiosResponse } from 'axios';
import StudentDrawer from '../../../Components/StudentDrawer/StudentDrawer.tsx';
import StudentForm from '../../../Components/StudentForm/StudentForm.tsx';

const Student: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState('');
  const [formField, setFormField] = useState({});
  const [enableAdd, setEnableAdd] = useState(true);
  const [formData, setFormData] = useState({});
  const [studentData, setStudentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState({ 
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50', '100'],
  });

  const fetchStudentData = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post('/student/', params);
        setData(res.data.data);
        setPagination((prevPagination) => ({
          ...prevPagination,
          total: res.data.count,
          showTotal: (total: number) => `Total ${total} Records`,
        }));
      } catch (error) {
        console.error('Error fetching student data', error);
        toast.error('Failed to fetch student data.');
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
      // Re-fetch student data after adding a new one
      fetchStudentData({
        ...filters,
        search_text: search,
        page: pagination.current,
        pageSize: pagination.pageSize,
      });
    }
  }

  useEffect(() => {
    fetchStudentData({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  }, [pagination.current, pagination.pageSize, fetchStudentData, filters, search]);

  const handleTableChange = (pagination: any, filtersArg: any) => {
    setPagination({ ...pagination });
    setFilters(filtersArg);

    fetchStudentData({ ...filtersArg, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
  };

  const handleSearch = () => {
    fetchStudentData({ ...filters, search_text: search, page: 1, pageSize: pagination.pageSize });
    setPagination({ ...pagination, current: 1 });
  };

  const handleDownload = async () => {
    alert('Download triggered (dummy)');
  };

  const handleUpdateStatus = async (id: string, isActive: boolean) => {
    setLoading(true);
    try {
      const updateStatusData = { is_active: isActive };
      const response = await axiosInstance.patch(`/student/${id}/`, updateStatusData);
      if (response?.data?.status === 200) {
        toast.success(`student ${isActive ? 'activated' : 'deactivated'} successfully!`);
        // Re-fetch student data after updating status
        fetchStudentData({ ...filters, search_text: search, page: pagination.current, pageSize: pagination.pageSize });
      } else {
        toast.error('Failed to update student status.');
      }
    } catch (error) {
      console.error('Error updating student status', error);
      toast.error('Failed to update student status.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = async (id: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/student/${id}/`);
      if (response?.data?.status === 200) {
        const studentData = response.data.data;
        console.log('Fetched student data for editing:', studentData);
        
        setFormData(studentData);
        setShowAddForm(true);
        setIsEditing(true);
      } else {
        toast.error('Failed to fetch student details.');
        setFormData({});
        setShowAddForm(false);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error fetching student details', error);
      toast.error('Failed to fetch student details.');
      setFormData({});
      setShowAddForm(false);
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };
  const handleStudentDrawer = (student: any) => {
    setStudentData(student);
    setShowDrawer(true);
  };
  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setStudentData(null);
  };
  const columns = getColumns(handleEditStudent, handleUpdateStatus, handleStudentDrawer);

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
        heading="Student Master"
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        // handleDownload={handleDownload}
        setShowAddForm={setShowAddForm}
        searchPlaceholder="Search student..."
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
        <StudentForm
          initialData={formData}
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={(data: any) => console.log(data)}
          isEdit={isEditing}
        />
      )}

      {showDrawer && (
          <StudentDrawer
            open={showDrawer}
            studentId={studentData}
            onClose={handleCloseDrawer}
          />
      )}
    </div>
  );
};

export default Student;
