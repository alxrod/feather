// import React, { useState } from 'react';
// import { send_ping } from "../../reducers/pingpong"
// import { write_log } from "../../reducers/log"
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'

// const Example = props => {

//     const [log_payload, setPayload] = useState("");

//     return (
//         <div>
//             <h1>Ping Status: {props.status.toString() }</h1>
//             <button onClick={props.send_ping}>Ping</button>
//             <input type="text" value={log_payload} onChange={e => setPayload(e.target.value)} />
//             <button onClick={_ => props.write_log(log_payload)}>Submit</button>
//         </div>
//     )
// }

// const mapStateToProps = ({ pingpong }) => ({
//     status: pingpong.status,
// })

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     send_ping,
//     write_log,
// }, dispatch)

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Example)
