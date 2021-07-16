import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import NavbarDesktop from './components/NavbarDesktop/NavbarDesktop';
import NavbarMobile from './components/NavbarMobile/NavbarMobile';
import s from './Navbar.module.css';

const Navbar = () => (
  <Popover className={s.root}>
    {({ open }) => (
      <>
        <NavbarDesktop />

        <Transition
          show={open}
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus static className={s.popover}>
            <NavbarMobile />
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

export default Navbar;
