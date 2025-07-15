const items = ["Item 1", "Item 2", "Item 3", "Item 1", "Item 2", "Item 3"];

const Map = () => {
  return (
    <div>
        <ul>
            {items.map((items, index) => (
                <li key={index}>{items}</li>
            ))}
        </ul>
    </div>
  )
}

export default Map
