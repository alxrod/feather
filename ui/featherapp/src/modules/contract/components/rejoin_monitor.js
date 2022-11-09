import React, {useState, useMemo, useEffect, useSyncExternalStore } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {queryContract } from "../../../reducers/contract/dispatchers/contract.dispatcher"
import {joinChat, pullRecord} from "../../../reducers/chat/dispatchers/chat.dispatcher"

const RejoinMonitor = props => {
  const [online, isOnline] = useState(navigator.onLine);

  const waitTimes = [0,1,5,10,15,30,45,60]

  const [waitTimeIdx, setWaitTimeIdx] = useState(0)

  const rejoin = () => {
    props.queryContract(props.curContract.id)
    props.joinChat(props.curContract.roomId, props.curContract.role)
    props.pullRecord(props.curContract.roomId)
  }
  const setOnline = () => {
    rejoin()
    isOnline(true);
  };
  const setOffline = () => {
    console.log('We are offline!');
    isOnline(false);
  };
  
  useEffect(() => {
    window.addEventListener('offline', setOffline);
    window.addEventListener('online', setOnline);

    // cleanup if we unmount
    return () => {
      window.removeEventListener('offline', setOffline);
      window.removeEventListener('online', setOnline);
    }
  }, []);

  useEffect( () => {
    if (props.rejoinSequenceActive) {
      setTimeout(() => {  
        console.log("Attempting a rejoin to the chat")
        rejoin()
        if (waitTimeIdx < waitTimes.length - 1) {
          setWaitTimeIdx(waitTimeIdx+1)
        }
      }, waitTimes[waitTimeIdx]);
    }
  }, [props.rejoinSequenceActive])
}
const mapStateToProps = ({ contract, chat}) => ({
  curContract: contract.curContract,
  rejoinSequenceActive: chat.rejoinSequenceActive,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  joinChat,
  pullRecord,
  queryContract,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RejoinMonitor)