import { Fragment } from 'react'

export default (props) => {
    const unlabeled = (props.label.type == 0)
    return (
        <Fragment key="1">
            {!unlabeled && (
                <>
                    <p className="mt-0.5 text-sm text-gray-500 mr-1">on</p>
                    <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                        <span className="absolute flex-shrink-0 flex items-center justify-center">
                        <span
                            className='bg-indigo-500 h-1.5 w-1.5 rounded-full'
                            aria-hidden="true"
                        />
                        </span>
                        <span className="ml-3.5 font-medium text-gray-900">{props.label.name}</span>
                    </div>
                </>
            )}
        </Fragment>
    )
}