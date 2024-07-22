import React, { useState, useEffect, useMemo } from 'react';
import InsuranceFor from './First';

const Main = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch('http://localhost:5000/customers');
    const data = await response.json();
    setCustomers(data);
  };

  const addCustomer = async (customer) => {
    const response = await fetch('http://localhost:5000/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    });
    const newCustomer = await response.json();
    setCustomers([...customers, newCustomer]);
  };

  const deleteCustomer = async (uid) => {
    await fetch(`http://localhost:5000/customers/${uid}`, {
      method: 'DELETE',
    });
    setCustomers(customers.filter((customer) => customer.uid !== uid));
  };

  return (
    <div>
      <InsuranceFor addCustomer={addCustomer} />
      <CustomerTable customers={customers} deleteCustomer={deleteCustomer} />
    </div>
  );
};



const CustomerTable = ({ customers = [], deleteCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return customers.filter((customer) => {
      return (
        customer.fullName.toLowerCase().includes(term) ||
        customer.mobile.toLowerCase().includes(term) ||
        customer.birthday.toLowerCase().includes(term) ||
        customer.age.toString().toLowerCase().includes(term) ||
        customer.address.toLowerCase().includes(term)
      );
    });
  }, [searchTerm, customers]);

  return (
    <div className='container'>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search customers"
        aria-label="Search customers"
        className='form-control'
      />
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>UID</th>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>Birthday</th>
            <th>Age</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={customer.uid}>
              <td>{index + 1}</td>
              <td>{customer.uid}</td>
              <td>{customer.fullName}</td>
              <td>{customer.mobile}</td>
              <td>{customer.birthday}</td>
              <td>{customer.age}</td>
              <td>{customer.address}</td>
              <td>
                <button className='btn btn-info' aria-label={`Edit customer ${customer.fullName}`}>Edit</button>
                <button onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${customer.fullName}?`)) {
                      deleteCustomer(customer.uid);
                    }
                  }}
                  className='btn btn-danger'
                  aria-label={`Delete customer ${customer.fullName}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Main;
