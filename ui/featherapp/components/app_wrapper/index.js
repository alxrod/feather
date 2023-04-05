import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'

// Reducer Actions:
import { clearSelected } from "../../reducers/contract/dispatchers/contract.dispatcher";
import { clearChat } from "../../reducers/chat/dispatchers/chat.dispatcher"; 
import { setUser, pullUser, setRedirect } from "../../reducers/user/dispatchers/user.dispatcher";
import { setNavbar, toggleFromRegister } from "../../reducers/site/site.reducer";

const AppWrapper = (props) => {
  const router = useRouter()

  const [pullReq, setPullReq] = useState(true);
  const [reloadStripeEnables, setReloadStripeEnables] = useState(true)

  const STD_ROLE = 3
  const UNAUTH_ROLE = 1 
  const STD_UNAUTH_ROLE = 4

  const routes = {
    "^/$": UNAUTH_ROLE,
    "^/messages$": STD_ROLE,
    "^/contracts$": STD_ROLE,
  
    "^/contract/[^/]*$": STD_ROLE,
    "^/contract/create/[^/]*$": STD_ROLE,
    "^/contract/negotiate/[^/]*$": STD_ROLE,
    "^/contract/view/[^/]*$": STD_ROLE,
    "^/contract/settle/[^/]*$": STD_ROLE,
    "^/contract/invite/[^/]*/[^/]*$": STD_UNAUTH_ROLE,
    
    "^/figma/oauth-callback[^/]*$": STD_ROLE,
  
    "^/unknown$": STD_UNAUTH_ROLE,
    "^/unauth-contract$": UNAUTH_ROLE,
  
    "^/login$": UNAUTH_ROLE,
    "^/register$": UNAUTH_ROLE,
  
    "^/setup-payment$": STD_ROLE,
    "^/setup-payout$": STD_ROLE,
    "^/setup-profile-pic$": STD_ROLE,
    "^/setup-choice$": STD_ROLE,
  
    "^/profile$": STD_ROLE,
    "^/profile/onboarding-refresh$": STD_ROLE,
  
    "^/file-upload-test$": STD_ROLE,
    "^/asset-cache$": STD_ROLE,
  
    "^/forgot-password$": UNAUTH_ROLE,
    "^/reset-password$": UNAUTH_ROLE,
    
  }
  const select_routes = ["/contract/negotiate", "/contract/view", "/contract/settle", "/contract/create"]

  useEffect( () => {
    const route_base = "/"+router.pathname.split("/")[1]
    
    if (!select_routes.includes(route_base)) {
      props.clearSelected()
    }
    if (props.fromRegister && !(route_base === "/register" || route_base === "/setup-payment")) {
      props.toggleFromRegister(false)
    }
    if (props.isLoggedIn && props.chatRoomId !== "" && props.chatRoomId !== undefined) {
      props.clearChat(props.chatRoomId)
    }
    
    authRedirect(router.pathname)
  }, [router.pathname]);

  useEffect( () => {
    if (pullReq == true && props.user !== null) {
      setPullReq(false);
      props.pullUser().then(() => {
        setTimeout(() => {
          setPullReq(true)
        }, 10 * 60 * 1000)
      });
    }
  }, [pullReq, props.user, props.user?.id])
  

  const authRedirect = (wholepath) => {
    let match_found = false;
    let used_key = ""

    let user = props.user
    let creds;
    if (!user) {
      user = JSON.parse(localStorage.getItem("user"));
      creds = JSON.parse(localStorage.getItem("creds"));
      if (!user) {
        user = JSON.parse(sessionStorage.getItem("user"));
        creds = JSON.parse(sessionStorage.getItem("creds"));
      }
      
      if (user) {
        props.setUser(user, creds)
      }
    }

    for (let i = 0; i < Object.keys(routes).length; i++) {
      if (wholepath.match(Object.keys(routes)[i])) {
        match_found = true;
        used_key = Object.keys(routes)[i]
        break;
      }
    }

    if (user === null && routes[used_key] === STD_ROLE) {
      props.pullUser().then(
        () => {
          return true
        },
        () => {
          props.setRedirect(wholepath)
          router.push("/login")
          return false
        }
      )
    } else if (user !== null && routes[used_key] === UNAUTH_ROLE) {
      router.push("/contracts")
      return false
    }
    return true
  }

  useEffect(() => {
    if ((props.user?.buyerModeRequested && !props.user?.buyerModeEnabled) 
      || props.user?.workerModeRequested && !props.user?.workerModeEnabled && reloadStripeEnables) {
      
      setReloadStripeEnables(false)
      setTimeout(() => {
        props.pullUser(props.user.id).then(() => {
          setReloadStripeEnables(true)
        });
      }, 10 * 1000)
    }
  }, [
      props.user?.buyerModeRequested,
      props.user?.workerModeRequested,
      props.user?.buyerModeEnabled,
      props.user?.workerModeEnabled,
      reloadStripeEnables
  ])

  return (
    <div>
      {props.children}
    </div>
  )
}

const mapStateToProps = ({ user, site, stripe, chat, contract }) => ({
    chatRoomId: chat.roomId,
    user: user.user,
    isLoggedIn: user.isLoggedIn,
    fromRegister: site.fromRegister,
    clientSecret: stripe.clientSecret,
    curContract: contract.curContract,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  pullUser,
  setUser,
  setRedirect,
  setNavbar,
  clearSelected,
  clearChat,
  toggleFromRegister,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapper)
