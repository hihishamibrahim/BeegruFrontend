'use client'
import React from 'react';
import Heading from './components/heading';
import ListWithPagination from './components/ListWithPagination';

const DashboardPage = ({ searchParams }: { searchParams: Record<string, string> }) => {
   // @ts-expect-error: searchParams might not have the expected structure
  const isSignUp = React.use(searchParams)?.isSignUp;
  return (
    <>
      <Heading isSignUp={isSignUp === 'true'}/>
      <ListWithPagination/>
    </>
  );
};

export default DashboardPage;
