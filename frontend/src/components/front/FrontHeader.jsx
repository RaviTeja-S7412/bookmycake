'use client';

import { useEffect, useState } from 'react';
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
import {
  Bars3Icon, XMarkIcon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon
} from '@heroicons/react/24/outline';
import NavBarItems from "../../Data/NavMenu"
import { useNavigate } from 'react-router-dom';
import axiosIntance from '../axios';

export default function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItems, setMenuitems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getMenuItems = async () => {
      const res = await axiosIntance.get(`/admin/get_navigationmenu`);
      if (res.status === 200) {
        setMenuitems(res.data.menu_items);
      }
    };
    getMenuItems();
  }, []);

  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between px-6 py-4 gap-6 flex-wrap">
        {/* Left: Logo + City */}
        <div className="flex items-center gap-4 min-w-[200px]">
          <img src="/assets/logo.jpg" alt="Logo" className="w-35" />
          <select className="border rounded px-2 py-1 text-sm">
            <option>Select City</option>
            <option>Delhi</option>
            <option>Mumbai</option>
          </select>
        </div>

        {/* Middle: Search */}
        <div className="flex-grow max-w-[500px] relative">
          <input
            type="text"
            placeholder="Search for cakes, occasion, flavor and more"
            className="w-full border rounded-full pl-10 pr-4 py-2 text-sm"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Right: Support + Icons */}
        <div className="flex items-center gap-4 min-w-[250px] justify-end">
          <div className="text-xs text-right leading-tight">
            <div className="font-semibold">24/7 Support Center</div>
            <div className="text-black font-bold text-sm">+91 9560804758</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs">Track Order</span>
            <ShoppingBagIcon className="h-5 w-5 text-gray-700 cursor-pointer" />
            <div className="flex items-center gap-1 cursor-pointer">
              <UserIcon className="h-5 w-5 text-gray-600" />
              <span className="text-xs text-rose-600 font-medium">Login/Signup</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Menu (Categories) */}
      <nav className="flex justify-center gap-6 text-sm font-medium text-gray-700 px-6 py-3 border-t">
        <PopoverGroup className="flex gap-4">
          {menuItems.map((item) => (
            <Popover key={item.id} className="relative">
              <PopoverButton
                className="flex items-center gap-1 hover:text-rose-600 focus:outline-none"
                onClick={(e) => item.subItems.length === 0 && navigate('/collections/' + item.path)}
              >
                {item.label}
                {item.subItems.length > 0 && (
                  <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                )}
              </PopoverButton>
              {item.subItems.length > 0 && (
                <PopoverPanel className="absolute top-full z-10 mt-2 bg-white shadow-md rounded p-2 w-48">
                  {item.subItems.map((sub) => (
                    <a
                      key={sub.id}
                      href="#"
                      onClick={() => navigate('/collections/' + item.path + '/' + sub.path)}
                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                    >
                      {sub.label}
                    </a>
                  ))}
                </PopoverPanel>
              )}
            </Popover>
          ))}
        </PopoverGroup>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Book My Cake</span>
              <img
                alt="Logo"
                src="assets/logo.jpg"
                className="h-15 w-30"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700">
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
                      <a key={sub.id} href={sub.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline">
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

      {/* Mobile menu icon for smaller screens */}
      <div className="lg:hidden flex items-center justify-between px-6 py-4">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
