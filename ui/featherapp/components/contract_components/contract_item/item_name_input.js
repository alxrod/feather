import React, {useState, useEffect} from 'react'

const ItemNameInput = (props) => {
  const [width, setWidth] = useState(0);
  const [localVal, setLocalVal] = useState("")
  const [errorMsg, setErrorMsg] = useState()
  useEffect(() => {
    if (localVal === "") {
      setLocalVal(props.value)
      setWidth(Math.max(4*0.82, props.value.length*0.82));
    }
  }, [props.value])

  const changeHandler = e => {
    if (e.target.value.length > 15) {
      setErrorMsg("name must be less than 15 characters")
      return
    } else {
      setErrorMsg("")
    }
    setWidth(Math.max(4*0.82, e.target.value.length*0.82));
    setLocalVal(e.target.value)
    props.setValue(e.target.value)

  };
 
  return (
    <div>
      <div
        className={"relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-lg "}
      >
        <span className="absolute flex-shrink-0 flex items-center justify-center">
        <span
            className='bg-primary4 h-1.5 w-1.5 rounded-full'
            aria-hidden="true"
        />
        </span>
        <div>
          <input 
            type="text" 
            style={{ width: width +'ch'}}
            onChange={changeHandler} 
            disabled={props.disabled} 
            placeholder={"Item"}
            className="ml-3.5 font-medium text-gray-900 border-0 focus:border-0 focus:ring-0 p-0 text-xl"
            value={localVal}
          /> 
        </div>
      </div>
      {/* <div className="h-2">  */}
      {errorMsg !== "" && (
        <p className="text-xs text-red-400 w-full text-center">{errorMsg}</p>
      )}
      {/* </div> */}
    </div>
  )
};

export default ItemNameInput