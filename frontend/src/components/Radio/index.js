import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

function Input({ name, options }) {
  const inputRefs = useRef([]);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      path: 'value',
      getValue(refs) {
        const checked = refs.find(ref => ref.checked);

        return checked ? checked.value : null;
      },
      setValue(refs, value) {
        const item = refs.find(ref => ref.value === value);

        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <div>
      {options.map((option, index) => (
        <label key={option.id} htmlFor={fieldName}>
          <input
            ref={elRef => {
              inputRefs.current[index] = elRef;
            }}
            type="radio"
            name={fieldName}
            value={option.id}
            defaultChecked={defaultValue === option.id}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default Input;
