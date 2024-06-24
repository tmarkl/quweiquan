import Script from "next/script";

const AdSense = () => {
  return (
    <Script
      async
      crossOrigin="anonymous"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8989983316282743"
    />
  );
};

export default AdSense;
