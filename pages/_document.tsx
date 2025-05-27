import {
  DocumentHeadTags,
  DocumentHeadTagsProps,
  documentGetInitialProps,
} from '@mui/material-nextjs/v14-pagesRouter';
import {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en" data-toolpad-color-scheme="">
      <Head>
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};