import { Button, message, Popconfirm } from "antd";

const UpdateContact = ({ onConfirm }) => {
    const confirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    }

    const cancel = () => {
        message.error("Chức năng đã được hủy")
    }

    return (
        <Popconfirm 
        title="Bạn có muốn cập nhật trạng thái?" 
        onConfirm={confirm} 
        onCancel={cancel} 
        okText="Cập nhật" 
        cancelText="Hủy">
            <Button color="primary" variant="solid">Cập nhật</Button>
        </Popconfirm>
    )
}

export default UpdateContact;