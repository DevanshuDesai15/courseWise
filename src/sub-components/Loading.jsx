import ReactLoading from 'react-loading';

export default function Loading() {
    return (
        <div style={{ display: 'flex', justifyContent: "center", marginTop:150}}>
            <ReactLoading type="spin" color="#1c8fed"/>
        </div>
    )
}