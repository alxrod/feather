import React, {useState, useEffect, useMemo} from "react";
import { DeadlineFieldContext } from "../../contract/components/deadline/deadline_field";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sortDeadlines, genEmptyDeadline } from "../../contract/components/deadline/helpers";
import { ADMIN_TYPE } from "../../../services/user.service";

const DeadlineDisplayProvider = (props) => {
  const [selectedID, setSelectedID] = useState("")
  const [sortedDeadlines, setSortedDeadlines] = useState([])

  useEffect(() => {
    const deadlines = sortDeadlines(props.deadlines, ADMIN_TYPE)
    setSortedDeadlines(deadlines)
    if (selectedID === "" && deadlines.length > 0) {
      setSelectedID(deadlines[0].id)
    }
  }, [props.deadlines, props.role])

  const curDeadline = useMemo(() => {
    for (let i = 0; i < sortedDeadlines.length; i++) {
      if (sortedDeadlines[i].id === selectedID) {
        sortedDeadlines[i].idx = i
        return sortedDeadlines[i]
      }
    }
    return genEmptyDeadline(new Date())
  })

  return (
    <DeadlineFieldContext.Provider value={{
      sortedDeadlines, 
      curDeadline,
      selectedID,
      setSelectedID,
    }}>
      {props.children}
    </DeadlineFieldContext.Provider>
  )
}

const mapStateToProps = ({}) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(DeadlineDisplayProvider)