import KakaoCallbackView from '@/components/views/auth/KAKAOCallbackView';
import { ReactElement } from 'react';
import Layout from '@/components/common/Layout';
import { NextPageContext } from 'next';

export default function Page({ code }: { code: string }) {
  return <KakaoCallbackView code={code} />;
}
export const getServerSideProps = async (context: NextPageContext) => {
  const { code } = context.query;

  return {
    props: {
      code,
    },
  };
};
Page.getLayout = (page: ReactElement) => <Layout.Mobile>{page}</Layout.Mobile>;
