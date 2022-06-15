import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ChatAlt2Icon } from '@heroicons/react/outline'


const LinkProof = (props) => {
  return (
    // <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5">
    //   <ul role="list" className="divide-y divide-gray-200">
    //       <li key="price">
    //         <div className="block hover:bg-gray-50">
    //           <div className="flex items-center px-4 py-4 sm:px-6">
    //             <div className="min-w-0 flex-1 flex items-center">
    //               <div className="flex-shrink-0">
    //                 <svg
    //                     className="mr-1.5 h-9 w-9 flex-shrink-0 text-gray-400"
    //                     fill="none"
    //                     viewBox="0 0 34 34"
    //                     stroke="currentColor"
    //                     aria-hidden="true"
    //                 >
    //                     <path
    //                     vectorEffect="non-scaling-stroke"
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                     strokeWidth={2}
    //                     d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z"
    //                     />
    //                 </svg>
    //               </div>
    //               <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-1 md:gap-4">
    //                 <div>
    //                   <p className="text-base font-medium text-gray-700 truncate">Platform: Tiktok</p>
    //                   <p className="text-base font-medium text-gray-500">Your Account, <b className="font-medium text-gray-700">lauralamanda</b> has <b className="font-medium text-gray-700">215.5k</b> followers</p>
    //                 </div>

    //               </div>
    //             </div>
                
    //             <div>
    //               <ChatAlt2Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    //             </div>
    //           </div>
              
    //         </div>
    //       </li>
    //   </ul>
    // </div>
    <div className="bg-white shadow sm:rounded-lg w-full mt-5">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-row items-center">

          <svg
              className=" h-9 w-9 flex-shrink-0 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 34 34"
              stroke="currentColor"
              aria-hidden="true"
          >
              <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z"
              />
          </svg>
          

          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upload the Link to Your TikTok</h3>
            <div className="mt-1 max-w-xl text-sm text-gray-500">
              <p>Share the link to your post so your partner (and us) can insure your content.</p>
            </div>
          </div>

        </div>
        <form className="mt-5 sm:flex sm:items-center">
          <div className="w-full">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <input
              type="text"
              name="link"
              id="link"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="https://thelinktoyourcontent"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = ({ }) => ({
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkProof)