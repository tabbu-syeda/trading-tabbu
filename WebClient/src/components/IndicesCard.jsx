import React from "react";

// IndicesCard component to display index data
// It expects an 'index' prop which is an object containing index data
// The component maps through the keys of the index object and displays relevant information
// It skips the 'name' key and formats the last price and change percentage
const IndicesCard = ({ index }) => {
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
          <div
            className="py-2"
            key={item.instrument_token}
            style={{ paddingRight: "20px" }}
          >
            <p className="text-lg text-white">
              <span className="text-[16px]">
                {getIndiceName(item.instrument_token)}
              </span>
              <span className="text-[14px]">
                <span className="ml-3 text-gray-300">{item.last_price}</span>
                <span
                  className={`${
                    item.last_price > item.cp
                      ? "text-green-500"
                      : "text-red-500"
                  } px-3`}
                >
                  <span className="pl-1">
                    {Math.abs(item.last_price - item.cp).toFixed(2)}
                  </span>
                  <span className="px-1">
                    (
                    {((item.last_price - item.cp) / item.cp) * 100 > 0
                      ? "+"
                      : "-"}
                    {Math.abs(
                      ((item.last_price - item.cp) / item.cp) * 100
                    ).toFixed(2)}
                    %)
                  </span>
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
