import { ChatAltIcon } from '@heroicons/react/solid'
import ChatLabel from "../../chat_label"
import { useState, useEffect } from "react"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { UserIcon } from '@heroicons/react/outline'

const ProfileImg = (props) => {

  const [haveProfImg, setHaveProfImg] = useState(false)
  const [cacheUrl, setCacheUrl] = useState("")

  useEffect( () => {
    if (props.cachedUrls) {
      setHaveProfImg(false)

      let url =""
      for (let i = 0; i < props.cachedUrls.length; i++) {
        if (props.cachedUrls[i][1] !== "" && props.cachedUrls[i][0] === props.msg.user.id) {
          setHaveProfImg(true)
          setCacheUrl(props.cachedUrls[i][1]+"?"+Date.now())
        }
      }

    }
  },[props.cachedUrls])

  return (
    <>
      {haveProfImg ? (
        <img 
          className={"h-10 w-10 rounded-full object-cover"}
          src={cacheUrl}
        />
      ) : (
        <UserIcon className={"h-10 w-10 rounded-full border-2 bg-white border-gray-300 p-1 font-thin text-gray-300"}/>
      )}
    </>
  )
}

const MsgWrapper = (props) => {

  function Wrapper({icon: Icon}) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon />
      </div>
    );
  }
  
  const genTimeString = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], {timeStyle: 'short'}) + " " + date.toLocaleDateString() 
  }

  return (
    <>
      <div className="relative">
        <ProfileImg cachedUrls={props.cachedUrls} msg={props.msg}/>
        <span className={"absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px " + (props.msg.isAdmin ? "border-2 border-indigo-500" : "")}>
          <Wrapper icon={props.icon}/>
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div>
          <div className="text-sm flex justify-start items-center">
            <p className={"font-medium " + (props.msg.isAdmin ? "text-indigo-600" : "text-gray-900")}>
              {props.msg.user.username}
            </p>
            {props.msg.isAdmin && (
              <p className={"text-xs text-gray-400 ml-2"}>
                <i>(admin)</i>
              </p>
            )}
          </div>
          <div className="flex flex-wrap ">
            <p className="mt-0.5 text-sm text-gray-500 mr-1">{props.editString} at {genTimeString(props.msg.timestamp)}</p><ChatLabel label={props.msg.label}/>
          </div>
        </div>
        {props.children}
      </div>
    </>

  )
}

const mapStateToProps = ({ file }) => ({
  cachedUrls: file.cachedProfileUrls
})
  
const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MsgWrapper)
