// 主要改动点：
// 使用函数组件 + Hooks：
//
// useState 取代 this.state。
// useEffect 取代生命周期方法 componentDidMount, componentDidUpdate, 和 componentWillUnmount。
// 类型定义：
//
// 定义了 UserDataProps 和 User 接口来指定 props 和用户数据的结构。
// 异步数据获取：
//
// 使用 async/await 替代了 then 语法，代码更加清晰。

import React, { useEffect, useState } from 'react';

interface UserDataProps {
  userId: string; // userId 是一个必需的字符串类型
}

interface User {
  name: string;
  email: string;
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null); // 用户数据的状态
  const [seconds, setSeconds] = useState(0); // 计时器状态

  // 用于获取用户数据的函数
  const fetchUserData = async (id: string) => {
    try {
      const response = await fetch(`https://secret.url/user/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // 初始化时加载用户数据
    fetchUserData(userId);

    // 设置一个计时器
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // 在组件卸载时清除计时器
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 只运行一次

  useEffect(() => {
    // 当 userId 改变时重新获取用户数据
    fetchUserData(userId);
  }, [userId]); // 依赖 userId

  return (
    <div>
      <h1>User Data Component</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <p>Timer: {seconds} seconds</p>
    </div>
  );
};

export default UserData;
