export function connectOrCreate<T extends object>(data: T) {
  return {
    connectOrCreate: {
      create: data,
      where: data,
    },
  };
}
