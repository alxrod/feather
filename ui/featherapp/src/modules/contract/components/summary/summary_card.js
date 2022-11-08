import React, { useState } from 'react';
import { StarIcon, } from '@heroicons/react/outline'


 const SummaryCard = (props) => {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex">
            <div>
              <h4 className="text-base font-bold">{props.title}</h4>
              <p className="mt-1 text-sm">
                <b className="font-semibold text-gray-900">Contract Summary:</b> {props.summary}
              </p>
            </div>
          </div>
        </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6 flex justify-end">
            <div className="flex items-center">  
              <StarIcon className="flex-shrink-0 mr-1.5 h-3 w-3 text-gray-900" aria-hidden="true" />
              <p className="text-sm m-0, p-0">Trustworthy: <b className="font-semibold text-gray-900">4.8</b>/5.0</p>
            </div>
          </div>
      </div>
    )
}

export default SummaryCard
  