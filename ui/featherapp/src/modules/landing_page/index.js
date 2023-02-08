import React, {useState, useEffect, Fragment} from 'react';
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Dialog } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import MainFrame from './landing_page_assets/main_frame.png';
import InviteFrame from './landing_page_assets/invite_frame.png';
import ChatFrame from './landing_page_assets/chat_frame.png';
import CompleteFrame from './landing_page_assets/complete_frame.png';

import Arrow1 from './landing_page_assets/arrow1.png';
import Arrow2 from './landing_page_assets/arrow2.png';

import ContractStep from "./features/contract_step.js";

const features = [
  {
    id: 1,
    number: "01",
    message: () => {
      return (
        <>
          <b className="text-primary6">Send</b> and <b className="text-primary6">receive links</b> for seamless contract negotiations
        </>
      )
    },
    reversed: false,
    img: () => (
      <div className="grow max-h-[80vh] flex justify-end">
        <img className="h-full" src={InviteFrame} />
      </div>
    ),
  },
  {
    id: 2,
    number: "02",
    message: () => {
      return (
        <>
          Negotiate using our integrated chat in <b className="text-primary6">real time</b>
        </>
      )
    },
    reversed: true,
    img: () => (
      <div className="grow max-h-[80vh] flex justify-start">
        <img className="h-full" src={ChatFrame} />
      </div>
    ),
  },
  {
    id: 3,
    number: "03",
    message: () => {
      return (
        <>
          Set deadlines and <b className="text-primary6">get paid</b> when uploading drafts
        </>
      )
    },
    reversed: false,
    img: () => (
      <div className="grow max-h-[80vh] flex justify-end">
        <img className="h-full" src={CompleteFrame} />
      </div>
    ),
  },
  {
    id: 4,
    number: "04",
    message: () => {
      return (
        <>
          Create your first contract with Feather today! No middleman, just <b className="text-primary6">transparency</b>
        </>
      )
    },
    reversed: true,
    img: () => (
      <div className="grow max-h-[80vh] flex justify-end">
      </div>
    ),
  }
]
const LandingPage = (props) => {

  return (
    <div>
      <div>
        <div className="relative px-6 lg:px-8 flex justify-center">
          <div className="max-w-6xl flex flex-col-reverse items-center lg:items-start lg:flex-row pt-10 sm:pt-20 pb-32 sm:pb-40">
            <div>
              <div className="max-w-md lg:mt-10">
                <h1 className="text-4xl font-bree-serif tracking-tight text-center sm:text-left sm:text-6xl">
                  Create contracts you can <b className="text-primary6">trust</b>
                </h1>
                <div className="mt-8 flex justify-center sm:justify-start">
                  {/* <a
                    href="/register"
                    className="inline-block rounded-lg bg-primary4 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-primary4 hover:bg-primary5 hover:ring-primary5"
                  >
                    Get started{' '}
                    <span className="text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </a> */}
                </div>
              </div>
            </div>
            <div className="max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] ">
              <img
                  src={MainFrame}
                  alt="Product screenshot"
                  className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="mx-8 sm:mx-16 xl:mx-0 max-w-5xl xl:max-w-6xl">
          {features.map((feature) => (
            <Fragment key={feature.number}>
              <ContractStep 
                number={feature.number}
                message={feature.message}
                reversed={feature.reversed}
                img={feature.img}
              />
              <br/>
              <div className="w-full flex justify-center">
                {feature.id == 1 ? (
                  <></>
                ) : (
                  <></>
                )}
              </div>
            </Fragment> 
          ))
        }
        </div>
      </div>
      <div className="h-[300px]"/>

    </div>
  )
}

// const mapStateToProps = ({ counter }) => ({
//     count: counter.count,
//     isIncrementing: counter.isIncrementing,
//     isDecrementing: counter.isDecrementing,
// })

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//     increment,
//     incrementAsync,
//     decrement,
//     decrementAsync,
//     changePage: () => push('/about-us')
// }, dispatch)

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Home)
export default LandingPage