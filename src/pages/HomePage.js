import {getContacts, deleteContact, search} from '../actions/contacts'
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Input, Icon, Button} from "semantic-ui-react";
import {PAGE_SIZE} from "../config/env";
import {connect} from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Link} from "react-router-dom";

class HomePage extends PureComponent {
    constructor(props) {
        super(props);
        this.deleteContact = this.deleteContact.bind(this);
        this.onFetchData = this.onFetchData.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.state = {
            loading: true,
            tableIsCreated: false,
            searchingText: "",
            page: 0,
            isPageChange: false
        }
    }

    onPageChange() {
        this.setState({
            isPageChange: true
        })
    }

    onFetchData(state, instance) {
        this.setState({page: instance.state.page});
        const {page, isPageChange} = this.state;
        if (isPageChange) {
            this.setState({isPageChange: false});
            this.props.search({PageNumber: page, PageSize: PAGE_SIZE, Text: ""});
        }
    }

    onChange(e) {
        const input = e.target;
        this.setState({[input.name]: input.value});
        this.props.search({PageNumber: 0, PageSize: PAGE_SIZE, Text: input.value})
    }

    componentDidMount() {
        this.props.search({PageNumber: 0, PageSize: PAGE_SIZE, Text: this.props.searchingText});
        this.setState({...this.state, loading: false, tableIsCreated: true});
    }

    deleteContact(id) {
        this.props.deleteContact(id);
    }

    render() {
        const {contactList, pageCount} = this.props.contacts;
        return (
            <div>


                <div>
                    <Input
                        style={{marginBottom: '5px'}}
                        icon={<Icon name='search' inverted circular/>}
                        name="searchingText"
                        value={this.state.searchingText}
                        placeholder='Ara...' onChange={this.onChange}/>
                    <ReactTable
                        columns={[
                            {
                                Header: "Ad",
                                accessor: "firstName"
                            },
                            {
                                Header: "Soyad",
                                accessor: "lastName"
                            },
                            {
                                Header: "Telefon",
                                accessor: "phoneNumber"
                            },
                            {
                                Header: "#",
                                id: "id",
                                accessor: item => <Button.Group>
                                    <Button color='red'
                                            onClick={() => this.props.deleteContact(item.id)}>Sil</Button>
                                    <Button.Or text='&'/>
                                    <Button color='yellow' as={Link} to={`/contact/${item.id}`}>
                                        Düzenle
                                    </Button>
                                </Button.Group>
                            }
                        ]}
                        manual
                        data={contactList}
                        pages={pageCount}
                        pageText='Sayfa'
                        page={this.state.page}
                        nextText='İleri'
                        previousText='Geri'
                        rowsText='kayıt'
                        showPageSizeOptions={false}
                        noDataText="Kayıt bulunamadı"
                        loadingText="Yükleniyor"
                        ofText='/'
                        loading={this.props.contacts.fetching}
                        onFetchData={this.onFetchData}
                        onPageChange={this.onPageChange}
                        defaultPageSize={PAGE_SIZE}
                        className="-striped -highlight"/>

                </div>


            </div>
        );
    }
}

HomePage.propTypes = {
    getContacts: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
};
const mapStateToProps = ({contacts}) => {
    return {
        contacts
    }
};

const mapDispatchToProps = {
    getContacts,
    deleteContact,
    search
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
