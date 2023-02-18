import React, { Fragment, useState, useEffect, useContext } from 'react';
import InfoForm from '../../components/UpdateInfo/InfoForm';

import { AuthContext } from '../../store/auth';
import { useRouter } from 'next/router';
import { useHttpClient } from '../../hooks/http-hook';
import LoadingSpinner from '../../components/Common/UX/LoadingSpinner';
import StatusOverlay from '../../components/Common/UX/StatusOverlay';


import styles from '../../styles/users/updateInfo.module.css';

function UpdateInfo() {

  const AuthCtx = useContext(AuthContext);
  const router = useRouter();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [user, setUser] = useState({ name: "", email: "", dob: "", password: "", address: "", phoneNo: "", PostalAddress: "" });
  const [message, setMessage] = useState();

  useEffect(() => {
    if (!AuthCtx.isLoggedIn) {
      router.push('/login');
    }
  }, [AuthCtx, router])

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await sendRequest("/user/getUser", 'GET', null, { 'authorization': `Bearer ${AuthCtx.token}` })
        setUser(data.user);
      }
      catch (err) {
      }
    }
    getData();
  }, [AuthCtx, sendRequest])


  const formClickHandler = async (data) => {
    try {
      await sendRequest('/user/updateInfo', 'PUT', JSON.stringify(data),
        {
          'authorization': `Bearer ${AuthCtx.token}`,
          'Content-Type': 'application/json'
        }
      )
      setMessage("Information Updated");
    } catch (err) {

    }
  }

  const clearMessage = () => {
    setMessage(null);
  }

  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <StatusOverlay message={error} success={false} onClear={clearError} />}
      {message && <StatusOverlay message={message} success={true} onClear={clearMessage} />}
      <div className={`${styles.container}`}>
        <InfoForm userData={user} onSubmit={formClickHandler} />
      </div>
    </Fragment>
  )
}

export default UpdateInfo