import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogin } from '../features/userSlice';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});

const signupSchema = yup.object().shape({
  username: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});

const initialValuesLogin = {
  email: '',
  password: '',
};

const initialValuesSignup = {
  username: '',
  email: '',
  password: '',
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (values, onSubmitProps) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    onSubmitProps.resetForm();

    if (data.user && data.token) {
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate('/home');
    } else {
      console.error('Login failed:', data.message);
    }
  };

  const register = async (values, onSubmitProps) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    onSubmitProps.resetForm();
     console.log(data);
    if (data.user && data.token) {
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate('/home');
    } else {
      console.error('Registration failed:', data.message);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    } else {
      await register(values, onSubmitProps);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isLogin ? initialValuesLogin : initialValuesSignup}
        validationSchema={isLogin ? loginSchema : signupSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} style={{ width: isNonMobile ? '30%' : '80%' }}>
            <Box display="grid" gap="30px">
              {!isLogin && (
                <>
                  <TextField
                    label="Username"
                    onChange={handleChange}
                    value={values.username}
                    name="username"
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </>
              )}
              {isLogin && (
                <>
                  <TextField
                    label="Email"
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    fullWidth
                  />
                </>
              )}
            </Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                mt: 3,
                p: 1.5,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.paper,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  color: theme.palette.background.paper,
                },
              }}
            >
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Typography
              align="center"
              sx={{
                mt: 2,
                textDecoration: 'underline',
                color: theme.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign Up here." : 'Already have an account? Login here.'}
            </Typography>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AuthPage;
