import SettleProgress from "./user_settle_progress"
import SettleHubOptions from "./settle_hub_options"

export default function SettleHub() {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div className="px-4 pt-5 pb-2 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Settlement Status</h3>
            <div className="mt-1">
              <SettleProgress key="you" user_str="Your" progress="25%" tasks_complete={2} tasks_total={8}/>
              <SettleProgress key="partner" user_str="Partner's" progress="75%" tasks_complete={6} tasks_total={8}/>
            </div>
        </div>
        <div className="px-0 py-0 overflow-y-scroll overflow-x-hidden">{
          <SettleHubOptions/>
        }</div>
      </div>
    )
  }

// export default function Example() {
//     return (
//       <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
//         <h3 className="text-lg leading-6 font-medium text-gray-900">Job Postings</h3>
//         <p className="mt-1 text-sm text-gray-500">
//           Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
//         </p>
//       </div>
//     )
//   }