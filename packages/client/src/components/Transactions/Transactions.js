import React, { Component } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import TransactionsTable from './TransactionsTable';
import CreateTransactionForm from './CreateTransactionForm';

Modal.setAppElement('#root');

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      isModalOpen: false
    };
  }

  async componentDidMount() {
    await this.fetchTransactions();
  }

  async fetchTransactions() {
    const { transactions } = await api.listTransactions();
    this.setState({ transactions });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal.bind(this)}>Add new transaction</button>
        <TransactionsTable
          data={this.state.transactions}
          onDelete={this.fetchTransactions.bind(this)}
        />
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal.bind(this)}
          contentLabel="Example Modal"
        >
          <h2>Hello</h2>
          <button onClick={this.closeModal.bind(this)}>close</button>
          <div>Create a new transaction</div>
          <CreateTransactionForm
            closeModal={this.closeModal.bind(this)}
            onCreateTransaction={this.fetchTransactions.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}
