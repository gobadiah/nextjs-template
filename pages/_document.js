import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const {
      html,
      head,
      errorHtml,
      chunks,
    } = renderPage();
    const styles = flush();
    return {
      html,
      head,
      errorHtml,
      chunks,
      styles,
    };
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/html-has-lang
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
