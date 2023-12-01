import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header() {

  const { signOut } = useContext(AuthContext)
 

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dasboard">
          <img src='/logo.svg' width={190} height={60} alt='logo' data-testid="dashboard-link"></img>
        </Link>

        <nav className={styles.menuNav}>
        <Link href="/category" data-testid="category-link">
          Categoria
        </Link>

        <Link href="/product" data-testid="cardapio-link">
          Cardápio
        </Link>

        <button onClick={signOut}>
          <FiLogOut color="#FFF" size={24} data-testid="logout-button" />
        </button>
        </nav>
      </div>
 
    </header>
  )
}