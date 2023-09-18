import { NextPageContext } from 'next';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';

export default function Page() {
  return <></>;
}

export const getServerSideProps = (context: NextPageContext) => {
  const { pg_token } = context.query;
  if (!pg_token) {
    return {
      props: {
        redirect: {
          destination: '/',
          permanent: false,
        },
      },
    };
  }
  return {
    props: {
      pg_token,
    },
  };
};

Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
