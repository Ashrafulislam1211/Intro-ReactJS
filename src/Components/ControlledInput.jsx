import React, { useState } from 'react';

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    // console.log(e.target.value); 
    setInputValue(e.target.value); 
  };

  return (
    <div>
      <h1>Controlled Input Example</h1>
      <input 
        value={inputValue} 
        onChange={handleChange} 
        type="text" 
        placeholder="Enter here" 
      />
      <p>Inputed value: {inputValue}</p>
    </div>
  );
};

export default ControlledInput;



