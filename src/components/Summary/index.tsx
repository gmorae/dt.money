
import { useTransactions } from "hooks/useTransactions";
import { maskCurrency } from "utils";

import incomeIcon from 'assets/income.svg'
import outcomeIcon from 'assets/outcome.svg'
import totalIcon from 'assets/total.svg'

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions()

  const summary = transactions.reduce((acc, transaction) => {

    if(transaction.type === 'deposit') {
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdraw += transaction.amount
      acc.total += transaction.amount
    }

    return acc
  }, {
    deposits: 0,
    withdraw: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIcon} alt="Entradas" />
        </header>
        <strong>{maskCurrency(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIcon} alt="Saídas" />
        </header>
        <strong>-{maskCurrency(summary.withdraw)}</strong>
      </div>

      <div>
        <header>
          <p>Total</p>
          <img src={totalIcon} alt="Total" />
        </header>
        <strong>{maskCurrency(summary.total)}</strong>
      </div>
    </Container>
  )
}