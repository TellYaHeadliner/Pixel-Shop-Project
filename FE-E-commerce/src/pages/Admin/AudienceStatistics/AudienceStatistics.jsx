
import BarChart from "../Charts/BarChart";

import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";


const AudienceStatistics = () => {
    const data = [
        {
            type: 'Sản phẩm được thêm',
            value: 120,
        },
        {
            type: 'Sản phẩm được bán',
            value: 90,
        },
        {
            type: 'Số tài khoản',
            value: 200,
        },
        {
            type: 'Bài viết',
            value: 30,
        },
        {
            type: 'Sản phẩm bị mất',
            value: 10,
        },
    ];


    return (
        <div>
            <PieChart />
            <BarChart />
            <LineChart />
        </div>
    );
};

export default AudienceStatistics;