import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const addItem = () => {
    if (editingIndex !== null) {
      const updatedItems = items.map((item, index) =>
        index === editingIndex ? newItem : item
      );
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, newItem]);
    }
    setNewItem({ name: '', price: '' });
  };

  const editItem = (index) => {
    setNewItem(items[index]);
    setEditingIndex(index);
  };

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>Danh Sách Hàng Hóa</h1>
      <input
        type="text"
        placeholder="Tìm kiếm hàng hóa..."
        className="search-bar"
        // Logic tìm kiếm có thể được bổ sung ở đây
      />
      <ul className="item-list">
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index} className="item">
              {item.name} - {item.price} VND
              <button onClick={() => editItem(index)} className="edit-btn">Chỉnh sửa</button>
              <button onClick={() => deleteItem(index)} className="delete-btn">Xóa</button>
            </li>
          ))
        ) : (
          <p>Không tìm thấy hàng hóa nào!</p>
        )}
      </ul>
      <div className="form-container">
        <h2>{editingIndex !== null ? 'Chỉnh sửa hàng hóa' : 'Thêm Hàng Hóa'}</h2>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="input-field"
        />
        <button onClick={addItem} className="submit-btn">
          {editingIndex !== null ? 'Cập nhật hàng hóa' : 'Thêm hàng hóa'}
        </button>
      </div>
    </div>
  );
}

export default App;
