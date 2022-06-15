/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react';
import feather_logo from "../../style/logo/feather_logo.svg";

export default function Example(props) {
    const [showInsta, setShowInsta] = useState(false)
    const [showTiktok, setShowTiktok] = useState(false)

    const handleCheckInsta = (e) => {
        setShowInsta(true)
    }

    const handleCheckTiktok = (e) => {
        setShowTiktok(true)
    }

    const handlePhaseChange = (e) => {
      props.setPhase("B")
    }
  
    return (
        <>
          {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-gray-50">
            <body class="h-full">
            ```
          */}
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="mx-auto h-12 w-auto"
                src={feather_logo}
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connect Your Social Accounts</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                So we can verify your identity and keep everyone safe.
              </p>
            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                  <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700">
                      Instagram Username
                    </label>
                    <div className="mt-1">
                      <div className="flex">
                        <input
                            id="insta"
                            name="insta_username"
                            type="text"
                            className="appearance-none block w-full mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                        className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleCheckInsta}
                        >Check</button>
                      </div>
                        {showInsta && (
                            <div>
                                <p className="mt-2 text-center text-sm text-gray-600">We should have just DMed you a code, enter it here!</p>
                                <div className="flex mt-3 justify-center">
                                    <div className="flex">
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                  </div>    


                  <div>
                    <label htmlFor="tiktok" className="block text-sm font-medium text-gray-700">
                      Tiktok Username
                    </label>
                    <div className="mt-1">
                      <div className="flex">
                        <input
                            id="tiktok"
                            name="tiktok_username"
                            type="text"
                            required
                            className="appearance-none block w-full mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button
                        className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleCheckTiktok}
                        >Check</button>
                      </div>
                        {showTiktok && (
                            <div>
                                <p className="mt-2 text-center text-sm text-gray-600">We should have just DMed you a code, enter it here!</p>
                                <div className="flex mt-3 justify-center">
                                    <div className="flex">
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        <input
                                                id="auth_code_1"
                                                name="auth_code_1"
                                                type="text"
                                                required
                                                className="appearance-none block w-9 mr-3 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                  </div>
                  <br/>
    
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handlePhaseChange}
                    >
                      Continue to Payments Setup
                    </button>
                  </div>
                </form>
                <br/>
              </div>
              
            </div>
          </div>
        </>
    )
}