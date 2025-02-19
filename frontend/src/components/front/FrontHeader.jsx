'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ChevronDownIcon, MagnifyingGlassIcon ,ShoppingBagIcon, UserIcon} from '@heroicons/react/24/outline';
import NavBarItems from "../../Data/NavMenu"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white ">
       <p className="flex h-10 items-center justify-center bg-rose-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
       Use code BMC20 Get Flat 20% Discount, Call / Whatsapp us 9990026799
        </p>
      <nav aria-label="Global" className="mx-auto max-w-max flex  items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1 lg:mr-5">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Book My Cake</span>
            <img
              alt=""
              src="assets/logo.jpg"
              className="h-full w-full"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
        <div className="flex lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-3">
                  <a href="#" className="text-sm p-2 font-medium text-gray-700 hover:text-gray-800">
                    <UserIcon aria-hidden='true' className='size-6 text-rose-600'/>
                  </a>
              
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6 text-rose-600" />
                  </a>
              
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
            
            </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-6">
          {NavBarItems.map((item) => (
            <Popover key={item.id} className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                {item.label}
                {item.subItems && <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />}
              </PopoverButton>
              {item.subItems && (
                <PopoverPanel className="absolute top-full z-10 mt-3 w-48 bg-white shadow-lg rounded-lg p-2">
                  {item.subItems.map((sub) => (
                    <a key={sub.id} href={sub.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {sub.label}
                    </a>
                  ))}
                </PopoverPanel>
              )}
            </Popover>
          ))}
        </PopoverGroup>
       
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-3">
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    <UserIcon aria-hidden='true' className='size-6 text-rose-600'/>
                  </a>
              
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6 text-rose-600" />
                  </a>
              
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
            
            </div>
        {/* <div className="flex lg:flex-1">
       <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6 text-rose-600" />
                  </a>
          
        </div> */}
          {/* <div className="ml-4 flow-root lg:ml-2">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div> */}
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Book My Cake</span>
              <img
                alt=""
                src="public\assets\logo.jpg"
                className="h-15 w-30"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          
          <div className="mt-6">
            {NavBarItems.map((item) => (
              <Disclosure key={item.id} as="div" className="mb-2">
                <DisclosureButton className="flex w-full justify-between px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100">
                  {item.label}
                  {item.subItems && <ChevronDownIcon className="size-5 text-gray-400" />}
                </DisclosureButton>
                {item.subItems && (
                  <DisclosurePanel className="mt-1 space-y-1 pl-4">
                    {item.subItems.map((sub) => (
                      <a key={sub.id} href={sub.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {sub.label}
                      </a>
                    ))}
                  </DisclosurePanel>
                )}
              </Disclosure>
            ))}
          </div>
          
        </DialogPanel>
        
      </Dialog>
      
    </header>
  );
}
