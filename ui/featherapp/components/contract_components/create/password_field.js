import { useEffect } from "react"
import { RefreshIcon } from "@heroicons/react/outline"

const PasswordField = (props) => {
    useEffect(() => {
      if (props.password === "") {
        props.setPassword(randomString(20, "#aA"))
      }
    }, [props.password])

    function randomString(length, chars) {
      var mask = '';
      if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
      if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (chars.indexOf('#') > -1) mask += '0123456789';
      if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
      var result = '';
      for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
      return result;
    }

    const newGenPassword = (e) => {
      e.preventDefault();
      props.setPassword(randomString(20, "#aA"))
    }

  
    return (
      <form action="#" className="relative flex flex-col">
        <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary4 focus-within:ring-1 focus-within:ring-primary4">
          <div className="flex flex-row">
            <div className="flex grow">
              <h1 className="text-lg text-primary6 font-medium pl-3 pr-3 py-3">Invite Password:</h1>
              <div className="relative grow">
                  <input
                      name="contract_password"
                      id="contract_password"
                      className="focus:ring-0 outline-0 w-full h-full pl-2 px-5 border-x border-gray-200"
                      type="text"
                      placeholder="set a password for your partner to accept"
                      value={props.password}
                      disabled={true}
                      onChange={(e) => {props.setPassword(e.target.value)}}
                  />
              </div>
            </div>
            <button onClick={newGenPassword} className="px-4">
              <RefreshIcon className="w-5 h-5 text-gray-400"/>
            </button>
          </div>
        </div>
      </form>
    )
  }
  
  export default PasswordField