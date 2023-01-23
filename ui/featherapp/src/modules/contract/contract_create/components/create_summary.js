import SearchUser from "./search_user.js"
import React, {useState} from "react"

const CreateSummary = (props) => {
  const [descript, setDescript] = useState("")

  return (
    <form action="#" className="relative flex grow flex-col min-h-[250px]">
      <div className="flex flex-col grow border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-primary4 focus-within:ring-1 focus-within:ring-primary4">
        <div className="px-6 py-2">
          <SearchUser/>
        </div>
        

        <div className="grow flex flex-col bg-white">
          <div className="grow flex flex-col border-t border-gray-200 px-2 pt-2 pb-4 space-x-3 sm:px-3">
            <div className="w-full grow flex flex-col justify-start">
              <label htmlFor="title" className="sr-only">
                title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
                className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
                placeholder="Give it a title..."
              />
              <label htmlFor="description" className="sr-only">
               description
              </label>
              <textarea
                rows={2}
                name="description"
                id="description"
                className="block grow w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="and a short description"
                value={props.descript}
                onChange={(e) => props.setDescript(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
export default CreateSummary