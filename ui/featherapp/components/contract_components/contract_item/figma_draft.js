import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useMemo} from "react"
import Iframe from 'react-iframe'

const FigmaDraft = (props) => {
  const embedUrl = useMemo(() => {
    return "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F"+
    props.curContract.figmaFileKey+
    "%3Fnode-id%3D"+props.item_info.figmaComponentId
  })
  return (
    <Iframe 
      url={embedUrl}
      width="100%"
      id="myId"
      height="400px"
      scrolling="no"
      allowFullScreen={false}
    />
  )
}


const mapStateToProps = ({ user, contract, items }) => ({
  curItems: items.items,
  contractItemsChanged: items.itemsChanged,
  user: user.user,
  curContract: contract.curContract,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  
}, dispatch)

export default connect(
		mapStateToProps,
		mapDispatchToProps
)(FigmaDraft)