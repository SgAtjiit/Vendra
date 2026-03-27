import React from 'react'

const Footer = () => {
  return (
  
      <footer className="mt-20 p-20 bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-center md:text-left">
              <h5 className="text-lg font-semibold">Vendra</h5>
              <p className="text-sm mt-2">
                © {new Date().getFullYear()} Vendra. All rights reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Made with ❤️ by <span className="text-teal-400 font-medium">Shrish Gupta</span>
              </p>
            </div>
            <div className="text-center mt-4 md:mt-0">
              <ul className="flex justify-center space-x-4">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/" className="hover:underline">About</a></li>
                <li><a href="/" className="hover:underline">Services</a></li>
                <li><a href="/" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
   
  )
}

export default Footer