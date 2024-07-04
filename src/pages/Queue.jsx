import { Typography, Row, Col, List, Card, Tag, Divider, Avatar } from 'antd';
import { UserOutlined, DesktopOutlined, HistoryOutlined } from '@ant-design/icons';
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { getLasts } from "../helpers/getLasts";
import './styles/queue.css'

const { Title, Text } = Typography;

export const Queue = () => {

    useHideMenu(true)

    const { socket } = useContext(SocketContext)
    const [tickets, setTickets] = useState([])


    useEffect(() => {
        socket.on('ticket-assigned', (assigned) => {
            setTickets(assigned);
        });

        return () => {

            socket.off('ticket-assigned');
        };
    }, [socket]);

    useEffect(() => {
        getLasts().then(setTickets)

    }, [setTickets])




    return (
        <div className="modern-ticket-page">
            <Title level={3} className="page-title">
                <UserOutlined /> Atendiendo al cliente
            </Title>

            <Row gutter={16} className="content-row">
                <Col xs={24} lg={12} className="ticket-column">
                    <Card
                        title={<><DesktopOutlined /> Tickets Actuales</>}
                        className="ticket-card current-tickets-card"
                        styles={{ padding: '0 16px' }}
                    >
                        <List
                            dataSource={tickets.slice(0, 3)}
                            renderItem={item => (
                                <List.Item>
                                    <Card
                                        className="inner-ticket-card"
                                        size="small"
                                    >
                                        <Card.Meta
                                            avatar={<Avatar style={{ backgroundColor: '#f56a00' }}>{item.number}</Avatar>}
                                            title={`Ticket No. ${item.number}`}
                                            description={
                                                <>
                                                    <Tag color="volcano" icon={<UserOutlined />}>{item.agent}</Tag>
                                                    <Tag color="blue" icon={<DesktopOutlined />}>{item.desktop}</Tag>
                                                </>
                                            }
                                        />
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={12} className="ticket-column">
                    <Card
                        title={<><HistoryOutlined /> Historial de Tickets</>}
                        className="ticket-card history-tickets-card"
                        styles={{ padding: '0 16px' }}
                    >
                        <List
                            dataSource={tickets.slice(3)}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{item.number}</Avatar>}
                                        title={`Ticket No. ${item.number}`}
                                        description={
                                            <>
                                                <Tag color="volcano" icon={<UserOutlined />}>Agente: {item.agent}</Tag>
                                                <Tag color="blue" icon={<DesktopOutlined />}>Escritorio: {item.desktop}</Tag>
                                            </>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}