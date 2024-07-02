import { Card, Col, Divider, List, Row, Tag, Typography } from "antd";
import { useHideMenu } from "../hooks/useHideMenu";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { getLasts } from "../helpers/getLasts";

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
        <>
            <Title level={1}>
                Atendiendo al cliente
            </Title>
            <Row>
                <Col span={12}>
                    <List
                        dataSource={tickets.slice(0, 3)}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    style={{ width: 300, marginTop: 16 }}
                                    actions={[
                                        <Tag color="volcano">{item.agent}</Tag>,
                                        <Tag color="magenta">desktop: {item.desktop}</Tag>,
                                    ]}
                                >
                                    <Title>
                                        No. {item.number}
                                    </Title>
                                </Card>
                            </List.Item>
                        )}
                    />


                </Col>
                <Col span={12}>
                    <Divider>Historial</Divider>
                    <List
                        dataSource={tickets.slice(3)}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`Ticket No. ${item.number}`}
                                    description={
                                        <>
                                            <Text type="secondary">En el desktop: </Text>
                                            <Tag color="magenta">{item.desktop}</Tag>
                                            <Text type="secondary">agent: </Text>
                                            <Tag color="volcano">{item.agent}</Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    ></List>
                </Col>
            </Row>

        </>
    )
}