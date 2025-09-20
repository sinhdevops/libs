import classNames from 'classnames/bind';
import styles from './Index.module.scss';
import { Layout, Menu, theme } from 'antd';
import {
    HomeOutlined,
    ShoppingOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileOutlined,
    GiftFilled,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';

import ManagerProduct from './Components/ManagerProducts/ManagerProduct';
import DashBoard from './Components/DashBoard/DashBoard';
import ManagerCategory from './Components/ManagerCategory/ManagerCategory';
import ManagerOrder from './Components/ManagerOrder/ManagerOrder';
import ManagerUser from './Components/ManagerUser/ManagerUser';
// import { requestAdmin } from '../../config/request';
import { useNavigate } from 'react-router-dom';
import { requestAdmin } from '../../config/request';
const { Header, Sider, Content } = Layout;
const cx = classNames.bind(styles);

function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const { token } = theme.useToken();
    const [selectedKey, setSelectedKey] = useState('home');

    const navigate = useNavigate();

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                await requestAdmin();
            } catch (error) {
                navigate('/');
            }
        };
        checkAdmin();
    }, []);

    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: 'Trang chủ',
        },
        {
            key: 'products',
            icon: <ShoppingOutlined />,
            label: 'Quản lý sản phẩm',
        },
        {
            key: 'category',
            icon: <FileOutlined />,
            label: 'Quản lý danh mục',
        },
        {
            key: 'order',
            icon: <ShoppingOutlined />,
            label: 'Quản lý đơn hàng',
        },
        {
            key: 'users',
            icon: <UserOutlined />,
            label: 'Quản lý người dùng',
        },
    ];

    const renderContent = () => {
        switch (selectedKey) {
            case 'products':
                return <ManagerProduct />;
            case 'home':
                return <DashBoard />;
            case 'category':
                return <ManagerCategory />;
            case 'order':
                return <ManagerOrder />;
            case 'users':
                return <ManagerUser />;
            default:
                return <ManagerUser />;
        }
    };

    return (
        <Layout className={cx('wrapper')}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    background: token.colorPrimary,
                }}
            >
                <div className={cx('logo')}>{collapsed ? 'A' : 'ADMIN'}</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    onClick={(item) => setSelectedKey(item.key)}
                    style={{
                        background: 'transparent',
                    }}
                />
            </Sider>
            <Layout>
                <Header className={cx('header')}>
                    <button
                        type="button"
                        style={{
                            cursor: 'pointer',
                            border: 'none',
                            background: 'none',
                            fontSize: '16px',
                            color: token.colorTextSecondary,
                        }}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </button>
                </Header>
                <Content className={cx('content')}>{renderContent()}</Content>
            </Layout>
        </Layout>
    );
}

export default Admin;
