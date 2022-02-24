import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import { useTransactions } from 'hooks/useTransactions';

import iconClose from 'assets/close.svg';
import incomeIcon from 'assets/income.svg'
import outcomeIcon from 'assets/outcome.svg'

import {
  Container,
  TransactionTypeContainer,
  RadioBox
} from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')

  const { createTransaction } = useTransactions()

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      category,
      type
    })

    onRequestClose()

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposit')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={iconClose} alt="Fechar modal" />
      </button>

      <Container>
        <h2>Cadstro de transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeIcon} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeIcon} alt="Saida" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button
          type="submit"
          onClick={handleCreateNewTransaction}
        >
          Cadastrar
        </button>

      </Container>
    </Modal>
  )
}