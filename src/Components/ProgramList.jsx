import React, { useState, useEffect } from 'react';

const App = () => {
  // State to hold all fetched products/programs
  const [programs, setPrograms] = useState([]);
  
  // Holds product selected for "eye icon" modal (smaller detail view)
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // Holds product selected for full page modal when clicking on product name
  const [fullViewProgram, setFullViewProgram] = useState(null);
  
  // Quantity selected for the product in the modal (default 1)
  const [quantity, setQuantity] = useState(1);
  
  // Cart items with quantity stored here
  const [cart, setCart] = useState([]);
  
  // Flag to show temporary "added to cart" message
  const [addedMessage, setAddedMessage] = useState(false);
  
  // Controls visibility of the cart modal
  const [showCartModal, setShowCartModal] = useState(false);

  // Fetch product data from API once when component mounts
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())               // Parse JSON response
      .then(data => setPrograms(data.products))  // Save products in state
      .catch(error => console.error('Error fetching products:', error)); // Log errors
  }, []);

  // Styles for quantity buttons (- and +)
  const qtyBtnStyle = {
    padding: '5px 10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  };

  // Style for "Add to Cart" button in full view modal
  const cartBtnStyle = {
    padding: '10px 15px',
    fontWeight: 'bold',
    backgroundColor: '#f0c14b',
    border: '1px solid #a88734',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1,
    marginRight: '10px',
  };

  // Style for "Buy Now" button in full view modal
  const buyBtnStyle = {
    padding: '10px 15px',
    fontWeight: 'bold',
    backgroundColor: '#ff9900',
    border: '1px solid #cc7a00',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    flex: 1,
  };

  // Close modals and reset quantity & messages
  const handleClose = () => {
    setSelectedProgram(null);   // Close eye icon modal
    setFullViewProgram(null);   // Close full view modal
    setQuantity(1);             // Reset quantity to 1
    setAddedMessage(false);     // Hide added message
  };

  // Add product to cart with given quantity
  const handleAddToCart = (program, qty) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItem = prevCart.find(item => item.id === program.id);
      if (existingItem) {
        // Update quantity if exists
        return prevCart.map(item =>
          item.id === program.id ? { ...item, quantity: item.quantity + qty } : item
        );
      } else {
        // Otherwise add new item with quantity
        return [...prevCart, { ...program, quantity: qty }];
      }
    });

    setAddedMessage(true);                 // Show temporary "added" message
    setTimeout(() => setAddedMessage(false), 1000); // Hide message after 1 second
    setQuantity(1);                       // Reset quantity selector to 1
  };

  // Quick add single quantity of product directly to cart from product card
  const handleQuickAdd = (program) => {
    const existing = cart.find(item => item.id === program.id);
    if (existing) {
      // Increase quantity by 1 if already in cart
      setCart(cart.map(item =>
        item.id === program.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add new item with quantity 1
      setCart([...cart, { ...program, quantity: 1 }]);
    }
  };

  // Remove product from cart by ID
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Simulate buying product immediately (currently alerts)
  const handleBuyNow = (program) => {
    alert(`Buying ${quantity} x ${program.title}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Cart button fixed at top-right with item count */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          backgroundColor: 'rgb(114, 0, 0)',
          border: '1px solid black',
          borderRadius: '5px',
          padding: '10px 15px',
          cursor: 'pointer',
          fontWeight: 'bold',
          zIndex: 1000,
          color: '#fff',
        }}
        onClick={() => setShowCartModal(true)}  // Open cart modal on click
      >
        🛒 Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)}) {/* Total quantity */}
      </div>

      {/* Title */}
      <h1>Product List</h1>

      {/* Product cards container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {programs.map(program => (
          <div
            key={program.id}
            style={{
              width: '250px',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              height: '380px',
              position: 'relative',
            }}
          >
            {/* Image container */}
            <div
              className="image-wrapper"
              style={{
                position: 'relative',
                width: '100%',
                height: '150px',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              {/* Product thumbnail */}
              <img
                src={program.thumbnail}
                alt={program.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Quick Add button, appears on hover */}
              <button
                onClick={() => handleQuickAdd(program)}
                className="quick-add-btn"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '8px 15px',
                  border: 'none',
                  borderRadius: '5px',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                  cursor: 'pointer',
                }}
              >
                Quick Add
              </button>

              {/* Eye icon button to open small modal */}
              <button
                onClick={() => setSelectedProgram(program)}
                className="eye-icon"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'rgb(255, 255, 255)',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '6px',
                  cursor: 'pointer',
                  color: '#000',
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
                title="View Details"
              >
                <i className="fa-solid fa-eye"></i>
              </button>
            </div>

            {/* Product title (clickable for full page modal) */}
            <h3
              style={{ cursor: 'pointer' }}
              onClick={() => setFullViewProgram(program)}  // Open full view modal on click
            >
              {program.title}
            </h3>

            {/* Product price */}
            <p>${program.price}</p>

            {/* Add to Cart button below product info */}
            <button
              onClick={() => handleQuickAdd(program)}
              style={{ marginTop: 'auto' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Modal (shown when user clicks cart icon) */}
      {showCartModal && (
        <div
          onClick={() => setShowCartModal(false)}  // Close modal on background click
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)',  // dark overlay
            zIndex: 10001,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Modal content box */}
          <div
            onClick={(e) => e.stopPropagation()}  // Prevent closing modal when clicking inside content
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              width: '500px',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
              color: 'black',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowCartModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ✖
            </button>

            {/* Cart heading */}
            <h2>Cart</h2>

            {/* If cart is empty show message */}
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              // Show each cart item
              cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '10px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                  }}
                >
                  {/* Item details */}
                  <div style={{ flex: 1 }}>
                    <strong>{item.title}</strong>
                    <br />
                    Quantity: {item.quantity} — ${item.price}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    style={{
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: '5px',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Eye Icon Modal*/}
      {selectedProgram && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9998,
          }}
          onClick={handleClose}  // Close modal when clicking outside content
        >
          {/* Modal content box */}
          <div
            onClick={e => e.stopPropagation()}  // Prevent close when clicking inside
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              width: '700px',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
              color: 'black',
              display: 'flex',
              gap: '20px',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#333',
              }}
            >
              &times;
            </button>

            {/* Image section */}
            <div style={{ flex: 1 }}>
              <img
                src={selectedProgram.thumbnail}
                alt={selectedProgram.title}
                style={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            </div>

            {/* Details section */}
            <div style={{ flex: 1 }}>
              <h2>{selectedProgram.title}</h2>
              <p>{selectedProgram.description}</p>
              <p><strong>Price:</strong> ${selectedProgram.price}</p>
              <div style={{ marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>
                <strong>Rating:</strong>{' '}
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < Math.round(selectedProgram.rating) ? '#DAA520' : '#ccc',
                      marginRight: '2px',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full View Modal for product name click */}
      {fullViewProgram && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}
          onClick={handleClose} // Close modal on background click
        >
          <div
            onClick={e => e.stopPropagation()} // Prevent closing modal when clicking inside
            style={{
              backgroundColor: 'white',
              padding: '20px',         
              borderRadius: '0',       
              width: '100vw',       
              height: '100vh',        
              overflowY: 'auto',
              position: 'relative',
              color: 'black',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start',
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#333',
              }}
            >
              &times;
            </button>

            {/* Left side: product image */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <img
                src={fullViewProgram.thumbnail}
                alt={fullViewProgram.title}
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            </div>

            {/* Right side: product details and controls */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2>{fullViewProgram.title}</h2>

              {/* Description grows to fill vertical space */}
              <p style={{ flexGrow: 1 }}>{fullViewProgram.description}</p>

              <p><strong>Price:</strong> ${fullViewProgram.price}</p>

              {/* Rating stars */}
              <div style={{ marginTop: '10px', fontSize: '20px', fontWeight: 'bold' }}>
                <strong>Rating:</strong>{' '}
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < Math.round(fullViewProgram.rating) ? '#DAA520' : '#ccc',
                      marginRight: '2px',
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Quantity selector with label */}
              <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Quantity:</span>
                <button
                  style={qtyBtnStyle}
                  onClick={() => setQuantity(qty => (qty > 1 ? qty - 1 : 1))} // Decrement qty but not below 1
                >
                  -
                </button>
                <span style={{ fontSize: '18px' }}>{quantity}</span>
                <button
                  style={qtyBtnStyle}
                  onClick={() => setQuantity(qty => qty + 1)} // Increment qty
                >
                  +
                </button>
              </div>

              {/* Action buttons */}
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                  style={cartBtnStyle}
                  onClick={() => handleAddToCart(fullViewProgram, quantity)} // Add to cart with selected qty
                >
                  Add to Cart
                </button>
                <button
                  style={buyBtnStyle}
                  onClick={() => handleBuyNow(fullViewProgram)} // Simulate buy now
                >
                  Buy Now
                </button>
               <button
                  style={buyBtnStyle}
                  onClick={() => handleBuyNow(fullViewProgram)} // Simulate buy now
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS to show quick add and eye icon buttons on hover */}
      <style>
        {`
          .image-wrapper:hover .quick-add-btn,
          .image-wrapper:hover .eye-icon {
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  );
};

export default App;



