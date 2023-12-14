import React, { useState } from "react";

const btnStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "5px 10px",
};

function Table({
  list,
  colNames,
  pageNum = 0,
  pageSize = 10,
  width = "auto",
  height = "auto",
  onSelect = null,
}) {
  const [page, setPage] = useState(pageNum);

  return (
    <div style={{ width: width, boxShadow: "3px 6px 3px #ccc" }}>
      {list.length > 0 && (
        <table
          cellSpacing="0"
          style={{
            width: "100%",
            height: height,
            padding: "10px",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              {colNames.map((headerItem, index) => (
                <th
                  key={index}
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  {headerItem.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(
              list.slice(pageSize * page, pageSize * page + pageSize)
            ).map((obj, index) => (
              <tr key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td
                    key={index2}
                    onClick={() => onSelect && onSelect(obj)}
                    style={{
                      padding: "10px",
                      textAlign: "left",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Table;
