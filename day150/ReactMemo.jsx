import React, { useState, useMemo, useCallback } from 'react';

// === Exercise 1: Memoized Child Component ===
const Child = React.memo(({ name, age }) => {
  console.log('Child rendered');
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
});

const Parent = () => {
  const [name, setName] = useState('John');
  const [age, setAge] = useState(30);

  return (
    <div>
      <Child name={name} age={age} />
      <button onClick={() => setName(name === 'John' ? 'Jane' : 'John')}>Toggle Name</button>
      <button onClick={() => setAge(age === 30 ? 31 : 30)}>Toggle Age</button>
    </div>
  );
};

// === Exercise 2: Memoized List Rendering ===
const ListItem = React.memo(({ item }) => {
  console.log('Item rendered:', item);
  return <li>{item}</li>;
});

const List = () => {
  const [items, setItems] = useState(['Apple', 'Banana', 'Cherry']);
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <ListItem key={index} item={item} />
        ))}
      </ul>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
    </div>
  );
};

// === Exercise 3: Memoizing a Button ===
const Button = React.memo(({ label, onClick }) => {
  console.log('Button rendered:', label);
  return <button onClick={onClick}>{label}</button>;
});

const ButtonApp = () => {
  const [count, setCount] = useState(0);
  const [label, setLabel] = useState('Click Me');

  const increment = () => setCount(count + 1);

  return (
    <div>
      <Button label={label} onClick={increment} />
      <p>Count: {count}</p>
      <button onClick={() => setLabel(label === 'Click Me' ? 'Clicked!' : 'Click Me')}>
        Toggle Label
      </button>
    </div>
  );
};

// === Exercise 4: Form with Memoized Input Fields ===
const InputField = React.memo(({ label, value, onChange }) => {
  console.log(`Rendering ${label}`);
  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
});

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <InputField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </form>
  );
};

// === Exercise 5: Memoized Image Gallery ===
const Image = React.memo(({ src, alt }) => {
  console.log(`Rendering image: ${alt}`);
  return <img src={src} alt={alt} />;
});

const Gallery = () => {
  const [images] = useState([
    { src: 'img1.jpg', alt: 'Image 1' },
    { src: 'img2.jpg', alt: 'Image 2' },
    { src: 'img3.jpg', alt: 'Image 3' },
  ]);

  return (
    <div>
      {images.map((image, index) => (
        <Image key={index} src={image.src} alt={image.alt} />
      ))}
    </div>
  );
};

// === Exercise 6: Memoized Filter Function ===
const UserList = () => {
  const [filter, setFilter] = useState('');
  const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jack' },
    { id: 4, name: 'Jill' },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()));
  }, [filter, users]);

  return (
    <div>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search users"
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

// === Exercise 7: Memoizing Expensive Calculations ===
const FactorialCalculator = () => {
  const [number, setNumber] = useState(0);

  const factorial = useMemo(() => {
    const calculateFactorial = (n) => (n === 0 ? 1 : n * calculateFactorial(n - 1));
    return calculateFactorial(number);
  }, [number]);

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <p>Factorial of {number}: {factorial}</p>
    </div>
  );
};

// === Exercise 8: Memoized Object Creation ===
const MemoizedObjectExample = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');

  const user = useMemo(() => ({ firstName, lastName }), [firstName, lastName]);

  return (
    <div>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <p>{`User: ${user.firstName} ${user.lastName}`}</p>
    </div>
  );
};

// === Exercise 9: Memoized Event Handler ===
const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(count + 1), [count]);

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
};

// === Exercise 10: Passing Callbacks to Child Components ===
const ButtonWithCallback = ({ onClick }) => {
  console.log('Button rendered');
  return <button onClick={onClick}>Increment</button>;
};

const ParentWithCallback = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount(count + 1), [count]);

  return (
    <div>
      <ButtonWithCallback onClick={increment} />
      <p>Count: {count}</p>
    </div>
  );
};

// === Rendering all exercises ===
const App = () => (
  <div>
    <h1>React Memoization Exercises</h1>
    <h2>1. Memoized Child Component</h2>
    <Parent />
    
    <h2>2. Memoized List Rendering</h2>
    <List />
    
    <h2>3. Memoizing a Button</h2>
    <ButtonApp />
    
    <h2>4. Form with Memoized Input Fields</h2>
    <Form />
    
    <h2>5. Memoized Image Gallery</h2>
    <Gallery />
    
    <h2>6. Memoized Filter Function</h2>
    <UserList />
    
    <h2>7. Memoizing Expensive Calculations</h2>
    <FactorialCalculator />
    
    <h2>8. Memoized Object Creation</h2>
    <MemoizedObjectExample />
    
    <h2>9. Memoized Event Handler</h2>
    <Counter />
    
    <h2>10. Passing Callbacks to Child Components</h2>
    <ParentWithCallback />
  </div>
);

export default App;
