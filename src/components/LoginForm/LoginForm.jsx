import { useState } from 'react';
import styles from './LoginForm.module.css';

export default function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError('');
//     try {
//       // مثال على استدعاء واجهة برمجيّة
//       const res = await fetch('/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials)
//       });
//       if (!res.ok) throw new Error('فشل تسجيل الدخول');
//       const user = await res.json();
//       onLogin(user);
//     } catch (err) {
//       setError(err.message);
//     }
//   };
const handleSubmit = e => {
    e.preventDefault();
    setError('');
  
    const { username, password } = credentials;
  
    // تجربة محلية: نعتبر أن الاعتماديات الصحيحة هما 's' و 's'
    if (username === 's' && password === 's') {
      // محاكاة استقبال بيانات المستخدم
      onLogin({ username });
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>تسجيل الدخول</h2>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.group}>
          <label htmlFor="username">اسم المستخدم</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="password">كلمة المرور</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className={styles.button}>دخول</button>
      </form>
    </div>
  );
}
