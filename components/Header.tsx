import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getProfile } from '../pages/api/user';
import { UserProfile } from '../pages/api/types/authTypes'; // 사용 중인 UserProfile 타입 정의가 필요

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    // 비동기 함수 정의
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setIsLogin(false);
          return;
        }

        const profile = await getProfile(); // 비동기 함수 실행

        if ('id' in profile) {
          setUserData(profile); // 프로필 데이터를 저장
          setIsLogin(true); // 로그인 상태로 변경
        } else {
          setIsLogin(false); // 로그아웃 상태로 변경
        }
      } catch (error) {
        console.error('개인 정보를 가져오는 중 오류 발생:', error);
        setIsLogin(false); // 오류 발생 시 로그인 상태 초기화
      }
    };

    // 비동기 함수 호출
    fetchProfile();
  }, []);

  return (
    <div className={styles.Header}>
      <div className={styles.HeaderImgContainer}>
        <Image
          src="/logo-img.svg"
          alt="logo"
          fill={true}
          className={styles.HeaderImg}
          onClick={() => (window.location.href = '/')}
        />
      </div>
      <div className={styles.HeaderMenu}>
        <Link
          href="/articles"
          className={
            router.pathname === '/articles' ? styles.Active : styles.NotActive
          }
        >
          <p>자유 게시판</p>
        </Link>
        <Link
          href="/market"
          className={
            router.pathname === '/market' ? styles.Active : styles.NotActive
          }
        >
          <p>중고마켓</p>
        </Link>
      </div>
      {!isLogin ? (
        <button
          className={styles.HeaderBtn}
          onClick={() => router.push('/login')}
        >
          로그인
        </button>
      ) : (
        <div className={styles.loginSuccess}>
          <Image src="/MyImg.svg" alt="profile" width={40} height={40} />
          <p>{userData?.nickname}</p>
        </div>
      )}
    </div>
  );
}
