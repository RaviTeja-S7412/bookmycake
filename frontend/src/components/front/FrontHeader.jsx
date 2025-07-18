'use client';

import { use, useEffect, useState } from 'react';

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
  Bars3Icon, XMarkIcon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, EnvelopeIcon, PhoneIcon
} from '@heroicons/react/24/outline';
import NavBarItems from "../../Data/NavMenu";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosIntance from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../redux/actions/front/cart.actions';
import { cartConstants } from '../../redux/actions/constants';

export default function HomeHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuItems, setMenuitems] = useState([]);
  const [openPopover, setOpenPopover] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)

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
    <header className="bg-white font-[Poppins]">
      <div className="flex items-center justify-between py-4 gap-6 flex-wrap default-width">
        {/* Left: Logo + City */}
        <div className="flex justify-center w-full sm:w-[unset] items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/assets/logo.jpg" alt="Logo" />
        </div>

        {/* Middle: Search */}
        <div className="flex-grow max-w-[500px] relative">
          <input
            type="text"
            placeholder="Search for cakes, occasion, flavor and more"
            className="w-full border rounded-full pl-10 pr-4 py-2 text-sm"
            value={searchParams?.get('search') ? searchParams?.get('search') : ''}
            onChange={(e) => navigate('/collections?search='+e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Right: Support + Icons */}
        <div className="flex items-center gap-4 min-w-[250px] justify-end">
          <div className="text-xs text-left leading-tight">
            <div className="flex text-black font-bold text-sm items-center mb-2"><EnvelopeIcon className='h-5 w-5 mr-2' />info@bookmycake.com</div>
            <div className="flex text-black font-bold text-sm items-center"><PhoneIcon className='h-5 w-5 mr-2' />+91 9990026799</div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs">Track Order</span>
            <div className='relative'>
              <ShoppingBagIcon className="h-7 w-7 text-gray-700 cursor-pointer" onClick={() => {
                dispatch({ type: cartConstants.GET_CART_REQUEST })
                navigate('/cart')
              }} />
              <span className="badge bg-danger absolute left-5 bottom-[17px]">{cart?.cart_data?.length}</span>
            </div>
            <div className="cursor-pointer icon-user">
              <UserIcon className="h-7 w-7 text-gray-600" onClick={() => localStorage.getItem('user_id') ? '' : navigate('/login')} />
                {localStorage.getItem('user_id') ? 
                  <ul className="profil-drop">
                    <li className='block' onClick={() => navigate('/my-profile')}>Profile</li>
                    <hr className='!m-2' />
                    <li className='block' onClick={() => {
                      localStorage.clear();
                      navigate('/login')
                    }}>Logout</li>
                  </ul>
                  : ''
                }
            </div>
          </div>
        </div>
      </div>



      {/* Desktop navigation bar - only visible on large screens */}
      <nav className="hidden lg:flex justify-center gap-6 text-sm font-medium text-white px-2 border-t bg-[#bc4d5e]">
        <div className="flex gap-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="relative"
              onMouseEnter={() => item.subItems?.filter((s) => s.status === 1)?.length > 0 && setOpenPopover(item.id)}
              onMouseLeave={() => setOpenPopover(null)}
            >
              <button
                className="flex items-center gap-1 focus:outline-none px-2 py-3"
                onClick={() => item.subItems?.filter((s) => s.status === 1)?.length === 0 && navigate('/collections/' + item.path)}
              >
                {item.label}
                {item.subItems.filter((s) => s.status === 1)?.length > 0 && (
                  <ChevronDownIcon className="h-4 w-4 text-white" />
                )}
              </button>

              {item.subItems?.filter((s) => s.status === 1)?.length > 0 && openPopover === item.id && (
                <div className="absolute top-full z-10 mt-0 bg-white shadow-md rounded p-2 w-48">
                  {item.subItems?.filter((s) => s.status === 1)?.map((sub) => (
                    <a
                      key={sub.id}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/collections/' + item.path + '/' + sub.path);
                        setOpenPopover(null);
                      }}
                      className="block px-3 py-1 text-sm hover:bg-gray-100 leading-6"
                      style={{ color: '#000000', textDecoration: 'none' }}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>


      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <img src="/assets/logo.jpg" alt="Logo" className="w-35" />
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
            {menuItems.map((item) => (
              <Disclosure key={item.id} as="div" className="mb-2"
                onMouseEnter={() => item.subItems.length > 0 && setOpenPopover(item.id)}
                onMouseLeave={() => setOpenPopover(null)}
              >
                <DisclosureButton className="flex w-full justify-between px-4 py-2 text-left text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  onClick={() => item.subItems.length === 0 && navigate('/collections/' + item.path)}
                >
                  {item.label}
                  {item.subItems && <ChevronDownIcon className="size-5 text-gray-400" />}
                </DisclosureButton>
                {item.subItems && (
                  <DisclosurePanel className="mt-1 space-y-1 pl-4">
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.id}
                        href={sub.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 no-underline" style={{ color: '#000000', textDecoration: 'none' }}
                      >
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

      {/* Mobile menu toggle - only on small screens */}
      <div className="flex lg:hidden items-center justify-between px-6 lg:py-4">
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
