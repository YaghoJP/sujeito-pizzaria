import Image from 'next/image'
import Link from 'next/link'
import styles from '../page.module.scss'
import logoImg from '/public/logo.svg'
import {api} from '@/services/app'
import { redirect } from 'next/navigation'

export default function SignUp(){

  async function criarConta(formData: FormData){
    "use server"
    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    if (name === "" || email === "" || password === ""){
      return;
    }

    try{
      await api.post('/user',{
        name: name,
        email:email,
        password:password
      })
    }catch(err){
      console.log(err)
    }

    redirect('/')
  }

    return(
        <>
        <div className={styles.containerCenter}>
          <Image
            src={logoImg}
            alt="Logo da Pizzaria"
          />
  
          <section className={styles.login}>
            <h1>
                Criando sua conta
            </h1>
            <form action={criarConta}>
              <input 
                type='text' 
                name='name' 
                required 
                placeholder='Digite seu nome...' 
                className={styles.input}
              />
              <input 
                type='email' 
                name='email' 
                required 
                placeholder='Digite seu email...' 
                className={styles.input}
              />
              <input 
                type='password' 
                name='password' 
                required 
                placeholder='*******************' 
                className={styles.input}
              />
              <button type='submit' className={styles.button}>
                Cadastrar
              </button>
            </form>
            <Link href='/' className={styles.text}>
              Já possui uma conta? Vá para o login.
            </Link>
          </section>
        </div>
      </>
    )
}