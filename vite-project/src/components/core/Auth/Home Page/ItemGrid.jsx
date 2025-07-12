import React from "react";
import ItemCard from "./itemCard";
import { Button } from "../ui/button";

import item1 from "../../assets/item-1.jpg";
import item2 from "../../assets/item-2.jpg";
import item3 from "../../assets/item-3.jpg";
import item4 from "../../assets/item-4.jpg";

const mockItems = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    image: item1,
    size: "M",
    condition: "Excellent",
    points: 120,
    category: "Jackets",
    seller: "Sarah",
    rating: 4.9,
    liked: false,
  },
  {
    id: "2",
    title: "Floral Summer Dress",
    image: item2,
    size: "S",
    condition: "Good",
    points: 85,
    category: "Dresses",
    seller: "Emma",
    rating: 4.7,
    liked: true,
  },
  {
    id: "3",
    title: "Classic White Sneakers",
    image: item3,
    size: "8",
    condition: "Fair",
    points: 65,
    category: "Shoes",
    seller: "Mike",
    rating: 4.5,
    liked: false,
  },
  {
    id: "4",
    title: "Wool Winter Coat",
    image: item4,
    size: "L",
    condition: "Excellent",
    points: 200,
    category: "Coats",
    seller: "Lisa",
    rating: 5.0,
    liked: true,
  },
];

const ItemGrid = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Items</h2>
          <p className="text-xl text-gray-600">
            Discover amazing pre-loved fashion pieces from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mockItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "both",
              }}
            >
              <ItemCard {...item} />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
          >
            View All Items
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ItemGrid;
