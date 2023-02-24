import { Fragment, useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

export default (props) => {
    const [borderStyle, setBorderStyle] = useState("border border-gray-300")
    const [textStyle, setTextStyle] = useState("text-gray-900")
    const [dotStyle, setDotStyle] = useState("bg-primary4")
    const [xColor, setXColor] = useState("text-gray-400")

    useEffect(() => {
        if (props.addMode) {
            if (props.selected) {
                setDotStyle("bg-green-400")
                setTextStyle("text-green-400")
                setBorderStyle("border border-2 border-green-400")
                setXColor("text-green-400");
            } else {
                setBorderStyle("border border-gray-300")
                setTextStyle("text-green-400")
                setDotStyle("bg-green-400")
                setXColor("text-green-400");
            }
        } else if (!props.addMode && props.deleteMode) {
            if (props.selected) {
                setDotStyle("bg-red-400")
                setTextStyle("text-red-400")
                setBorderStyle("border border-2 border-red")
                setXColor("text-red-400");
            } else {
                setBorderStyle("border border-gray-300")
                setTextStyle("text-red-400")
                setDotStyle("bg-red-400")
                setXColor("text-red-400");
            }
        } else {
            if (props.selected) {
                setTextStyle("text-gray-900")
                setDotStyle("bg-primary4")
                setXColor("text-gray-400")
                setBorderStyle("border border-2 border-primary4")
            } else {
                setBorderStyle("border border-gray-300")
                setTextStyle("text-gray-900")
                setDotStyle("bg-primary4")
                setXColor("text-gray-400")
            }
        }
    }, [props.selected])
    return (
        <Fragment key={props.item.id}>
            <button
                className={
                    "relative inline-flex items-center rounded-full pl-2 py-0.5 mt-1 mx-1 text-sm " + 
                    borderStyle + " " + ((props.deleteMode || props.itemLock) ? "pr-2" : "pr-1")
                }
                onClick={() => props.selectItem(props.item.id)}
            >
                <span className="absolute flex-shrink-0 flex items-center justify-center">
                    <span
                        className={'h-1.5 w-1.5 rounded-full ' + dotStyle }
                        aria-hidden="true"
                    />
                </span>
                <span className={"ml-3.5 text-sm font-medium text-gray-900 " + textStyle}>{props.item.name}</span>
                {(!props.deleteMode && !props.itemLock) && (
                    <span>
                        <XIcon className={"ml-1 w-4 h-4 "+xColor} onClick={(e) => {
                            e.stopPropagation()
                            props.removeItem(props.item)
                        }} />
                    </span>
                )}
            </button>
        </Fragment>
    )
}