const ContractStep = (props) => {
  return (
    <div className={"w-full flex flex-col " + (props.reversed ? "lg:flex-row-reverse" : "lg:flex-row")}>
      <div className={"flex flex-col "}>
        <h1 className={ "text-6xl font-bree-serif sm:text-8xl xl:text-9xl " + (props.reversed ? "lg:text-right" : "")}>
          {props.number}
        </h1>
        <h2 className="text-2xl text-gray-500 w-[16rem] xl:w-[20rem]">
          <props.message/>
        </h2>
      </div>
      <props.img/>
    </div>
  )
}

export default ContractStep