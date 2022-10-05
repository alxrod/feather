import { Fragment, useEffect, useState } from 'react'
import { XIcon } from '@heroicons/react/outline'

export default (props) => {
    const [borderStyle, setBorderStyle] = useState("border border-gray-300")
    const [textStyle, setTextStyle] = useState("text-gray-900")
    const [dotStyle, setDotStyle] = useState("bg-indigo-500")
    const [xColor, setXColor] = useState("text-gray-400")

    useEffect(() => {
        if (props.addMode) {
            if (props.selected) {
                setDotStyle("bg-green")
                setTextStyle("text-green")
                setBorderStyle("border border-2 border-green")
                setXColor("text-green");
            } else {
                setBorderStyle("border border-gray-300")
                setTextStyle("text-green")
                setDotStyle("bg-green")
                setXColor("text-green");
            }
        } else if (!props.addMode && props.deleteMode) {
            if (props.selected) {
                setDotStyle("bg-red")
                setTextStyle("text-red")
                setBorderStyle("border border-2 border-red")
                setXColor("text-red");
            } else {
                setBorderStyle("border border-gray-300")
                setTextStyle("text-red")
                setDotStyle("bg-red")
                setXColor("text-red");
            }
        } else {
            if (props.selected) {
                setTextStyle("text-gray-900")
                setDotStyle("bg-indigo-500")
                setXColor("text-gray-400")
                setBorderStyle("border border-2 border-indigo-500")
            } else {
                setBorderStyle("border border-gray-300")
                setTextStyle("text-gray-900")
                setDotStyle("bg-indigo-500")
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
                <span className={"ml-3.5 text-xs font-medium text-gray-900 " + textStyle}>{props.item.name}</span>
                {(!props.deleteMode && !props.itemLock) && (
                    <span>
                        <XIcon className={"ml-1 w-4 h-4 "+xColor} onClick={() => props.removeItem(props.item)} />
                    </span>
                )}
            </button>
        </Fragment>
    )
}