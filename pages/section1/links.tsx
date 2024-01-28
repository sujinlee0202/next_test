import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Links() {
  const router = useRouter();
  useEffect(() => {
    router.prefetch('/section1/getStaticProps');
  });

  return (
    <main>
      <h1>Links</h1>
      {/* <div style={{ height: '200vh' }}></div> */}
      <Link href={'/section1/getStaticProps'}>/getStaticProps</Link>
      <button
        onClick={() => {
          router.push('/section1/getStaticProps');
        }}
      >
        /getStaticProps
      </button>
    </main>
  );
}
