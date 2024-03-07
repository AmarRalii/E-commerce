import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userContext } from '../../UserContext';
import { Helmet } from 'react-helmet';
import Footer from './../../Footer';


export default function Login() {

  let navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  let [msg, setMsg] = useState('')
  let {setUser,setLogin} = useContext(userContext)


  async function getLogin(values) {
    try {
      setLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      if (data.message === 'success') {
        setUser(data.token)
        setLogin(data.user.name)
        localStorage.setItem('userToken',data.token)
        localStorage.setItem('userName',data.user.name)
        setLoading(false)
        setMsg('')
        navigate('/home') 
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false)
    }
  }



  const validationSchema = Yup.object({

    email: Yup.string().required('email is required').email('email not valid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,7}$/),

  })

  const formik = useFormik({
    initialValues: {

      email: '',
      password: '',

    },
    validationSchema,
    onSubmit: getLogin
  })


  return (
    <div>
      <Helmet>
        <title>Login component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
        {msg ? <p className='alert alert-danger'>{msg}</p> : ''}
        <h4 className='my-3'>Login Now:</h4>


        <label htmlFor="email">email:</label>
        <input type="email" id='email' onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.email} onChange={formik.handleChange} />

        {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}

        <label htmlFor="password">password:</label>
        <input type="password" id='password' onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.password} onChange={formik.handleChange} />

        {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}

      <Link to={'/forget'}>Forget PassWord?</Link>
        <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-green text-white ms-auto d-block' type='submit'>{
          loading ? <Bars
            height="20"
            width="40"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          ></Bars> : 'Login'
        }</button>
      </form>
      <Footer/>
    </div>
  )
}
