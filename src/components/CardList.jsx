import Card from "./Card";
import Button from "./Button";
import Search from "./Search";
import React, { useState } from "react";

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [tag, setTag] = useState("");
  const filtered = tag
    ? data.filter(product => product.tags.some(({ title }) => title.toLowerCase() === tag))
    : data;
  const products = filtered.slice(offset, offset + limit);

  const filterTags = query => {
    setTag(query.trim().toLowerCase());
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map(product => <Card key={product.id} {...product} />)}
      </div>
      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => setOffset(value => Math.max(0, value - limit))} />
        <Button text="Next" handleClick={() => setOffset(value => value + limit < filtered.length ? value + limit : value)} />
      </div>
    </div>
  );
};

export default CardList;
