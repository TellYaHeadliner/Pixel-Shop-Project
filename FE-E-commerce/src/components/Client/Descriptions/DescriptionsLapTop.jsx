import { Descriptions, } from "antd";

// Static data chỉnh theo đúng json
const DescriptionsLapTop = () => {
  const data = [
    {
      CPU: "CPU: Intel Core i5 1235U - 10C10T - 1.3GHz - Max boost: 4.4 GHz",
      dungLuongRam: "8 GB",
      dungLuongRAMToiDa: "16 GB",
      RAMToiDa: "16 GB",
      loaiRam: "DRR4",
      busRAM: "2666 MHZ",
      soLuongKheRAM: "2 khe (1 khe đã cắm + 1 khe trống)",
      loaiOCung: "M.2 PCI",
      dungLuongOCung: "512 GB",
    },
  ];

  const product = data[0]; // Lấy sản phẩm đầu tiên từ mảng (nếu có nhiều sản phẩm)

  // Ánh xạ các label sang tiếng Việt
  const labelMapping = {
    CPU: "CPU",
    dungLuongRam: "Dung lượng RAM",
    dungLuongRAMToiDa: "Dung lượng RAM tối đa",
    RAMToiDa: "RAM tối đa",
    loaiRam: "Loại RAM",
    busRAM: "Bus RAM",
    soLuongKheRAM: "Số lượng khe RAM",
    loaiOCung: "Loại ổ cứng",
    dungLuongOCung: "Dung lượng ổ cứng",
  };

  return (
    <Descriptions bordered title="Chi tiết sản phẩm" column={1}>
      {Object.entries(product).map(([key, value]) => (
        <Descriptions.Item label={labelMapping[key] || key} key={key}>
          {value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
};

export default DescriptionsLapTop;
