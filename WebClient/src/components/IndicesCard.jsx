import React from "react";

// IndicesCard component to display index data
// It expects an 'index' prop which is an object containing index data
// The component maps through the keys of the index object and displays relevant information
// It skips the 'name' key and formats the last price and change percentage
const IndicesCard = ({ index }) => {
  console.log("Index Data: ", index);
  for (let key in index) {
    console.log(`Key: ${key}, Value: ${index[key]}`);
  }
  const getIndiceName = (token) => {
    var splitVal = token.split("|")[1];
    return splitVal ? splitVal : token;
  };
  return (
    <>
      {Object.keys(index).map((key) => {
        if (key === "name") return null;
        const item = index[key];
        return (
          <div className="text-center" key={item.instrument_token}>
            <p className="text-xl">
              {getIndiceName(item.instrument_token)}
              <span
                className={`text-xl ${
                  item.last_price > item.cp ? "text-green-500" : "text-red-500"
                } px-3`}
              >
                <span>₹{item.last_price}</span>
                <span>
                  {((item.last_price - item.cp) / item.cp) * 100 > 0
                    ? "+"
                    : "-"}
                  {Math.abs(
                    ((item.last_price - item.cp) / item.cp) * 100
                  ).toFixed(2)}
                  %
                </span>
              </span>
            </p>
          </div>
        );
      })}
    </>
  );
};

export default IndicesCard;
