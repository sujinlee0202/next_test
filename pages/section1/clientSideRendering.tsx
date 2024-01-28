// import NoSSR from '@/components/noSSR';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const NoSSR = dynamic(() => import('../../components/section1/noSSR'), {
  ssr: false,
});

const Example: NextPage = () => {
  const [data, setData] = useState<number>();

  useEffect(() => {
    const delayInSeconds = 2;
    new Promise<number>((resolve) =>
      setTimeout(() => resolve(Math.random()), delayInSeconds * 1000),
    ).then((result: number) => setData(result));
  }, []);

  return (
    <main>
      <h1>Client Side data fetching</h1>
      <p>값 : {data}</p>

      <h1>NoSSR</h1>
      <NoSSR />
    </main>
  );
};

export default Example;
