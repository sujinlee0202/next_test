import Link from 'next/link';
import React, { ComponentPropsWithoutRef, ForwardedRef } from 'react';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import useMaps from '@/hooks/useMaps';

interface HeaderProps {
  rightElements?: React.ReactElement[];
  onClickLogo?: () => void;
}

const CustomAnchor = React.forwardRef(function CustomAnchor(
  props: ComponentPropsWithoutRef<'a'>,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <a ref={ref} {...props}>
      <Image src="/inflearn.png" width={110} height={20} alt="인프런 로고" />
    </a>
  );
});

const Header = ({ rightElements, onClickLogo }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        {/* <Link
          href="/"
          className={styles.box}
          onClick={onClickLogo}
          aria-label="홈으로 이동"
        >
          <Image
            src="/inflearn.png"
            alt="인프런 로고"
            width={110}
            height={20}
          ></Image>
        </Link> */}
        <Link href="/" passHref legacyBehavior>
          <CustomAnchor
            className={styles.box}
            onClick={onClickLogo}
            aria-label="홈으로 이동"
          />
        </Link>
      </div>
      <div>
        {rightElements && (
          <div className={styles.flexItem}>{rightElements}</div>
        )}
      </div>
    </header>
  );
};

export default Header;
