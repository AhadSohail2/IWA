import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function WentWrong() {

    const Router = useRouter()

    useEffect(() => {
        setInterval(() => {
            Router.push('/')
        }, 30000)

    }, [Router])

    return (
        <div>
            SomeThing Went Wrong Please Be Back After Some Minutes
        </div>
    )
}

export default WentWrong