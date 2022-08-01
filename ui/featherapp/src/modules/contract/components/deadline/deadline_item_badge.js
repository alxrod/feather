import { Fragment, useEffect } from 'react'
import { XIcon } from '@heroicons/react/outline'

export default (props) => {
    return (
        <Fragment key={props.item.id}>
            <button
                className={"relative inline-flex items-center rounded-full px-2 py-0.5 mt-1 mx-1 text-sm " + (props.selected === true ? "bg-indigo-500" : "border border-gray-300")}
                onClick={() => props.selectItem(props.item.id)}
            >
                <span className="absolute flex-shrink-0 flex items-center justify-center">
                    <span
                        className={'h-1.5 w-1.5 rounded-full ' + (props.selected === true ? "bg-white" : "bg-indigo-500")}
                        aria-hidden="true"
                    />
                </span>
                <span className={"ml-3.5 text-xs font-medium text-gray-900 " + (props.selected === true ? "text-white" : "text-gray-900")}>{props.item.name}</span>
            </button>
        </Fragment>
    )
}