import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { Bars } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Footer from './../../Footer';


export default function Register() {

  let navigate = useNavigate()
  let [loading, setLoading] = useState(false)
  let [msg, setMsg] = useState('')
  async function getRegister(values) {
    try {
      setLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      if (data.message === 'success') {
        setLoading(false)
        setMsg('')
        navigate('/')
      }
    } catch (error) {
      setMsg(error.response.data.message);
      setLoading(false)
    }
  }

  // function validate(values) {
  //   let errors = {}
  //   if (!values.name)
  //     errors.name = 'name is required!'
  //   else if (values.name.length < 2)
  //     errors.name = 'too short min is 2'
  //   else if (values.name.length > 7)
  //     errors.name = 'too long '
  //   if (!values.email)
  //     errors.email = 'email is re'

  //     return errors

  // }

  const validationSchema = Yup.object({
    name: Yup.string().required('name is required').min(2, 'too short min is 2').max(7, 'too long max is 7'),
    email: Yup.string().required('email is required').email('email not valid'),
    password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,7}$/),
    rePassword: Yup.string().required('repassword id required').oneOf([Yup.ref('password')], 'not the same'),
    phone: Yup.string().required('phone is req').matches(/^01[0-25][0-9]{8}$/, 'not valid')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: getRegister
  })


  return (
    <div>
      <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
      <Helmet>
        <title>Register component</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
        {msg ? <p className='alert alert-danger'>{msg}</p> : ''}
        <h4 className='my-3'>Register Now:</h4>
        <label htmlFor="name">name:</label>
        <input type="text" id='name' onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.name} onChange={formik.handleChange} />

        {formik.errors.name && formik.touched.name ? <p className='alert alert-danger'>{formik.errors.name}</p> : ''}

        <label htmlFor="email">email:</label>
        <input type="email" id='email' onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.email} onChange={formik.handleChange} />

        {formik.errors.email && formik.touched.email ? <p className='alert alert-danger'>{formik.errors.email}</p> : ''}

        <label htmlFor="password">password:</label>
        <input type="password" id='password' onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.password} onChange={formik.handleChange} />

        {formik.errors.password && formik.touched.password ? <p className='alert alert-danger'>{formik.errors.password}</p> : ''}

        <label htmlFor="rePassword">rePassword:</label>
        <input type="password" id='rePassword' onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.rePassword} onChange={formik.handleChange} />

        {formik.errors.rePassword && formik.touched.rePassword ? <p className='alert alert-danger'>{formik.errors.rePassword}</p> : ''}


        <label htmlFor="phone">phone:</label>
        <input type="tel" id='phone' onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} />

        {formik.errors.phone && formik.touched.phone ? <p className='alert alert-danger'>{formik.errors.phone}</p> : ''}

        <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-green text-white ms-auto d-block' type='submit'>{
          loading ? <Bars
            height="20"
            width="40"
            color="#fff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          ></Bars> : 'Register'
        }</button>
      </form>
      <Footer/>
    </div>
  )
}
