import React, {useState, useEffect, Fragment} from 'react';

import Image from 'next/image'

import MainFrame from '../public/landing_page/main_frame.png';
import InviteFrame from '../public/landing_page/invite_frame.png';
import ChatFrame from '../public/landing_page/chat_frame.png';
import FigmaFrame from '../public/landing_page/figma_frame.png';
import ReviewFrame from '../public/landing_page/review_frame.png';
import CompleteFrame from '../public/landing_page/complete_frame.png';

import ContractStep from "../components/landing_page/contract_step.js";

import FadeInAnimation from "../components/fade_in";

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
      <FadeInAnimation wrapperElement="div">
        <div className="grow max-h-[80vh] flex justify-end">
          <Image className="h-full" src={InviteFrame} alt="invite frame"/>
        </div>
      </FadeInAnimation>
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
      <FadeInAnimation wrapperElement="div">
        <div className="grow max-h-[80vh] flex justify-start">
          <Image className="h-full" src={ChatFrame} alt="chat frame" />
        </div>
      </FadeInAnimation>
    ),
  },
  {
    id: 3,
    number: "03",
    message: () => {
      return (
        <>
          Bring your contracts into Figma with our  <b className="text-primary6">custom widget</b>
        </>
      )
    },
    reversed: false,
    img: () => (
      <FadeInAnimation wrapperElement="div">
        <div className="grow max-h-[80vh] flex justify-start">
          <Image className="h-full" src={FigmaFrame} alt="chat frame" />
        </div>
      </FadeInAnimation>
    ),
  },
  {
    id: 4,
    number: "04",
    message: () => {
      return (
        <>
          Then review the drafts all organized with the according to the <b className="text-primary6">contract structure</b>
        </>
      )
    },
    reversed: true,
    img: () => (
      <FadeInAnimation wrapperElement="div">
        <div className="grow max-h-[80vh] flex justify-start">
          <Image className="h-full" src={ReviewFrame} alt="chat frame" />
        </div>
      </FadeInAnimation>
    ),
  },
  {
    id: 5,
    number: "05",
    message: () => {
      return (
        <>
          Set deadlines and <b className="text-primary6">get paid</b> when uploading drafts
        </>
      )
    },
    reversed: false,
    img: () => (
      <FadeInAnimation wrapperElement="div">
        <div className="grow max-h-[80vh] flex justify-end">
          <Image className="h-full" src={CompleteFrame} alt="complete frame" />
        </div>
      </FadeInAnimation>
    ),
  },
  {
    id: 6,
    number: "06",
    message: () => {
      return (
        <>
          Create your first contract with Feather today! No middleman, just <b className="text-primary6">transparency</b>
        </>
      )
    },
    reversed: false,
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
          <FadeInAnimation wrapperElement="div">
            <div className="max-w-6xl flex flex-col-reverse items-center lg:items-start lg:flex-row pt-10 sm:pt-20 pb-32 sm:pb-40">
              <div>
                <div className="max-w-md lg:mt-10">
                  <h1 className="text-4xl font-bree-serif tracking-tight text-center sm:text-left sm:text-6xl">
                    Contracts designed for <b className="text-primary6">your workflow</b>
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
              <div className="w-[90vw] md:w-[70vw] lg:w-[60vw] ">
                <Image
                    src={MainFrame}
                    alt="Product screenshot"
                    className="w-full"
                />
              </div>
            </div>
          </FadeInAnimation>
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