import Link from 'next/link';
import React from 'react';
import styles from '../styles/header.module.scss';
import Image from 'next/image';
import useMaps from '@/hooks/useMaps';

interface HeaderProps {
  rightElements?: React.ReactElement[];
  onClickLogo?: () => void;
}

const Header = ({ rightElements, onClickLogo }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.flexItem}>
        <Link
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
