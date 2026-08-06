let ioInstance = null;

export const initIO = (io) => {
  ioInstance = io;
};

export const getIO = () => ioInstance;

export default {
  initIO,
  getIO,
};
