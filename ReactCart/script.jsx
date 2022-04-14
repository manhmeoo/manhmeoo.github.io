const { useState } = React;

const NavBar = ({ quantity }) => {
  return (
    <div className="navbar">
      <h1>UseReducer</h1>
      <div className="Cart">
        <i className="fa-solid fa-cart-shopping"></i>
        <p>{quantity}</p>
      </div>
    </div>
  );
};

const Product = ({
  id,
  title,
  onDelete,
  price,
  img,
  quantity,
  onIncrease,
  onDecrease,
}) => {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleIncrease = () => {
    onIncrease(id);
  };

  const handleDecrease = () => {
    onDecrease(id);
  };

  return (
    <li className="product-item">
      <div className="col-left">
        <div>
          <img className="img" src={img} />
        </div>
        <div>
          <div> {title}</div>
          <div> {price}</div>
          <button onClick={handleDelete}>Del</button>
        </div>
      </div>
      <div className="col-right">
        <div style={{ fontSize: "25px" }} onClick={handleIncrease}>
          +
        </div>
        <div>{quantity}</div>
        <div style={{ fontSize: "25px" }} onClick={handleDecrease}>
          -
        </div>
      </div>
    </li>
  );
};

const ProductList = ({ product, onDelete, onIncrease, onDecrease }) => {
  return (
    <ul className="product-list">
      {product.map((product) => (
        <Product
          key={product.id}
          {...product}
          onDelete={onDelete}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </ul>
  );
};

const ProductSumary = ({ pending, handleClearAll, totalPrices }) => {
  if (pending > 0) {
    return (
      <div className="product-sumary">
        <h1>Total</h1>
        <div>{totalPrices}</div>
        <button onClick={handleClearAll}>Clear All</button>
      </div>
    );
  } else {
    return <div className="product-sumary">all done</div>;
  }
};

const App = () => {
  const [Products, setProducts] = useState([
    {
      id: 1,
      title: "Google Pixel",
      price: 499.9,
      quantity: 1,
      img: "https://dl.airtable.com/.attachments/91c88ae8c1580e2b762ecb3f73ed1eed/a633139a/phone-1_gvesln.png",
    },
    {
      id: 2,
      title: "Xiaomi Redmi Note 2",
      price: 699.99,
      quantity: 1,
      img: "https://dl.airtable.com/.attachments/bae9208dc34f35128749ecda5b999e84/337c285d/phone-3_h2s6fo.png",
    },
    {
      id: 3,
      title: "Samsung Galaxy S7",
      price: 599.99,
      quantity: 1,
      img: "https://dl.airtable.com/.attachments/91ee456448cef47deec553a2ea3fa8ad/b08bec68/phone-2_ohtt5s.png",
    },
  ]);

  const sumTotalPrice = (arr) =>
    arr.reduce((sum, { price, quantity }) => sum + price * quantity, 0);

  let totalPrices = sumTotalPrice(Products);

  const sumTotalQuantity = (arr) =>
    arr.reduce((sum, { quantity }) => sum + quantity, 0);

  let totalQuantity = sumTotalQuantity(Products);

  const handleDelete = (id) => {
    const newProducts = Products.filter((Products) => Products.id != id);
    setProducts(newProducts);
  };

  const handleClearAll = () => {
    setProducts([]);
  };

  const handleInCrease = (id) => {
    const newProducts = [...Products];
    newProducts.find((x) => x.id === id).quantity += 1;
    setProducts(newProducts);
  };

  const handleDeCrease = (id) => {
    const newProducts = [...Products];
    if (newProducts.find((x) => x.id === id).quantity >= 1)
      newProducts.find((x) => x.id === id).quantity -= 1;
    setProducts(newProducts);
  };

  return (
    <div className="app">
      <NavBar quantity={totalQuantity} />
      <div className="Cart-details">
        <h1>Your Bag</h1>
        <ProductList
          product={Products}
          onDelete={handleDelete}
          onIncrease={handleInCrease}
          onDecrease={handleDeCrease}
        ></ProductList>
        <ProductSumary
          handleClearAll={handleClearAll}
          pending={Products.length}
          totalPrices={totalPrices}
        ></ProductSumary>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
