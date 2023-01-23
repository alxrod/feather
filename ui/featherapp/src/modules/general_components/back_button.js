import { Link } from "react-router-dom"
import { ChevronLeftIcon } from "@heroicons/react/outline"

export default (props) => {
    return (
        <Link to={props.link} className="flex items-center font-medium text-primary6 hover:text-primary4">
            <ChevronLeftIcon className="w-4 h-4"/>
            <p>Back</p>
        </Link>
    )
}
