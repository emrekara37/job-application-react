import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Button, Label} from "semantic-ui-react";
import InputMask from 'react-input-mask'
import {addContact, getContact, updateContact} from "../actions/newcontact";
import {Form} from 'formsy-semantic-ui-react'
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class NewContact extends PureComponent {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            isFormSubmitted: false,
            firstName: '',
            lastName: '',
            phoneNumber: '',
            id: 0
        }

    }


    componentDidMount() {
        const {id} = this.props.match.params;
        if (id) {
            this.props.getContact(parseInt(id, 10));
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({...nextProps.newContact.contact});
    }

    onSubmit(data) {
        this.setState({...this.state, isFormSubmitted: true});
        if (this.state.id > 0) {
            data.id = this.state.id;
            this.props.updateContact(data);
        } else
            this.props.addContact(data);
    }


    onChange(e) {
        this.form.formsyForm.inputs[2].setValue(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (

            <div>
                {(this.props.newContact.done && this.state.isFormSubmitted) && <Redirect to="/"/>}
                <Form
                    ref={ref => this.form = ref}
                    onValidSubmit={this.onSubmit}
                    loading={this.state.isFormSubmitted}
                >
                    <Form.Field>
                        <Form.Input
                            required
                            name="firstName"
                            label="Ad"
                            placeholder="Örn. Emre"
                            value={this.state.firstName}
                            errorLabel={<Label color="red" pointing/>}
                            validationErrors={{
                                isDefaultRequiredValue: 'Adınız zorunludur',
                            }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Input
                            required
                            name="lastName"
                            label="Soyad"
                            placeholder="Örn. Kara"
                            value={this.state.lastName}
                            errorLabel={<Label color="red" pointing/>}
                            validationErrors={{
                                isDefaultRequiredValue: 'Soyadınız zorunludur',
                            }}
                        />
                    </Form.Field>
                    <Form.Field>

                        <Form.Input
                            required
                            name="phoneNumber"
                            label="Telefon"
                            value={this.state.phoneNumber}
                            errorLabel={<Label color="red" pointing/>}
                            validationErrors={{
                                isDefaultRequiredValue: 'Telefon zorunludur',
                            }}
                        >
                            <InputMask mask="+\90 (999) 999-99-99"
                                       value={this.state.phoneNumber}
                                       name='phoneNumber'
                                       onChange={this.onChange}
                                       placeholder='Örn. +90 555 5555'/>
                        </Form.Input>

                    </Form.Field>
                    <Button type='submit' positive loading={this.state.isFormSubmitted}
                            disabled={this.state.isFormSubmitted}>Kaydet</Button>
                </Form>

            </div>
        );
    }
}

NewContact.propTypes = {
    addContact: PropTypes.func.isRequired,
    getContact: PropTypes.func.isRequired,
    updateContact: PropTypes.func.isRequired,
};
const mapStateToProps = ({newContact}) => {
    return {newContact};
};

const mapDispatchToProps = {
    addContact,
    getContact,
    updateContact
};

export default connect(mapStateToProps, mapDispatchToProps)(NewContact);