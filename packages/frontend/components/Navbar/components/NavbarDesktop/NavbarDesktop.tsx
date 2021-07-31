import React, { useEffect } from 'react';
import Image from 'next/image';
import { Popover } from '@headlessui/react';
import { MenuIcon } from '@heroicons/react/outline';
import Button from 'components/Button/Button';
import Link from 'next/link';
import clsx from 'clsx';
import { useUser } from 'hooks';
import { useRouter } from 'next/router';
import s from './NavbarDesktop.module.css';

const NavbarDesktop = () => {
  const { isAuthenticated, logout, isLogoutSuccess } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLogoutSuccess) {
      router.push('/login');
    }
  }, [router, isLogoutSuccess]);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.logoContainer}>
          <Link href="/">
            <a>
              <span className="sr-only">Workflow</span>
              <Image src="/logo.svg" className={s.logoImg} alt="Landscape picture" width={40} height={40} />
            </a>
          </Link>
        </div>
        <div className={s.burgerContainer}>
          <Popover.Button className={s.burgerBtn}>
            <span className="sr-only">Open menu</span>
            <MenuIcon className={s.burgerIcon} aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className={s.btnGroup}>
          {isAuthenticated ? (
            <Button className="ml-8" onClick={logout}>
              Log out
            </Button>
          ) : (
            <>
              <Link href="/login">
                <a className={clsx('whitespace-nowrap', s.link)}>Sign in</a>
              </Link>

              <Button href="/register" className="ml-8">
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
