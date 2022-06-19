/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon, XIcon, ChevronRightIcon,} from '@heroicons/react/solid'
import { ClockIcon } from "@heroicons/react/outline"
import TextTag from "../tag_in_text"
import {ITEM_APPROVED, ITEM_REJECTED, ITEM_PENDING} from "../../../../custom_encodings"
import SettleOption from "./settle_option_selection"
const items = [
  {
    key: 1,
    name: "Item 1",
    description: "The video should be at least 30 seconds with no other included products.",
    yourStatus: ITEM_APPROVED,
    partnerStatus: ITEM_PENDING,
    href: '#',
  },
  {
    key: 2,
    name: "Item 2",
    description: "The video should be at least 30 seconds with no other included products.",
    yourStatus: ITEM_APPROVED,
    partnerStatus: ITEM_APPROVED,
    href: '#',
  },
  {
    key: 3,
    name: "Item 3",
    description: "The video should be at least 30 seconds with no other included products.",
    yourStatus: ITEM_APPROVED,
    partnerStatus: ITEM_REJECTED,
    href: '#',
  },
  {
    key: 4,
    name: "Item 4",
    description: "The video should be at least 30 seconds with no other included products.",
    yourStatus: ITEM_PENDING,
    partnerStatus: ITEM_PENDING,
    href: '#',
  },
  
]

export default function Example() {
  return (
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.key}>
            <div className="block hover:bg-gray-50">
              <div className="flex items-center px-2 py-4">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4">
                    <div className="col-span-2 flex items-center">
                      <TextTag tagName={item.name}/>
                      <p className="ml-2 flex items-center text-xs text-gray-500">
                        {(item.partnerStatus == ITEM_PENDING) && (
                          <>
                            <ClockIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-gray-600" aria-hidden="true" />
                            <b className="font-normal">Your partner has not decided this item</b>
                          </>
                          
                        )}
                        {(item.partnerStatus == ITEM_APPROVED) && (
                          <>
                            <CheckIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-green" aria-hidden="true" />
                            <b className="font-normal text-green">Your partner has approved this item</b>
                          </>
                        )}
                        {(item.partnerStatus == ITEM_REJECTED) && (
                          <>
                            <XIcon className="flex-shrink-0 mr-1.5 h-3.5 w-3.5 text-red" aria-hidden="true" />
                            <b className="font-normal text-red">Your partner has rejected this item</b>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <SettleOption/>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
  )
}