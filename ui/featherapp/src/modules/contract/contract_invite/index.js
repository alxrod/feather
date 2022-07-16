/* This example requires Tailwind CSS v2.0+ */
import feather_logo from "../../../style/logo/feather_logo.svg";
import { DocumentIcon, CurrencyDollarIcon, CalendarIcon } from '@heroicons/react/outline'

const features = [
  {
    name: 'Summary',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: DocumentIcon,
  },
  {
    name: 'Price',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Deadline',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CalendarIcon,
  },
]

export default function Example() {
  return (
    <div className="py-24 px-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:justify-center lg:text-center">
          <img
            className="hidden lg:block h-12 w-auto mb-4"
            src={feather_logo}
            alt="Workflow"
          />
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900">
            Contract Title
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            @Alex has invited you to a contract. To claim this contract and begin negotiating, you have to log in or register.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}