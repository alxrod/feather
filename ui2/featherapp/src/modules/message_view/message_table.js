import {get_style_code, OPN, NEG, EXP} from "../../custom_encodings"
import { Link } from 'react-router-dom'

const messages = [
  {
    name: 'Nutraworks: Vegan Preworks',
    descript: 'Instagram Story Campaign',
    deadline: 'Due 10:00am June 12, 2022',
    email: 'business.dev@nutraworks.com',
    status: OPN,
    price: '$250.00',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Alexs Custom Ts',
    descript: '30s Tiktok Campaign',
    deadline: 'Due 9:00am June 21, 2022',
    email: 'alex.customtees@gmail.com',
    status: NEG,
    price: '$100.00',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'The ProdRod Seltzer',
    descript: 'Instagram Post, Beverages Supplied',
    deadline: 'Due 5:00pm June 3, 2022',
    email: 'paul@rodseltezer.com',
    status: EXP,
    price: '$75.00',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
// const messages = []

export default function Example() {

  const render_status = (stat) => {
    var classes = "inline-flex items-center m-auto px-2 py-0 rounded-full " + get_style_code(stat) 
    return (
      <div className={classes}>
        <p className="text-white">{stat}</p>
      </div>
    )
  }

  const no_messages = messages.length == 0 ? true : false;
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
          <p className="mt-2 text-sm text-gray-700">
            All your invitations to messages.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                {!no_messages && (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Business
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Details
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Price
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {messages.map((message) => (
                        <tr key={message.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={message.image} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{message.name}</div>
                                <div className="text-gray-500">{message.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{message.descript}</div>
                            <div className="text-gray-500">{message.deadline}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="flex">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-sm font-semibold leading-5 text-green-800">
                                {render_status(message.status)}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{message.price}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <Link to="/negotiate" className="text-indigo-600 hover:text-indigo-900">
                              View 
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                

                {no_messages && (
                  
                  <div className="flex justify-center min-h-[50vh] flex-col">
                     <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Deadline
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Price
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    </tbody>
                  </table>
                     <h1 className="m-auto text-4xl text-gray-300 font-light pb-5">You haven't accepted or created any contracts yet.</h1>
                  </div>
                //   <tbody className="divide-y divide-gray-200 bg-red min-w-full">
                //     <tr className="min-h-[50vh]">
                //       <td>
                       
                //       </td>
                //     </tr>
                //   </tbody>
                )}
                
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}