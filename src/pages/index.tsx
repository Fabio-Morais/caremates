import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next';

import { Navbar } from '@/components/common/Navbar';
import { MultiStepForm } from '@/components/matchingForm/MultiStepForm';

import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CareMates</title>
      </Head>

      <Navbar />
      <MultiStepForm />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {
      messages: (await import(`../locales/${context.locale || 'en'}.json`))
        .default,
    },
  };
};
