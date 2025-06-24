export const changeName = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error("Something went wrong!"));
      resolve({ newName: name });
    }, 1000);
  });
};
