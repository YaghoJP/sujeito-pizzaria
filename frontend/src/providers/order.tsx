"use client"
import { createContext, ReactNode, useState } from 'react'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

interface OrderItemProps{
  id: string;
  amount: number;
  created_at: string;
  orderId: string;
  productId: string;
  product:{
    id: string;
    name: string;
    price: string;
    description: string;
    banner: string;
    categoryId: string;
  };
  order:{
    id: string;
    table: number;
    name: string | null;
    draft: boolean;
    status: boolean;
  }
}

type OrderContextData = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderItemProps[];
}

type OrderProviderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({ children }: OrderProviderProps){
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState<OrderItemProps[]>([])

  async function onRequestOpen(order_id: string){

    const token = getCookieClient();

    const response = await api.get("/order/detail", {
      headers:{
        Authorization: `Bearer ${token}`
      },
      params:{
        orderId: order_id
      }
    })
    console.log('OderID do providers/order.tsx:', order_id)
    console.log('Resposta da requisição:', response.data)
    setOrder(response.data);
    setIsOpen(true);

  }

  function onRequestClose(){
    setIsOpen(false);
  }

  return(
    <OrderContext.Provider 
      value={{ 
        isOpen,
        onRequestOpen,
        onRequestClose,
        order
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}


