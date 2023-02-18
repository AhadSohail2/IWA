import React, { useContext, useEffect } from 'react'
import SignUpForm from '../components/SignUp/SignupForm'
import { useRouter } from 'next/router';
import { AuthContext } from '../store/auth';

import styles from '../styles/signup.module.css';

function SignupPage() {

  const router = useRouter();
  const AuthCtx = useContext(AuthContext)

  useEffect(() => {
    if (AuthCtx.isLoggedIn) {
      router.push('/user')
    }
  }, [AuthCtx, router])

  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  )
}

export default SignupPage