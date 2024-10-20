import React from 'react'

export default function Loader(props) {

    return props.show && (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
            <div className="loader animate-spin rounded-full border-t-4 border-b-4 border-green-500 w-16 h-16"></div>
        </div>
    )
}
