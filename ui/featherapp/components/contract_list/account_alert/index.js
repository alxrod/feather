import {useState, useMemo } from "react"
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

import { useRouter } from 'next/router'

const AccountAlert = (props) => {
  const router = useRouter()

  const textColor = useMemo(() => {
    if (props.level === 3) {
      return "text-red-800"
    } else if (props.level === 2) {
      return "text-yellow-800"
    } else {
      return "text-primary6"
    }
  })
  const bgColor = useMemo(() => {
    if (props.level === 3) {
      return "bg-red-100"
    } else if (props.level === 2) {
      return "bg-yellow-100"
    } else {
      return "bg-primary1"
    }
  })
  const borderColor = useMemo(() => {
    if (props.level === 3) {
      return "border-red-800"
    } else if (props.level === 2) {
      return "border-yellow-800"
    } else {
      return "border-primary7"
    }
  })

  return (
    <div className={"relative flex justify-center py-3 " + bgColor}>
      <div className="flex justify-center gap-y-2 gap-x-4">
        <p className={"text-sm leading-6 " + textColor}>
          <strong className="font-semibold">{props.messageType}</strong>
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          {props.message}
          <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
            <circle cx={1} cy={1} r={1} />
          </svg>
          <a 
            className={"font-semibold cursor-pointer px-3 py-1 border rounded-lg " + borderColor} 
            onClick={() => {router.push( (props.customLink ? props.customLink : "/profile") )}}
          >
            FIX
          </a>
        </p>
      </div>
    </div>
  )
}


const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountAlert)