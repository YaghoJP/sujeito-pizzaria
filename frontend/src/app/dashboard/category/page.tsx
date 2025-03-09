import styles from './styles.module.scss'
import { Button } from '../components/button'
import { api } from '@/services/app'
import { getCookieServer } from '@/lib/cookieServer'
import { redirect } from 'next/navigation'

export default function Category(){

    async function cadastrarCategoria(formData: FormData){
        "use server"

        const name = formData.get("name")

        if(!name)return;

        const data = {
            name: name
        }

        const token = await getCookieServer();

        await api.post('/category', data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        redirect('/dashboard')
    }

    return(
        <main className={styles.container}>
            <h1>Nova Categoria</h1>

            <form className={styles.form} action={cadastrarCategoria}>
                <input 
                    type='text' 
                    name='name' 
                    placeholder='Nome da categoria. Ex: Pizzas' 
                    required 
                    className={styles.input}
                />
                <Button name='Cadastrar'/>
            </form>
        </main>
    )
}