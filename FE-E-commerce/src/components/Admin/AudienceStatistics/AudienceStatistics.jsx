import BarChart from "../Charts/BarChart";

import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";

const AudienceStatistics = () => {
    return (
        <div>
            <h2>Thống kê đối tượng</h2>
            <PieChart />
            <BarChart />
            <LineChart />
        </div>
    );
};

export default AudienceStatistics;