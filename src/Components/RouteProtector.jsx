import { Outlet, useNavigate } from "react-router-dom"

const RouteProtector = ({type,userType}) => {
  const navigate = useNavigate()
  return <>
    {userType != undefined ?
     userType === type ? <Outlet/> : navigate('/login') :
      navigate('/login')}
  </>
}

export default RouteProtector