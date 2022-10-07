import {Html, Head, Main, NextScript} from 'next/document';

export default function WordleDocument() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
      </Head>
      <body className="w-full bg-white text-black dark:bg-black-70 dark:text-white">
        <div id="portal-root" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    document.documentElement.classList.toggle("dark",newTheme === "dark")
                  }

                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem('theme');
                  } catch (err) { }
                  
                  window.__setPreferredTheme = function(newTheme) {
                    preferredTheme = newTheme;
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('theme', newTheme);
                    } catch (err) { }
                  };
                  
                  var initialTheme = preferredTheme;
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  setTheme(initialTheme);
                  darkQuery.addEventListener('change', function (e) {
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });
                })();
              `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
