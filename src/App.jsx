import React from 'react';
import MultiSelectDropdown from './MultiSelectDropdown';

const categories = [
  {
    label: 'Category 1',
    options: [
      { label: 'Option 1', value: 'option1', disabled: false },
      { label: 'Option 2', value: 'option2', disabled: true },
    ],
  },
  {
    label: 'Category 2',
    options: [
      { label: 'Option 3', value: 'option3', disabled: false },
      { label: 'Option 4', value: 'option4', disabled: false },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <h1>Multi-Select Dropdown with Categories</h1>
      <MultiSelectDropdown categories={categories} />
      <p>HELLO WORLD!</p>
    </div>
  );
}

export default App;
