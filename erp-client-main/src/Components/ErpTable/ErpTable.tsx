import React from 'react';
import { Table } from 'antd';
import type { TableProps, ColumnsType, TablePaginationConfig, FilterValue, SorterResult } from 'antd/es/table';
import { useToken } from 'antd/es/theme/internal';

type ErpTableProps<RecordType> = {
    columns: ColumnsType<RecordType>;
    data: RecordType[];
    loading?: boolean;
    rowKey?: string | ((record: RecordType) => string);
    pagination?: TableProps<RecordType>['pagination'];
    bordered?: boolean;
    size?: TableProps<RecordType>['size'];
    scroll?: TableProps<RecordType>['scroll'];
    style?: React.CSSProperties;
    onRowClick?: (record: RecordType) => void;
    onTableChange?: (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<RecordType> | SorterResult<RecordType>[],
        extra: any
    ) => void;
};

function ErpTable<RecordType extends object>({
    columns,
    data,
    loading = false,
    rowKey,
    pagination,
    bordered = true,
    size = 'middle',
    scroll,
    style = {},
    onRowClick,
    onTableChange,
}: ErpTableProps<RecordType>) {
    
    const components = {
        header: {
            cell: (props: any) => (
                <th
                    {...props}
                    style={{
                        background: '#1677ff',
                        color: '#fff',
                        fontWeight: 600,
                        ...props.style,
                    }}
                />
            ),
        },
    };

    return (
        <Table<RecordType>
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey={rowKey}
            pagination={
                pagination && pagination?.total !== undefined
                    ? {
                          ...pagination,
                          total: pagination?.total,
                          showTotal: (total) => `Total ${total} Records`,
                      }: false
            }
            bordered={bordered}
            size={size}
            scroll={scroll}
            style={style}
            components={components}
            onRow={onRowClick ? (record) => ({
                onClick: () => onRowClick(record),
            }) : undefined}
            onChange={onTableChange}
        />
    );
}

export default ErpTable;
