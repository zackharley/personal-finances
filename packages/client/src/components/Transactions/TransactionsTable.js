import React, { Component } from 'react';
import ReactTable from 'react-table';
import moment from 'moment';
import api from '../../services/api';
import { sum } from '../../utils/math';

export default class TransactionsTable extends Component {
  async deleteTransaction(id) {
    await api.deleteTransaction(id);
    await this.props.onDelete();
  }
  render() {
    const { data } = this.props;
    const tableColumns = [
      {
        Header: 'Item',
        accessor: 'item',
        Footer: ({ data }) =>
          `${data.length || 0} items`
      },
      {
        Header: 'Cost',
        accessor: 'cost',
        Cell: props => `$${Number(props.value).toFixed(2)}`,
        Footer: ({ data }) =>
          `$${sum(data.map(transaction => transaction.cost)).toFixed(2)}`
      },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: props => moment.utc(props.value).format('DD/MM/YYYY')
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Sub-Type',
        accessor: 'subType'
      },
      {
        Header: 'Notes',
        accessor: 'notes'
      },
      {
        Header: '',
        accessor: '_id',
        Cell: ({ value: id }) => (
          <button onClick={() => this.deleteTransaction(id)}>X</button>
        )
      }
    ];
    return <ReactTable data={data} columns={tableColumns} />;
  }
}
