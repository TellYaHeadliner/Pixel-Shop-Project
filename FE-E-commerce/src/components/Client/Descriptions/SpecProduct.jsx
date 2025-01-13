import React from "react";
import { Descriptions } from "antd";
import "./SpecProduct.css"
// Ánh xạ các label sang tiếng Việt
const labelMapping = {
  heDieuHanh: "Hệ điều hành",
  CPU: "CPU",
  RAM: "Dung lượng RAM",
  RAMToiDa: "Dung lượng RAM tối đa",
  loaiRAM: "Loại RAM",
  busRAM: "Bus RAM",
  soLuongKheRAM: "Số lượng khe RAM",
  dungLuongROM: "Dung lượng ROM",
  loaiROM: "Loại ổ cứng",
  GPU: "GPU",
  cameraTruoc: "Camera trước",
  cameraSau: "Camera sau",
  pin: "Pin",
  sac: "Sạc",
  loa: "Loa",
  SIM: "SIM",
  manHinh: "Màn hình",
  kichThuoc: "Kích thước",
  trongLuong: "Trọng lượng",
  mauSac: "Màu sắc",
  congKetNoi: "Cổng kết nối",
};

const SpecProduct = ({ detailProduct }) => {
  return (
    <Descriptions
      bordered
      title="Chi tiết sản phẩm"
      column={1}
      className="spec-descriptions"
    >
      <Descriptions.Item label={labelMapping.heDieuHanh}>
        {detailProduct?.heDieuHanh}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.CPU}>
        {detailProduct?.CPU}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.RAM}>
        {detailProduct?.RAM}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.RAMToiDa}>
        {detailProduct?.RAMToiDa}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.loaiRAM}>
        {detailProduct?.loaiRAM}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.busRAM}>
        {detailProduct?.busRAM}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.soLuongKheRAM}>
        {detailProduct?.soLuongKheRAM}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.dungLuongROM}>
        {detailProduct?.dungLuongROM}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.loaiROM}>
        {detailProduct?.loaiROM}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.GPU}>
        {detailProduct?.GPU}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.cameraTruoc}>
        {detailProduct?.cameraTruoc}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.cameraSau}>
        {detailProduct?.cameraSau}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.pin}>
        {detailProduct?.pin}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.sac}>
        {detailProduct?.sac}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.loa}>
        {detailProduct?.loa}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.SIM}>
        {detailProduct?.SIM}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.manHinh}>
        {detailProduct?.manHinh}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.kichThuoc}>
        {detailProduct?.kichThuoc}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.trongLuong}>
        {detailProduct?.trongLuong}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.mauSac}>
        {detailProduct?.mauSac}
      </Descriptions.Item>
      <Descriptions.Item label={labelMapping.congKetNoi}>
        {detailProduct?.congKetNoi}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default SpecProduct;
