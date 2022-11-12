import { UserIcon } from '@heroicons/react/outline'

export default (props) => {
  if (props.user.profilePhotoUploaded) {
    return (
      <img 
        className={"h-"+props.height+" w-"+props.width+" rounded-full object-cover"}
        src={props.user.profileUrl}
      />
    )
  } else {
    return (
      <UserIcon className={"h-"+props.height+" w-"+props.width+" rounded-full border-2 border-gray-300 p-1 font-thin text-gray-300"}/>
    )
  }
}
