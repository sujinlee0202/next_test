/* 모든 페이지에서 전역적으로 사용할 SEO 관련 meta tag 정의 */
export default {
  // title template (페이지 전역적으로 공통된 문자열이 들어가야 할 때)
  titleTemplate: '%s - 지도 서비스', // %s : <NextSeo title='' /> 에서 title에 작성한 내용이 들어간다.
  // og:image, og:type, og:sitename 등 openGraph와 관련된 meta tag -> openGraph key 작성
  openGraph: {
    type: 'website',
    site_name: '지도 서비스 만들기',
    images: [{ url: '**og 이미지 주소**' }],
  },

  // 추가로 필요한 link 태그에 대한 정보
  additionalLinkTags: [
    {
      rel: 'shortcut icon',
      href: '/favicon.ico',
    },
  ],
  additionalMetaTags: [
    {
      name: 'naver-site-verification',
      content: '2dcc2954541e1829e560ac55be0558d13bc1bcdf',
    },
    {
      name: 'google-site-verification',
      content: 'mGzP4MwZL-goUBfvZJp46gDaB3h5QMAMnSeScfp-P3U',
    },
  ],
};
