import Script from 'next/script';

const Analytics: React.FC = () => {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  // Only load analytics in production
  if (!domain || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
};

export default Analytics;
