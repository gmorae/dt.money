import {
  Summary,
  TransactionTable
} from 'components'

import {
  Container
} from './styles'

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TransactionTable />
    </Container>
  )
}