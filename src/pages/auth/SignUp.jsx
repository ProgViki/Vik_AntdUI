import { useFormik } from 'formik'
import { basicSchema } from "../../schema"




const onSubmit = (values) => {
    console.log("submitted")
}
function SignUp() {

    const { values, errors, handleBlur, handleChange, handleSubmit} = useFormik({
       
        initialValues: {
            email: '',
            age: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: basicSchema,
        onSubmit,
    })
  return (
    <form autoComplete='off'>
      <label htmlFor='email'></label>
      <input 
            id='email'
            type='email'
            placeholder='Enter your email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={errors.email && touched.email ? "input-error" : ""}
            />
             <label htmlFor='age'></label>
      <input 
            id='age'
            type='number'
            placeholder='Enter your age'
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
        <label htmlFor='password'>Password</label>
      <input 
            id='password'
            type='password'
            placeholder='Enter your password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
        <label htmlFor='confirmPassword'>Confirm Password</label>
      <input 
            id='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            <button>Submit</button>
    </form>
  )
}

export default SignUp
