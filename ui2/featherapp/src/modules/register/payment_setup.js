/* This example requires Tailwind CSS v2.0+ */
import feather_logo from "../../style/logo/feather_logo.svg";
import DateField from "./date_field"
import CreditCardForm from "./credit_card_form"

export default function Example(props) {

  const handlePhaseChange = (e) => {
    props.setPhase("D")
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
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Setup Your Bank Account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                So you can get paid!
              </p>
            </div>
    
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <div className="w-full mr-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Full Name
                        </label>
                        <div className="mt-1">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        </div>
                    </div>

                    <div className="w-30">
                      <CreditCardForm/>
                    </div>
                  </div>

    
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handlePhaseChange}
                    >
                      Join Feather!
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