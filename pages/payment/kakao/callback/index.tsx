import { NextPageContext } from 'next';

export default function Index() {
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
