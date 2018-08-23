import React, { Component } from 'react';
import {
  isRequiredDate,
  isRequiredNumber,
  isRequiredString,
} from '../../services/form-validator';
import './CreateTransactionForm.css';
import api from '../../services/api';

const DEFAULT_FORM = {
  item: '',
  cost: '',
  date: '',
  type: '',
  subType: '',
  notes: ''
};
const DEFAULT_FORM_ERRORS = {
  item: [],
  cost: [],
  date: [],
  type: [],
  subType: [],
  notes: []
};
const FORM_FIELDS = [
  {
    name: 'item',
    label: 'Item',
    inputType: 'text'
  },
  {
    name: 'cost',
    label: 'Cost',
    inputType: 'number'
  },
  {
    name: 'date',
    label: 'Date',
    inputType: 'date'
  },
  {
    name: 'type',
    label: 'Type',
    inputType: 'text'
  },
  {
    name: 'subType',
    label: 'Sub-Type',
    inputType: 'text'
  },
  {
    name: 'notes',
    label: 'Notes',
    inputType: 'textarea'
  }
];

export default class CreateTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: { ...DEFAULT_FORM },
      formErrors: { ...DEFAULT_FORM_ERRORS }
    };
  }

  validateForm() {
    const formEntries = Object.entries(this.state.form);
    const formErrors = formEntries.reduce((allErrors, [field, value]) => {
      const currentFieldErrors = this.validateFormField(field, value);
      return { ...allErrors, [field]: currentFieldErrors };
    }, {});

    this.setState({ formErrors });

    return formEntries.reduce(
      (hasErrors, [field]) => hasErrors || formErrors[field].length === 0,
      false
    );
  }

  validateFormField(field, value) {
    let errors;
    switch (field) {
      case 'cost':
        errors = isRequiredNumber(value);
        break;
      case 'item':
      case 'type':
        errors = isRequiredString(value);
        break;
      case 'date':
        errors = isRequiredDate(value);
        break;
      default:
        errors = [];
        break;
    }
    return errors;
  }

  updateFormField(field, value) {
    const errors = this.validateFormField(field, value);
    this.setState({
      form: { ...this.state.form, [field]: value },
      formErrors: { ...this.state.formErrors, [field]: errors }
    });
  }

  async submit(e) {
    e.preventDefault();
    const isFormValid = this.validateForm();
    if (isFormValid) {
      console.log('Form is valid!');
      await api.createTransaction(this.state.form);
      this.setState({
        form: { ...DEFAULT_FORM },
        formErrors: { ...DEFAULT_FORM_ERRORS }
      });
      this.props.closeModal();
      await this.props.onCreateTransaction();
    } else {
      console.log('Form is invalid!');
    }
  }

  render() {
    const self = this;
    return (
      <form>
        {FORM_FIELDS.map(({ name, label, inputType }) => {
          const commonInputProps = {
            name,
            placeholder: label,
            onChange: e => self.updateFormField(name, e.target.value),
            className: self.state.formErrors[name].length > 0 ? 'error' : null,
            value: self.state.form[name]
          };
          const input =
            inputType === 'textarea' ? (
              <textarea
                {...commonInputProps}
                onChange={e => this.updateFormField(name, e.target.value)}
              />
            ) : (
              <input {...commonInputProps} type={inputType} />
            );
          return (
            <div key={name}>
              <label htmlFor={name}>{label}</label>
              {input}
            </div>
          );
        })}
        <button type="submit" onClick={this.submit.bind(this)}>
          Submit
        </button>
      </form>
    );
  }
}
