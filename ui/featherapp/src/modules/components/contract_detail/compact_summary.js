import React, { useState } from 'react';
import { StarIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/outline'
import PriceField from "./price_field";
import DeadlineField from "./deadline_field";

 const CompactSummary = (props) => {
    return (
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex">
            <div className="mr-4 flex-shrink-0">
              <img
                className="inline-block h-16 w-16 rounded-md"
                src="https://images.prismic.io/athletic-greens-new/5394a6dc-0a11-4ea5-80ac-95be8893dd98_structured-data-pouch.png?auto=compress,format&rect=0,0,1000,1000&w=1000&h=1000"
                alt=""
              />
            </div>
            <div classname="flex flex-col">
              <div>
                <h4 className="text-base font-bold">Summary</h4>
                <p className="mt-1 text-sm">
                  Nutrawork is a vegan, plant based preworkout that is meant to help you 
                  get the best workout and diet all at once. For their influencer ad campaign, 
                  they want fitness influencers to film 30 second tiktok's summarzing a workout 
                  while including drinking a Nutrawork product. 
                </p>
              </div>
              <div className="flex items-center px-0 py-4 sm:px-0">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      <CurrencyDollarIcon className="flex-shrink-0 text-gray-800 font-extralight mr-1.5 h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1 px-3 md:grid md:grid-cols-1 md:gap-4">
                      <div>
                        <h1>{props.price_str}<b className="font-light text-gray-500">{' USD'}</b></h1>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      <CalendarIcon className="flex-shrink-0 text-gray-800 font-extralight mr-1.5 h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1 px-3 md:grid md:grid-cols-1 md:gap-4">
                      <div>
                        <h1>{props.deadline_str}</h1>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CompactSummary;
  