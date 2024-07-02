import { Layout, Menu } from 'antd';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Join } from './Join';
import { Queue } from './Queue';
import { CreateTicketPage } from './CreateTicketPage';
import { DesktopPage } from './DesktopPage';
import { useContext } from 'react';
import { UiContext } from '../context/UIContext';



const { Sider, Content } = Layout;


export const RouterPage = () => {
    const { ocultarMenu } = useContext(UiContext)
    return (
        <Router>
            <Layout className='layout-container'>
                <Sider
                    collapsedWidth={0}
                    breakpoint='md'
                    hidden={ocultarMenu}
                >
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                    >
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to="/join">Ingresar</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to="/queue">Cola de tickets</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to="/createticket">Crear ticket</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Routes>
                            <Route path='/join' Component={Join} />
                            <Route path='/queue' Component={Queue} />
                            <Route path='/createticket' Component={CreateTicketPage} />

                            <Route path='/desktop' Component={DesktopPage} />

                            <Route path='/' element={<Navigate to='/join' />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
}