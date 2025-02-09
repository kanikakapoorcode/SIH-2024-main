import React from "react";
import { Link } from "react-router-dom";

import { LiaUniversitySolid } from "react-icons/lia";
const Footer = () => {
  return (
    

<footer class="bg-[#0f4b8a]">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            <Link to="/" className=" p-4 hover:bg-[#155396] rounded-md flex"> 
            <LiaUniversitySolid className='inline-block text-white w-12 h-12'/> 
                  <span class="self-center text-2xl font-bold text-white  whitespace-nowrap ">U.I.W.A</span>
            </Link>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
              {/* <div>
                  <h2 class="mb-4  text-md p-2   text-white font-bold uppercase ">Resources</h2>
                  <ul class="text-gray-300 dark:text-gray-400 font-medium">
                      <li class="mb-4 ">
                          <a href="https://flowbite.com/" class=" p-2 hover:bg-[#00bbf1] transition ease-in-out hover:text-white rounded-md">Flowbite</a>
                      </li>
                      <li className="">
                          <a href="https://tailwindcss.com/" class=" p-2 hover:bg-[#00bbf1] transition ease-in-out hover:text-white rounded-md">Tailwind CSS</a>
                      </li>
                  </ul>
              </div> */}
              <div>
                  <h2 class="mb-4  text-md p-2  text-white font-bold uppercase ">Follow us</h2>
                  <ul class="text-gray-300 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                          <a href="https://github.com/themesberg/flowbite" class=" p-2 hover:bg-[#00bbf1] transition ease-in-out hover:text-white rounded-md ">Github</a>
                      </li>
                      <li>
                          <a href="https://discord.gg/4eeurUVvTy" class=" p-2 hover:bg-[#00bbf1] transition ease-in-out hover:text-white rounded-md">Discord</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 class="mb-4  text-md  p-2 text-white font-bold uppercase ">Legal</h2>
                  <ul class="text-gray-300 dark:text-gray-400 font-medium">
                      {/* <li class="mb-4">
                          <a href="#" class=" p-2 hover:bg-[#00bbf1] transition ease-in-out hover:text-white rounded-md">Privacy Policy</a>
                      </li> */}
                      <li>
                          <a href="#" class=" p-2 hover:bg-[#00bbf1] transition ease-in-out hover:text-white rounded-md">Terms &amp; Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class=" text-md text-gray-300 sm:text-center dark:text-gray-400">© 2024 U.I.W.A™. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
             
              <a href="#" class="text-gray-300 hover:text-[#00bbf1] font-bold dark:hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span class="sr-only">GitHub account</span>
              </a>
              
          </div>
      </div>
    </div>
</footer>

  );
};

export default Footer;
