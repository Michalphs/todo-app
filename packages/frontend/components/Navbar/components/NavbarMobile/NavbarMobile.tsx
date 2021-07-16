import React from 'react';
import { Popover } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Button from 'components/Button/Button';
import Image from 'next/image';
import Link from 'next/link';
import s from './NavbarMobile.module.css';

const NavbarMobile = () => (
  <div className={s.root}>
    <div className={s.container}>
      <div className={s.content}>
        <div>
          <Image src="/logo.svg" alt="Landscape picture" width={40} height={40} />
        </div>
        <div className={s.closeContainer}>
          <Popover.Button className={s.closeBtn}>
            <span className={s.closeText}>Close menu</span>
            <XIcon className={s.closeIcon} aria-hidden="true" />
          </Popover.Button>
        </div>
      </div>
    </div>
    <div className={s.btnGroup}>
      <div>
        <Button href="/register" fullSize>
          Sign up
        </Button>
        <p className={s.text}>
          Existing customer?
          <Link href="/login">
            <a className={s.link}> Sign in</a>
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default NavbarMobile;
