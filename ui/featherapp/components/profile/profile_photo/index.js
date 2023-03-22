import { UserIcon } from '@heroicons/react/outline'
import Image from "next/image"

export default (props) => {
  if (props.user.profilePhotoUploaded) {
    return (
      <Image 
        className={"rounded-full object-cover"}
        width={props.height*0.25*16}
        height={props.width*0.25*16}
        src={props.user?.profilePhoto.cacheUrl}
      />
    )
  } else {
    return (
      <UserIcon className={"h-"+props.height+" w-"+props.width+" rounded-full border-2 border-gray-300 p-1 font-thin text-gray-300"}/>
    )
  }
}
