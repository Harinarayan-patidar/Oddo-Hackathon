import React from "react";
import { Heart, Star, Coins } from "lucide-react";
import { Badge } from "../../../../Ui/Badge";
import { Button } from "../../../../Ui/Button";

const ItemCard = ({
  title,
  image,
  size,
  condition,
  points,
  category,
  seller,
  rating,
  liked = false
}) => {
  const conditionColors = {
    Excellent: "bg-green-600 text-white",
    Good: "bg-yellow-600 text-white",
    Fair: "bg-red-400 text-white"
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Heart Icon */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition">
          <Heart
            className={`h-4 w-4 ${
              liked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-black/50 text-white border-0">
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-green-700 transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Size:</span>
            <Badge variant="secondary">{size}</Badge>
          </div>
          <Badge className={conditionColors[condition]}>{condition}</Badge>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {seller.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-500">{seller}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        {/* Points & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-green-600" />
            <span className="text-xl font-bold text-green-600">{points}</span>
            <span className="text-sm text-gray-500">points</span>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700 transition">
            Exchange
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
