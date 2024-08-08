import React, { useState, useRef, useEffect } from 'react';

const MultiSelectDropdown = ({ categories }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectOption = (option) => {
    if (selectedOptions.includes(option.value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option.value));
    } else {
      setSelectedOptions([...selectedOptions, option.value]);
    }
  };

  const toggleSelectAll = () => {
    const allOptions = categories.flatMap(category =>
      category.options.filter(option => !option.disabled).map(option => option.value)
    );
    const allSelected = allOptions.every(option => selectedOptions.includes(option));
    
    if (allSelected) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(allOptions);
    }
  };

  const handleCategorySelectAll = (category) => {
    const categoryOptions = category.options.filter(option => !option.disabled).map(option => option.value);
    const areAllSelected = categoryOptions.every(option => selectedOptions.includes(option));

    if (areAllSelected) {
      setSelectedOptions(selectedOptions.filter(option => !categoryOptions.includes(option)));
    } else {
      setSelectedOptions([...selectedOptions, ...categoryOptions.filter(option => !selectedOptions.includes(option))]);
    }
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    options: category.options.filter(option => 
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const allOptions = categories.flatMap(category =>
    category.options.filter(option => !option.disabled).map(option => option.value)
  );
  const allSelected = allOptions.every(option => selectedOptions.includes(option));

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block', width: "500px" }}>
      <div onClick={handleDropdownToggle} style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}>
        {selectedOptions.length === 0 ? 'Select options' : selectedOptions.map((value, index) => {
          const option = categories.flatMap(cat => cat.options).find(opt => opt.value === value);
          return (
            <span key={index} style={{ marginRight: '8px' }}>
              {option?.label}
              <span onClick={(e) => { e.stopPropagation(); handleSelectOption(option); }} style={{ marginLeft: '4px', cursor: 'pointer' }}>×</span>
            </span>
          );
        })}
      </div>

      {isDropdownOpen && (
        <div style={{ position: 'absolute', width: "500px", top: '100%', left: 0, zIndex: 1, border: '1px solid #ccc', padding: '8px', marginTop: '4px', borderRadius: '4px', backgroundColor: 'white', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
            />
            <label style={{ marginLeft: '4px' }}>{allSelected ? 'Deselect All' : 'Select All'}</label>
          </div>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ marginBottom: '8px', padding: '4px', width: '100%' }}
          />
          
          <div>
            {filteredCategories.map((category, index) => (
              <div key={index} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={category.options.every(option => selectedOptions.includes(option.value))}
                    onChange={() => handleCategorySelectAll(category)}
                  />
                  <label style={{ marginLeft: '4px' }}>{category.label}</label>
                </div>
                <div style={{ marginLeft: '16px' }}>
                  {category.options.map((option, i) => (
                    <div key={i} style={{ marginBottom: '4px', display: 'flex', alignItems: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.value)}
                        disabled={option.disabled}
                        onChange={() => handleSelectOption(option)}
                      />
                      <label style={{ marginLeft: '4px' }}>{option.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
