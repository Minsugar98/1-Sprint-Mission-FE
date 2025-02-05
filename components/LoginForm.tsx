import React, { useState } from 'react';
import useForm from '../hook/form';
import styles from './LoginForm.module.css';
import Image from 'next/image';
import { PostLogin } from '../pages/api/user';
import { useRouter } from 'next/router';
import { ErrorResponse, AuthResponse } from '../pages/api/types/authTypes';

interface ValidationErrors {
  email?: string;
  password?: string;
}

const LoginForm: React.FC = () => {
  const { values, handleChange, handleSubmit, resetForm, isSubmitting } =
    useForm({
      email: '',
      password: '',
    });

  const router = useRouter();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const passwordToggleHandler = () => {
    setShowPassword(!showPassword);
  };

  // 유효성 검사 함수
  const validate = (): ValidationErrors => {
    let validationErrors: ValidationErrors = {};

    if (!values.email) {
      validationErrors.email = '이메일을 입력해주세요.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      validationErrors.email = '잘못된 이메일입니다.';
    }

    if (!values.password) {
      validationErrors.password = '비밀번호를 입력해주세요.';
    } else if (values.password.length < 8) {
      validationErrors.password = '비밀번호를 8자 이상 입력해주세요.';
    }

    return validationErrors;
  };

  // 폼 제출 시 처리하는 함수
  const submitForm = async () => {
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await PostLogin({
          email: values.email,
          password: values.password,
        });

        // res가 AxiosResponse라면 res.data를 사용하여 접근합니다.
        if ('data' in res && 'accessToken' in res.data) {
          const data = res.data as AuthResponse;

          resetForm(); // 폼 리셋
          console.log('로그인 성공', data);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          router.push('/market');
        } else {
          // ErrorResponse 처리
          console.log('로그인 실패', res);
        }
      } catch (e) {
        console.log('에러', e);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
      <div className={styles.formGroup}>
        <label className={styles.label}>이메일</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>비밀번호</label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={values.password}
          onChange={handleChange}
          className={styles.input}
        />
        <span className={styles.passwordToggle} onClick={passwordToggleHandler}>
          {!showPassword ? (
            <Image src="./eyeClose.svg" alt="Close" width={24} height={24} />
          ) : (
            <Image src="./eyeOpen.svg" alt="open" width={24} height={24} />
          )}
        </span>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
      </div>
      <button className={styles.button} type="submit">
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
