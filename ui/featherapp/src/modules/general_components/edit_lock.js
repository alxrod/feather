import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/solid'

export default (props) => {
  if (props.status === undefined || props.isYou === undefined || props.awaiting === undefined) {
    return (<></>)
  }
  if (props.awaiting === true) {
    return (
      <div className="flex items-center text-grey-500">
        <LockOpenIcon className="w-3 h-3"/>
        <p className="ml-1 text-sm">Anyone can edit</p>
      </div>
    )
  } else if (props.status === false) {
    return (
      <div className="flex items-center text-grey-500">
        <LockOpenIcon className="w-3 h-3"/>
        <p className="ml-1 text-sm">Anyone can edit</p>
      </div>
    )
  } else if (props.status === true) {
    if (props.isYou) {
      return (
        <div className="flex items-center text-green">
          <LockClosedIcon className="w-3 h-3"/>
          <p className="ml-1 text-sm">You are editing</p>
        </div>
      )
    } else {
      return (
        <div className="flex items-center text-red">
          <LockClosedIcon className="w-3 h-3"/>
          <p className="ml-1 text-sm">Your partner is editing</p>
        </div>
      )
    }
  }
}