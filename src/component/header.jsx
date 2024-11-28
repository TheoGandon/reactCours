import React from 'react';
import { Layout, Menu } from "antd";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { Header } = Layout;
    const navigate = useNavigate();
    const navigation = [
        { label: "Home", key: '/',},
        { label: "ChatBot", key: '/chatbot' },
        { label: "Space Picture", key: '/spacepicture',},
        { label: "Contact", key: 'contact',},
      ];
      const handleMenuClick = ({ key }) => {
        if (key) {
          navigate(key);
        }
      };
    return (
        <div>
            <Layout style={{backgroundColor: '#12385e',}}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 75,
                        margin: 20,
                        boxShadow: '11px -5px 0px 0px #1677ff',
                    }}
                >
                    <div className="demo-logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        items={navigation}
                        onClick={handleMenuClick}
                        style={{
                            flex: 1,
                            minWidth: 0,
                        }}
                    />
                </Header>
            </Layout>
        </div>
    );
};

export default Header;