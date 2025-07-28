import React, { useState } from 'react';
import { Button, Popover, Tag, Tooltip, Typography, Drawer, Tabs, Form } from 'antd';
import { DownloadOutlined, SearchOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import moment from 'moment';

const { Text } = Typography;
const { TabPane } = Tabs;

interface FilterGroup {
  groupLabel: string;
  filters: any[]; // Replace with actual filter input definition
}

interface FilterProps {
  appliedFilters: Record<string, any>;
  removedFilters: Set<string>;
  filterGroups: FilterGroup[];
  onRemoveFilter: (key: string) => void;
  onReset: () => void;
  onSubmit: () => void;
  onDownload?: () => void;
  isDownloading?: boolean;
  showDownload?: boolean;
  filtersLayout?: 'tab' | 'collapse';
  title?: string;
}

const FiltersWrapper = styled.div`
  height: calc(100vh - 14vh);
  max-height: calc(180vh - 14vh);
  overflow-y: auto;
  width: 100% !important;
  box-shadow: inset 0px 10px 12px 16px #1111116b, inset 0px 12px 18px 16px #1111116b;
`;

const AdvancedFilters: React.FC<FilterProps> = ({
  appliedFilters,
  removedFilters,
  filterGroups,
  onRemoveFilter,
  onReset,
  onSubmit,
  onDownload,
  isDownloading,
  showDownload = false,
  filtersLayout = 'tab',
  title = 'Filters',
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  // Toggle Drawer for Filters
  const toggleDrawer = (action?: 'submit' | 'reset') => {
    if (action === 'submit') {
      onSubmit();
    } else if (action === 'reset') {
      onReset();
    }
    setDrawerOpen(!isDrawerOpen);
  };

  // Render Applied Filters
  const renderAppliedFilters = () => {
    if (!appliedFilters || Object.keys(appliedFilters).length === 0) return null;

    return (
      <>
        {Object.entries(appliedFilters).map(([key, value], i) => {
          if (!value) return null;
          return (
            <Popover
              key={i}
              placement="top"
              title={<Text strong>{key}</Text>}
              content={<Text>{String(value)}</Text>}
            >
              <Tag
                closable={!removedFilters.has(key)}
                onClose={() => onRemoveFilter(key)}
                color={removedFilters.has(key) ? undefined : 'cyan'}
                style={{
                  padding: '0px 10px',
                  maxWidth: '300px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '20px',
                  cursor: 'default',
                  display: 'flex',
                }}
              >
                <Text strong>{key}</Text>&nbsp;:&nbsp;
                <Text
                  style={{
                    maxWidth: '72px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                  }}
                >
                  {String(value)}
                </Text>
              </Tag>
            </Popover>
          );
        })}
        {removedFilters.size > 0 && (
          <Tooltip title="Apply">
            <Button
              onClick={() => onSubmit()}
              size="small"
              shape="circle"
              icon={<CheckOutlined style={{ fontSize: '12px' }} />}
            />
          </Tooltip>
        )}
      </>
    );
  };

  // Render Filters inside Tabbed View or
