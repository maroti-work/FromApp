import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"

const InsuranceFor = ({ addCustomer }) => {
  const [customerType, setCustomerType] = useState('company');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [birthday, setBirthday] = useState('');
  const [address, setAddress] = useState('');
  const [ageComponents, setAgeComponents] = useState({ years: 0, months: 0, days: 0 });
  const [dobError, setDobError] = useState('');

  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleFullName = () => `${gender === 'Male' ? 'Mr.' : 'Mrs.'} ${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(middleName)} ${capitalizeFirstLetter(lastName)}`;

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobile(value);
    }
  };

  const calculateAgeComponents = (birthDate) => {
    if (!birthDate) return { years: 0, months: 0, days: 0 };

    const today = new Date();
    const birthDateObj = new Date(birthDate);

    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const handleBirthdayChange = (e) => {
    const newBirthday = e.target.value;
    const today = new Date();
    const selectedDate = new Date(newBirthday);

    if (selectedDate > today) {
      setDobError('date of birth cannot be in the future.');
      return;
    }

    setDobError('');
    setBirthday(newBirthday);
    setAgeComponents(calculateAgeComponents(newBirthday));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dobError) {
      alert('Please fix the errors before submitting.');
      return;
    }
    
    const fullName = handleFullName();
    const age = ageComponents.years; 
    addCustomer({
      uid: Date.now().toString(),
      fullName,
      mobile,
      birthday,
      age,
      address,
    });

   
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setGender('');
    setMobile('');
    setBirthday('');
    setAddress('');
    setAgeComponents({ years: 0, months: 0, days: 0 });
  };

  return (
    <div className="card ">
    <div className="card-group" style={{ backgroundColor: 'pink' }}>
        <div className="card-body">
          <h5 className="card-title">Insurance Application</h5>
          <form onSubmit={handleSubmit} className='form-horizontal'>
            <div className="mb-3">
              <label className="form-label">Customer Type:</label>
              <select className="form-select" value={customerType} onChange={(e) => setCustomerType(e.target.value)}>
                <option value="company">Company</option>
                <option value="private">Private</option>
              </select>
            </div>
            
            {customerType === 'private' && (
              <>
               <div className="card-deck">
                <div className="card">
                  <legend>Personal form</legend>
                  <label className="form-label">Gender:</label>
                  <div>
                    <label className="form-check-label me-2">
                      <input type="radio" value="Male" checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} className="form-check-input" /> Mr
                    </label>
                    <label className="form-check-label">
                      <input type="radio" value="Female" checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} className="form-check-input" /> Mrs.
                    </label>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className='b-radius'>
                  <label className="form-label">First Name:</label>
                  <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(capitalizeFirstLetter(e.target.value))} required />
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="form-label">Middle Name:</label>
                  <input type="text" className="form-control" value={middleName} onChange={(e) => setMiddleName(capitalizeFirstLetter(e.target.value))} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name:</label>
                  <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(capitalizeFirstLetter(e.target.value))} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Full Name:</label>
                  <input type="text" className="form-control" value={handleFullName()} readOnly />
                </div>

                <div className="mb-3">
                  <label className="form-label">Mobile Number:</label>
                  <input type="text" className="form-control" value={mobile} onChange={handleMobileChange} required pattern="\d{10}" />
                </div>
                <div className='card'>
                <div className="mb-3">
                  <label className="form-label">Birthday:</label>
                  <input type="date" className="form-control" value={birthday} onChange={handleBirthdayChange} required />
                  {dobError && <div className="text-danger mt-2">{dobError}</div>}
                </div>

                <div className="card">
                  <div className='success'>
                  <label className="form-label">Age:</label>
                  <div className="list-group-item">Years: {ageComponents.years}</div>
                  <div className="c">Months: {ageComponents.months}</div>
                  <div className="form-text">Days: {ageComponents.days}</div>
                  </div>
                </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Address:</label>
                  <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </>

            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default InsuranceFor;
