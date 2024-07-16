import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure to import your CSS file

function App() {
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/get');
            setItems(response.data);
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newItem = { title, body };
            const response = await axios.post('http://localhost:5000/add', newItem);
            setItems([...items, response.data]);
            setTitle('');
            setBody('');
        } catch (error) {
            console.error('There was an error adding the item!', error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                {/* Items List */}
                <div className="list-container">
                    <h1>Items List</h1>
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                <h2>{item.title}</h2>
                                <p>{item.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Add Item Form */}
                <div className="form-container">
                    <h2>Add Item</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Add Item</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
