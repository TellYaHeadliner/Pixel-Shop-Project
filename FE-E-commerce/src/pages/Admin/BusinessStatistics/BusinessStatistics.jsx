import { Col, Row, Flex} from "antd"

import { LineChartBusiness } from "../../../components/Admin/Charts/LineChartBusiness";
import { TableBusinessStatistic } from "../../../components/Admin/Table/TableBusinessStatistic";
import BarChartBusinessByMonth from "../../../components/Admin/Charts/BarChartBusinessByMonth";

const BusinessStatistics = () => {
    return (
      <Row gutter={[16, 16]}>
        <Flex justify="center" align="center">
          <Col md={12}>
            <TableBusinessStatistic />
          </Col>
          <Col md={12}>
            <LineChartBusiness />
          </Col>
        </Flex>
        <Col md={24} span={16}>
            <BarChartBusinessByMonth />
        </Col>
      </Row>

    );
}

export default BusinessStatistics;