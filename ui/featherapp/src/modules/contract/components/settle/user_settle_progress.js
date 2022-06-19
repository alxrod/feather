const SettleProgress = (props) => {
  return (
    <div>
      <h4 className="sr-only">Status</h4>
      <div aria-hidden="true">
        <div className="flex flex-row">
          <div className="pb-1 mr-1">
            <h3 className="text-gray-600">{props.user_str} Progress</h3>
          </div>
          <div className="grow flex flex-col">
            <div className="grow"></div>
            <div className=" bg-gray-200 rounded-full overflow-hidden">
              <div className="h-1.5 bg-indigo-600 rounded-full" style={{ width: props.progress }} />
            </div>
            <div className="grow"></div>
          </div>
          <div className="pb-1 ml-1">
            <h3 className="text-gray-600 text-xs"><b className="text-normal text-base text-indigo-600">{props.tasks_complete}</b>/{props.tasks_total}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettleProgress