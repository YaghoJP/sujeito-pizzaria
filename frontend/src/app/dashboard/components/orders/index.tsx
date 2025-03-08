import styles from './styles.module.scss'
import { RefreshCcw } from 'lucide-react'

export function Orders(){
    return(
        <main className={styles.container}>
            <section className={styles.ContainerHeader}>

                <h1>Pedidos</h1>

                <button>
                    <RefreshCcw 
                        size={24}
                        color='#3fffa3'
                    />
                </button>

            </section>

            <section className={styles.listOrders}>
                <button className={styles.orderItem}>
                    <div className={styles.tag}>

                    </div>
                    <span>Mesa 10</span>
                </button>

                <button className={styles.orderItem}>
                    <div className={styles.tag}>

                    </div>
                    <span>Mesa 20</span>
                </button>

            </section>
        </main>
    )
}