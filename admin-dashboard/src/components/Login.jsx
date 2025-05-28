import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://my-backend-dgp2.onrender.com/api/admin/login', {
        email,
        password,
      });

      // حفظ التوكن
      localStorage.setItem('token', res.data.token);
      setMessage('✅ تسجيل الدخول ناجح');

      // إبلاغ الـ App أن المستخدم سجل الدخول
      onLogin({ email });

      // الانتقال للوحة التحكم
      navigate('/AdminDash');
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ فشل تسجيل الدخول');
    }
  };

  return (
    <div>
      <h2>تسجيل دخول الأدمن</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">تسجيل الدخول</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
