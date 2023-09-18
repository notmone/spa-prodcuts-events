import { useState } from "react";

const Products = [
  { name: "p1", id: "p1" },
  { name: "p2", id: "p2" },
];
function NewProductsPage() {
  const [showCart, setShowCart] = useState(false);
  const toggleCartHandler = () => {
    setShowCart((showCart) => !showCart);
  };
  return (
    <div>
      <button onClick={toggleCartHandler}>show cart</button>
      {showCart && (
        <ul>
          {Products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default NewProductsPage;
