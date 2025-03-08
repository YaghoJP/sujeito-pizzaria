import styles from './page.module.scss'
import logoImg from '/public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/app'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function Page(){

  async function fazerLogin(formData:FormData) {
    "use server"

    const email = formData.get('email')
    const password = formData.get('password')

    if(email === "" || password === ""){
      return;
    }

    try{

      const response = await api.post('/session',{
        email:email,
        password:password
      })

      const expressTime = 60 * 60 * 24 * 30 * 1000;

      const cookieStore = await cookies()
      cookieStore.set('session', response.data.token, {
        maxAge: expressTime,
        path:'/',
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

    }catch(err){
      console.log(err)
    }
    redirect('/dashboard')
  }

  return(
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt="Logo da Pizzaria"
        />

        <section className={styles.login}>
          <form action={fazerLogin}>
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
              Acessar
            </button>
          </form>
          <Link href='/signup' className={styles.text}>
            Não possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  )
}