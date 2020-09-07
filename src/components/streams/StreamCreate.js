import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  //destructuring meta into error and touched
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //destructure formProps out into input
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    //takes the formProps input property which is an object with the value property and the onChange handler. Takes all the key value pairs and adds them as properties to the input element
    //take the input object, take all the properties out there, and add them as props to the input element
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };
  //with redux-form, this onSubmit recieves the properties of the Field components within the form
  onSubmit() {}

  render() {
    return (
      <form
        //in redux-form, you first run handleSubmit and then iunside of that function the helper function you want to use
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = 'Enter A Title';
  }

  if (!formValues.description) {
    errors.description = 'Enter A Description';
  }

  return errors;
};

export default reduxForm({
  form: 'streamCreate',
  validate,
})(StreamCreate);
