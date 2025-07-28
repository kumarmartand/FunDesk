import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  BellOutlined,
  DownOutlined,
  SettingOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { GiPathDistance } from "react-icons/gi";
import type { MenuProps } from 'antd';
import {
  Layout,
  Menu,
  Button,
  Dropdown,
  Avatar,
  Typography,
  Image,
  Space,
  Drawer,
  Grid,
} from 'antd';
import type { FC, ReactNode } from 'react';
import logo from '../../assets/erp_logo.png';
import bg_image from '../../assets/erp_bg.jpg';
import './mainLayout.css';
import { FaHotel } from 'react-icons/fa6';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  key,
  icon,
  children,
  label,
});

const menuItems: MenuItem[] = [
  getItem('Dashboard', '/dashboard', <PieChartOutlined />),
  getItem('Student', '/student', <UserOutlined />),
  getItem('Fees', 'fees', <DollarOutlined />, [
    getItem('Fees Group', '/fees/group'),
    getItem('Fees Type', '/fees/type'),
    getItem('Fees Discount', '/fees/discount'),
    getItem('Fees Master', '/fees/master'),
  ]),
  getItem('Transport', 'transport', <GiPathDistance style={{ fontSize: 18, marginTop: 7 }} />, [
    getItem('Route', '/transport/routes'),
    getItem('Pickup Point', '/transport/pickup-points'),
    getItem('Pickup Point Mapping', '/transport/route-pickup-points'),
    getItem('Vehicle', '/transport/vehicles'),
    getItem('Vehicle Mapping', '/transport/route-vehicles'),
  ]),
  getItem('Hostel', 'hostel', <FaHotel style={{ fontSize: 18, marginTop: 7 }} />, [
    getItem('Room Type', '/hostel/room-types'),
    getItem('Hostel', '/hostel/hostels'),
    getItem('Room Hostel Mapping', '/hostel/rooms'),
  ]),
  getItem('Masters', 'masters', <SettingOutlined />, [
    getItem('Session', '/masters/session'),
    getItem('Classes', '/masters/classes'),
    getItem('Sections', '/masters/section'),
    getItem('Houses', '/masters/houses'),
  ]),
];

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(screens.md ? false : true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;
  const isExtraLarge = screens.xxl;

  useEffect(() => {
    setCollapsed(isMobile);
  }, [screens.md]);

  useEffect(() => {
    if (isMobile) setMobileDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const keyParts = location.pathname.split('/').filter(Boolean);
    if (keyParts.length > 1) {
      setOpenKeys([keyParts[0]]);
    } else {
      setOpenKeys([]);
    }
  }, [location.pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key.startsWith('/')) {
      navigate(key);
      setOpenKeys([]); // close menus after navigation
    }
  };

  const handleOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key));
    const rootSubmenuKeys = menuItems
      .filter(item => item?.children)
      .map(item => item?.key as string);

    if (rootSubmenuKeys.includes(latestOpenKey || '')) {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    } else {
      setOpenKeys([]);
    }
  };

  const getSelectedKeys = () => {
    const pathname = location.pathname;
    const flatKeys = menuItems.flatMap(item =>
      'children' in item && item.children ? item.children.map(sub => sub?.key) : [item?.key]
    );
    const match = flatKeys.find(k => pathname === k || pathname.startsWith(k as string));
    return match ? [match as string] : ['/dashboard'];
  };

  const profileMenu: MenuProps = {
    items: [
      {
        key: 'logout',
        label: <span onClick={() => navigate('/logout')}>Logout</span>,
      },
    ],
  };

  const getSiderWidth = () => (isExtraLarge ? 280 : 200);
  const getHeaderPadding = () =>
    isMobile ? '0 12px' : isTablet ? '0 20px' : isExtraLarge ? '0 32px' : '0 24px';
  const getContentStyles = () =>
    isMobile ? { margin: 0, padding: 8 } :
    isTablet ? { margin: 0, padding: 12 } :
    isExtraLarge ? { margin: 0, padding: 20 } : { margin: 0, padding: 16 };
  const getTitleLevel = () =>
    isMobile ? 5 : isTablet ? 4 : isExtraLarge ? 3 : 4;

  const MobileMenu = () => (
    <Drawer
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Image height={32} width={40} src={logo} preview={false} style={{ borderRadius: 6 }} />
          <Title level={5} style={{ margin: 0, color: '#1677ff' }}>Step by Step</Title>
        </div>
      }
      placement="left"
      closable
      onClose={() => setMobileDrawerOpen(false)}
      open={mobileDrawerOpen}
      width={280}
      styles={{ body: { padding: 0 }, header: { backgroundColor: '#fff' } }}
    >
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        theme="light"
        style={{ paddingInline: 8, fontSize: 16 }}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Drawer>
  );

  const DesktopSider = () => (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={getSiderWidth()}
      collapsedWidth={80}
      style={{
        backgroundColor: '#fff',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        boxShadow: '4px 0 12px rgba(0, 0, 0, 0.08)',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: '8px',
          gap: 20,
          borderBottom: '1px solid #333f54',
        }}
      >
        {!collapsed && (
          <Image
            height={40}
            width={80}
            src={logo}
            preview={false}
            style={{ borderRadius: 8, background: '#000', padding: 1, marginLeft: 30 }}
          />
        )}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: 20,
            width: 40,
            height: 40,
            border: '1px solid #1677ff',
            background: 'none',
            color: '#1677ff',
          }}
        />
      </div>
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        theme="light"
        inlineIndent={16}
        style={{ paddingInline: 8, fontSize: isExtraLarge ? 16 : 14 }}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </Sider>
  );

  const contentStyles = getContentStyles();

  return (
    <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
      {isMobile && <MobileMenu />}
      {!isMobile && <DesktopSider />}

      <Layout style={{ marginLeft: isMobile ? 0 : collapsed ? 80 : getSiderWidth(), transition: 'margin-left 0.3s ease' }}>
        <Header
          style={{
            ...contentStyles,
            padding: getHeaderPadding(),
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            position: 'sticky',
            top: 0,
            zIndex: 99,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {isMobile && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setMobileDrawerOpen(true)}
                style={{
                  fontSize: 18,
                  width: 40,
                  height: 40,
                  color: '#1677ff',
                  border: '1px solid #1677ff',
                }}
              />
            )}
            <Title level={getTitleLevel()} style={{
              margin: 0,
              fontSize: isMobile ? '18px' : isExtraLarge ? '26px' : '20px',
              color: '#fff',
              fontWeight: 600
            }}>
              Step by Step
            </Title>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 12 : isExtraLarge ? 32 : 24 }}>
            <BellOutlined style={{ fontSize: isMobile ? 16 : isExtraLarge ? 20 : 18, color: '#003366' }} />
            <Dropdown menu={profileMenu} trigger={['click']}>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar size={isMobile ? 32 : isExtraLarge ? 44 : 36} icon={<UserOutlined />} style={{ backgroundColor: '#003366' }} />
                {!isMobile && <DownOutlined style={{ fontSize: isExtraLarge ? 16 : 14, color: '#555' }} />}
              </Space>
            </Dropdown>
          </div>
        </Header>

        <Content style={{
          ...contentStyles,
          background: '#fff',
          minHeight: isMobile ? 'calc(100vh - 70px)' : 360,
          overflow: 'auto',
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: children ? 'flex-start' : 'center',
            padding: 0,
          }}>
            {children || (
              <Image
                height={'85vh'}
                width={isMobile ? '95vw' : '90vw'}
                src={bg_image}
                preview={false}
                style={{ objectFit: 'fill', maxWidth: '100%', maxHeight: '100%' }}
              />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
