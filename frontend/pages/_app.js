import Head from 'next/head'
import { Fragment } from 'react'
import Layout from '../components/Common/UX/Layout'
import '../styles/globals.css'
import { useAuth } from '../hooks/auth-hook';
import { AuthContext } from '../store/auth';

function MyApp({ Component, pageProps }) {

  const { token, login, logout, userId, UserRole, UserName } = useAuth();

  return (
    <Fragment>
      <Head>
        <title>IWA</title>
      </Head>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          userRole: UserRole,
          userName: UserName,
          login: login,
          logout: logout
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContext.Provider>

    </Fragment>
  )
}

export default MyApp
