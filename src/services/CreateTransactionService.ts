import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    if (type === 'income') {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return transaction;
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (value > balance.total) {
        throw Error('You do not have founds!');
      }

      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });
      return transaction;
    }

    throw Error('Type is not exist!');
  }
}

export default CreateTransactionService;
