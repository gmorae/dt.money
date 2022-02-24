import { useTransactions } from 'hooks/useTransactions'
import { maskCurrency, formatDate } from 'utils'

import { Container } from './styles'

export function TransactionTable() {
  const { transactions } = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {
            transactions && transactions.map((transaction: any) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>{maskCurrency(transaction.amount)}</td>
                <td>{transaction.category}</td>
                <td>{formatDate(new Date(transaction.date))}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Container>
  )
}