import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined, DownloadOutlined, FilterOutlined, PlusSquareOutlined } from "@ant-design/icons";

type TableTopRowProps = {
    heading?: string;
    search?: string;
    setSearch?: (value: string) => void;
    handleSearch?: () => void;
    handleDownload?: () => void;
    handleFilter?: () => void;
    setShowAddForm?: (value: boolean) => void;
    searchPlaceholder?: string;
    showAdd?: boolean;
};

const TableTopRow: React.FC<TableTopRowProps> = ({
    heading = "", 
    search = "",
    setSearch,
    handleSearch,
    handleDownload,
    handleFilter,
    setShowAddForm,
    searchPlaceholder = "Search here...",
    showAdd = true,
}) => (
    <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            // gap: 8,
            marginBottom: 2,
            alignItems: "center",
        }}
    >   
        {heading && <h2 style={{ margin: 0, paddingLeft: '5px', float: 'left' }}>{heading}</h2>}
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                // gap: 8,
                marginBottom: 16,
                alignItems: "center",
            }}
        >   
            {setSearch && (
              <Input
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: 300, marginLeft: 16, borderRadius: 0, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}
              />
            )}
            {handleSearch && (
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch} 
                style={{ margin: 0, width: 40, fontSize: '14px',  borderRadius: 0, borderTopRightRadius: 6, borderBottomRightRadius: 6 }}/>
            )}
            {handleDownload && (
              <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                  style={{ marginLeft: 8,  fontSize: '14px', width: 40,}}
              />
            )}
            {handleFilter && (
              <Button icon={<FilterOutlined />} onClick={handleFilter} 
              style={{ marginLeft: 8,  fontSize: '14px'}}>
                  Filter
              </Button>
            )}
            {(setShowAddForm && showAdd) && (
              <Button type="primary" icon={<PlusSquareOutlined />} onClick={() => setShowAddForm(true)} 
                style={{ marginLeft: 8,  fontSize: '14px'}}>
                  Add
              </Button>
            )}
        </div>
    </div>
);

export default TableTopRow;