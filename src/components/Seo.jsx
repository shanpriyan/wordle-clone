import Head from 'next/head';

const meta = {
  title: 'Wordle Clone',
  description: 'Wordle clone built with Next.js and tailwindcss',
  authorName: 'Shanmughapriyan S',
  siteUrl: 'https://wordle.shanpriyan.in/',
  imageUrl: 'https://wordle.shanpriyan.in/og.png',
  twitterUserName: '_shanpriyan',
};

export function Seo({
  title = meta.title,
  description = meta.description,
  children,
}) {
  return (
    <Head>
      {/* Primary */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      <meta name="author" content={meta.authorName} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={meta.imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={meta.imageUrl} />
      <meta name="twitter:site" content={`@${meta.twitterUserName}`} />
      <meta name="twitter:creator" content={`@${meta.twitterUserName}`} />
      {children}
    </Head>
  );
}
