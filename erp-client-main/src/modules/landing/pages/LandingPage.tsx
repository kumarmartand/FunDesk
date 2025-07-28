import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import {
  UsergroupAddOutlined,
  DollarCircleOutlined,
  BookOutlined,
  TeamOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import styles from './LandingPage.module.css';

const { Title } = Typography;

const metrics = [
  {
    title: 'Total Students',
    value: '1,200',
    icon: UsergroupAddOutlined,
    iconColor: '#1890ff', // Blue
    bgColor: 'rgb(26, 136, 187)',
  },
  {
    title: 'Total Fees Collected',
    value: '₹12,50,000',
    icon: DollarCircleOutlined,
    iconColor: '#52c41a', // Green
    bgColor: 'rgb(102, 187, 106)',
  },
  {
    title: 'Fees Due',
    value: '₹3,40,000',
    icon: DollarCircleOutlined,
    iconColor: '#fa541c', // Red/orange for urgency
    bgColor: 'rgb(149, 117, 205)',
  },
  {
    title: 'Total Staff',
    value: '85',
    icon: TeamOutlined,
    iconColor: '#722ed1', // Purple
    bgColor: 'rgb(236, 64, 122)',
  },
  {
    title: 'Courses Offered',
    value: '45',
    icon: BookOutlined,
    iconColor: '#eb2f96', // Magenta
    bgColor: 'rgb(38, 166, 154)',
  },
  {
    title: 'Upcoming Exams',
    value: '6',
    icon: ScheduleOutlined,
    iconColor: '#13c2c2', // Teal
    bgColor: 'rgb(255, 235, 59)',
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.headerTitle}>
        🎓 Dashboard
      </h2>

      <Row gutter={[24, 24]}>
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card className={styles.metricCard} bodyStyle={{ padding: 20 }}>
                <div className={styles.cardContent}>
                  <div
                    className={styles.iconWrapper}
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <Icon style={{ fontSize: 32, color: item.iconColor }} />
                  </div>
                  <div>
                    <div className={styles.metricValue}>{item.value}</div>
                    <div className={styles.metricTitle}>{item.title}</div>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default LandingPage;
