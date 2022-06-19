const IntroMessage = (props) => {

  return (
    <form action="#" className="relative grow flex flex-col min-h-[250px]">
      <div className="flex flex-col grow border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <div className="grow flex flex-col">
        <h1 className="text-lg text-indigo-700 font-medium py-3 px-5">Write an Intro Message to get things started</h1>
          <div className="grow flex flex-col border-t border-gray-200 px-2 pt-4 pb-4 space-x-3 sm:px-3">
            <div className="w-full grow flex flex-col justify-start">
              <label htmlFor="description" className="sr-only">
               intro message
              </label>
              <textarea
                rows={2}
                name="intro_msg"
                id="intro_msg"
                className="block grow w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="pitch your contract to your partner..."
                value={props.message}
                onChange={(e) => {props.setMessage(e.target.value)}}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default IntroMessage