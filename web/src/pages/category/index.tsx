import { useState, FormEvent, useEffect } from 'react';
import Head from "next/head";
import { Header } from '../../components/Header';
import styles from './styles.module.scss';

import { setupAPIClient } from '../../services/api';
import { toast } from 'react-toastify';

import {canSSRAuth } from '../../utils/canSSRAuth'


export default function Category() {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (!name) {
            setError('Preencha o nome da Categoria.');
            return;
        }

        const apiClient = setupAPIClient();
        
        try {
            await apiClient.post('/category', {
                name: name
            });
            
            toast.success('Categoria cadastrada com sucesso!');
            setName('');
            setError(null);
        } catch (err) {
            // Tratar erros do backend, se necessário
            setError('Erro ao cadastrar a categoria. Tente novamente mais tarde.');
        }
    }

    return (
        <>
            <Head>
                <title>Nova Categoria - Buge2e</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <h1>Cadastrar categorias</h1>

                    {error && <p className={styles.error}>{error}</p>}

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="text"
                            data-testid="input-category"
                            placeholder="Digite o nome da categoria"
                            className={styles.input}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError(null); // Limpar o erro quando o usuário começa a digitar
                            }}
                            required // Adicionar a validação HTML5 para campo obrigatório
                        />

                        <button className={styles.buttonAdd} type="submit" data-testid="cadastrar-button">
                            Cadastrar
                        </button>
                    </form>
                </main>
            </div>
        </>
    );
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    return {
        props: {}
    }
})
