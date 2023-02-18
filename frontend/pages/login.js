import React, { Fragment, useContext, useEffect, useRef } from 'react'
import Link from 'next/link';
import styles from '../styles/login.module.css';
import { useRouter } from 'next/router';
import { AuthContext } from '../store/auth';
import { useHttpClient } from '../hooks/http-hook';
import StatusOverlay from '../components/Common/UX/StatusOverlay';
import LoadingSpinner from '../components/Common/UX/LoadingSpinner';

function LoginPage() {

  const router = useRouter();
  const AuthCtx = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const emailRef = useRef();
  const passwordRef = useRef();
  console.log(error)
  useEffect(() => {
    if (AuthCtx.isLoggedIn) {
      if (AuthCtx.userRole === "Admin") {
        router.push('/admin')
      } else {
        router.push('/user')
      }
    }
  }, [AuthCtx, router])

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    try {
      let data = await sendRequest("/auth/signIn", 'POST', JSON.stringify(
        {
          email: email,
          password: password
        }
      ),
        {
          'Content-Type': 'application/json'
        }
      )
      data = data.data;
      AuthCtx.login(data.id, data.role, data.name, data.token);
    }
    catch (err) {

    }
  }
  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
      <div className={styles.container}>
        <h2 className={styles.loginHeading}>Login</h2>
        <form onSubmit={submitHandler}>
          <input ref={emailRef} type="email" placeholder='Enter Email' />
          <input ref={passwordRef} type="password" placeholder='Enter Password' />
          <button>Sign In</button>
        </form>
        <Link className={styles.signUpLink} href="/signup">Sign Up</Link>
      </ div>
    </Fragment>
  )
}

export default LoginPage