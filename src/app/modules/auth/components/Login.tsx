/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState ,useEffect} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { getUserByToken, login } from '../core/_requests'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useAuth } from '../../auth'
import axios from 'axios';


const loginSchema = Yup.object().shape({
  user: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('user is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  user: '',
  password: '',
}

interface LoginFormValues {
  user: string;
  password: string;
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

const disableBackButton = () => {
  window.history.pushState(null, '', window.location.pathname);

  window.addEventListener('popstate', () => {
    window.history.pushState(null, '', window.location.pathname);
  });
};


export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik < LoginFormValues > ({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        // // Check if admin is logging in
        // if (values.user === 'admin' && values.password === 'admin@123') {
        //   // Grant access to the dashboard for admin
        //   navigate('/dashboard');
        // } else {
        // For regular user, authenticate against GraphQL API with x-hasura-access-key header
        const hasuraAccessKey = process.env.REACT_APP_ADMIN_SECRET_KEY;

        if (!hasuraAccessKey) {
          console.error('REACT_APP_ADMIN_SECRET_KEY is undefined');
          return; // Handle the case where the key is undefined
        }

        const authResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}`,
          {
            query: `
                query GetUsers {
                  user(where: { user: { _eq: "${values.user}" }, password: { _eq: "${values.password}" } }) {
                    id
                    created_by
                    deleted_by
                    email
                    encryption_key
                    modified_by
                    password
                    user
                    created_on
                    deleted_on
                    modified_on
                  }
                }
              `,
          },
          {
            headers: {
              'x-hasura-access-key': hasuraAccessKey,
            },
          }
        );

        const userData = authResponse.data.data;

        // Check if user data is available
        if (userData && userData.user && userData.user.length > 0) {
          setCurrentUser(userData.user[0]);
          // Redirect to the dashboard upon successful login
          navigate('/dashboard');
        } else {
          setStatus('Invalid login credentials');
        }

      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('Invalid login credentials');
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  // Effect to disable back button after reloading
  useEffect(() => {
    disableBackButton();
  }, []);

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
        <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div>
      </div>
      {/* begin::Heading */}

      {/* begin::Login options */}
      <div className='row g-3 mb-9'>
        {/* begin::Col */}
        <div className='col-md-6'>
          {/* begin::Google link */}
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
              className='h-15px me-3'
            />
            Sign in with Google
          </a>
          {/* end::Google link */}
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-md-6'>
          {/* begin::Google link */}
          <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          >
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
              className='theme-light-show h-15px me-3'
            />
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/apple-black-dark.svg')}
              className='theme-dark-show h-15px me-3'
            />
            Sign in with Apple
          </a>
          {/* end::Google link */}
        </div>
        {/* end::Col */}
      </div>
      {/* end::Login options */}

      {/* begin::Separator */}
      <div className='separator separator-content my-14'>
        <span className='w-125px text-gray-500 fw-semibold fs-7'>Or with user</span>
      </div>
      {/* end::Separator */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <></>

      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
        <input
          placeholder='user'
          {...formik.getFieldProps('user')}
          className={clsx(
            'form-control bg-transparent',
            { 'is-invalid': formik.touched.user && formik.errors.user },
            {
              'is-valid': formik.touched.user && !formik.errors.user,
            }
          )}
          type='user'
          name='user'
          autoComplete='off'
        />
        {formik.touched.user && formik.errors.user && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.user}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Forgot Password ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Not a Member yet?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Sign up
        </Link>
      </div>
    </form>
  )
}
