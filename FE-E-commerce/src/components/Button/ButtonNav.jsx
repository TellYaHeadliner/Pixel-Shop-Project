import { BsFillTelephoneFill } from "react-icons/bs";

export default function Button(){
    return (
        <div className="button">
            <div style={{
                'width': '50px',
                'height': '50px',
                'borderRadius': '8px',
                'backgroundColor': '#f8f9fa',
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'border': '1px solid #ddd'
            }}>
                <BsFillTelephoneFill size="24px" color="#333"/>
                <span style={{ fontSize: '14px', marginTop: '5px'}}>Liên hệ</span>
            </div>
        </div>            
    )
 
}