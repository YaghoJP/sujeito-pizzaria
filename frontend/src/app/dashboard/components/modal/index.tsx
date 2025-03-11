import styles from './style.module.scss'
import { X } from 'lucide-react'

export function ModalOrder(){
    return(
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBackButton}>
                    <X size={40} color='#FF3f4b'/>
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do Pedido</h2>

                    <span className={styles.table}>
                        Mesa <b>46</b>
                    </span>

                    <section className={styles.containerItem}>
                        <span>1 - <b>Pizza Catupiry</b></span>
                        <span className={styles.description}>Pizza de Frango com Catupiry, borda recheada de chocolate.</span>
                    </section>

                    <button className={styles.buttonOrder}>
                        Concluir Pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}