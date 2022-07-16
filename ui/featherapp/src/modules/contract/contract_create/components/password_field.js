const PasswordField = (props) => {

    return (
      <form action="#" className="relative flex flex-col">
        <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <div className="flex flex-row">
            <h1 className="text-lg text-indigo-700 font-medium pl-3 mr-1 py-3">Invite Password:</h1>
            <div className="relative grow">
                <input
                    name="contract_password"
                    id="contract_password"
                    className="border-none focus:ring-0 outline-0 w-full h-full pl-2 px-5 "
                    type="text"
                    placeholder="set a password for your partner to accept"
                    value={props.password}
                    onChange={(e) => {props.setPassword(e.target.value)}}
                />
            </div>

          </div>
        </div>
      </form>
    )
  }
  
  export default PasswordField