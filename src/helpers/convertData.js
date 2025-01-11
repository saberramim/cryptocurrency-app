// Function to convert data based on the specified type
const convertData = (data, type) => {
  const convertedData = data[type].map((item) => {
    return {
      date: item[0],
      [type]: item[1],
    };
  });
  return convertedData;
};
export { convertData };
