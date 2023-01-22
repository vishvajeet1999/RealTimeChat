import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

function SigninRedirect(props) {
    const [auth, setAuth] = useState(0)
    const [val, setVal] = useState(true)
    const [cookies, setCookies, removeCookies] = useCookies(['user'])
    const navigate = useNavigate()
    useEffect(() => {
        axios.post('http://localhost:3001/user/auth', { token: cookies.token })
            .then((res) => {
                console.log(res.data, "from promise")
                setAuth((prev) => {
                    if (res.data.authentication) {
                        console.log("from if block")
                        navigate("/")
                        return 1;
                    } else {
                        console.log("from eles block")
                        navigate("/signin")
                        return 0;
                    }
                })
            }).catch(err => console.log(err))
    }, [])


    return (<div>
        {!auth && (<div>{props.children}</div>)}
    </div>)

}

export default React.memo(SigninRedirect)