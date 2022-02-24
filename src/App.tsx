import { createServer, Model } from 'miragejs'
import { useState } from 'react';
import Modal from 'react-modal';

import {
  Header,
  Dashboard,
  NewTransactionModal
} from './components'

import { GlobalStyle } from './styles/global'

import { TransactionProvider } from './hooks/useTransactions'

createServer({
  models: {
    transactions: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1000,
          date: new Date()
        },
        {
          id: 2,
          title: 'Salário',
          type: 'deposit',
          category: 'Pagamento empresa X',
          amount: 3000,
          date: new Date()
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transactions')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)
      return schema.create('transactions', data)
    })
  }
})

Modal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionProvider>
  )
}
