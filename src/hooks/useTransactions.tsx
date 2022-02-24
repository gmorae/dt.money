import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "services/api";

export interface Transaction {
  id: number
  title: string
  amount: number
  category: string
  type: 'deposit' | 'withdraw'
  date: Date
}

interface TransactionProviderProps {
  children: ReactNode
}

interface TransactionsContextProps {
  transactions: Transaction[]
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

type TransactionInput = Omit<Transaction, 'id' | 'date'>

export const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function getTransactions() {
    const { data } = await api.get('/transactions')
    setTransactions(data.transactions)
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const { data } = await api.post('/transactions', {
      ...transactionInput,
      date: new Date()
    })

    setTransactions([
      data.transactions,
      ...transactions
    ])
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )

}

export function useTransactions() {
  const context = useContext(TransactionsContext)

  return context
}