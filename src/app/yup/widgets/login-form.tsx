'use client';

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import * as yup from 'yup';

const loginFormSchema = yup.object().shape({
  username: yup.string().min(2, 'Username must have at least 2 characters'),
  password: yup.string().min(8, 'Password must have at least 8 characters'),
});

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data using Yup
    const formData = { username, password };
    loginFormSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // Form data is valid, perform form submission logic here
        console.log('Username:', username);
        console.log('Password:', password);
        setErrors({});
      })
      .catch((validationError: yup.ValidationError) => {
        // Form data is invalid, set the validation errors
        const validationErrors = validationError.inner.reduce(
          (acc: Record<string, string>, error: yup.ValidationError) => {
            // @ts-ignore
            return { ...acc, [error.path]: error.message };
          },
          {}
        );
        setErrors(validationErrors);
      });
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label key="username" htmlFor="username" className="flex flex-col mb-6">
        <span className="font-medium text-dark-gray mb-2">Username</span>
        <input
          name="username"
          type="text"
          required
          placeholder="Username"
          aria-labelledby="username"
          ref={usernameRef}
          onChange={handleUsernameChange}
          value={username}
        />
        {errors.username && <span className="text-red">{errors.username}</span>}
      </label>

      <label key="password" htmlFor="password" className="flex flex-col mb-6">
        <span className="font-medium text-dark-gray mb-2">Password</span>
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          aria-labelledby="password"
          ref={passwordRef}
          onChange={handlePasswordChange}
          value={password}
        />
        {errors.password && <span className="text-red">{errors.password}</span>}
      </label>

      <button type="submit" className="text-white bg-blue mb-4">
        Log in
      </button>
    </form>
  );
}
