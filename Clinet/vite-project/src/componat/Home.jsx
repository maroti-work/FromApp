import React, { useState } from 'react';
import axios from 'axios';

const InsuranceForm = () => {
  const [companyType, setCompanyType] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    mr:"",
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    contactNumber: '',
    dateOfBirth: '',
    year: '',
    age: '',
    old: '',
    address: ''
  });

  const handleCompanyTypeChange = (e) => {
    setCompanyType(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });

    if (name === 'dateOfBirth') {
      const birthDate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - birthDate.getFullYear();
      const year = birthDate.getFullYear();

      setPersonalInfo({
        ...personalInfo,
        dateOfBirth: value,
        year: year,
        age: age,
        old: age > 50 ? 'yes' : 'no'  // example logic for 'old'
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/api/insurance', { companyType, personalInfo })
      .then(response => {
        alert('Insurance details submitted successfully',response);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
  

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Costomer Type:
        <select value={companyType} onChange={handleCompanyTypeChange}>
          <option value="">Select</option>
          <option value="company">Company</option>
          <option value="private">Private</option>
        </select>
      </label>




      {companyType === 'private' && (
        <div>
          <input type="checkbox" name="mr" value={personalInfo.mr}  onChange={handleInputChange} /><p>mr</p>
          <input type="checkbox" /><p>miss</p>

          <label>
            First Name:
            <input type="text" name="firstName" value={personalInfo.firstName} onChange={handleInputChange} required />
          </label>

          <label>
            Last Name:
            <input type="text" name="lastName" value={personalInfo.lastName} onChange={handleInputChange} required />
          </label>

          <label>
            Middle Name:
            <input type="text" name="middleName" value={personalInfo.middleName} onChange={handleInputChange} />
          </label>

          <label>
            Full Name:
            <input type="text" value={` ${personalInfo.mr} ${personalInfo.firstName} ${personalInfo.middleName} ${personalInfo.lastName}`} readOnly />
          </label>

          <label>
            Contact Number:
            <input
              type="tel"
              name="contactNumber"
              value={personalInfo.contactNumber}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              required
            />
          </label>

          <label>
        Date of Birth:
        <input
          type="date"
          name="dateOfBirth"
          value={personalInfo.dateOfBirth}
          onChange={handleInputChange}
          required
        />
      </label>
      <label htmlFor="year">Year</label>
      <input
        type="text"
        name="year"
        value={personalInfo.year}
        readOnly
      />
      <label htmlFor="age">Age</label>
      <input
        type="text"
        name="age"
        value={personalInfo.age}
        readOnly
      />
      <label htmlFor="old">Old</label>
      <input
        type="text"
        name="old"
        value={personalInfo.old}
        readOnly
      />

          <label>
            Address:
            <input type="text" name="address" value={personalInfo.address} onChange={handleInputChange} required />
          </label>

          <button type="submit">Submit</button>
        </div>
      )}
    </form>
    
<div>
  <form> <label> Serch<input type="text" /></label>

  <tr>
    <th>sir{user.number}</th>
    <th>fullname{user.number}</th>
    <th>mobile{user.number}</th>
    <th>birthday{user.number}</th>
    <th>address {user.number}</th>
    <th>action{user.number}</th>


  </tr>
  </form>
</div>
    </div>
  );
};

export default InsuranceForm;
