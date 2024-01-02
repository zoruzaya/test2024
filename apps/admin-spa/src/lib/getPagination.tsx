export const getPagination = ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const zeroBasedPage = page - 1;
  const zeroBasedSize = size - 1;
  const limit = size ? Number(size) : 3;
  const from = page ? zeroBasedPage * limit : 0;
  const to = page ? from + zeroBasedSize : zeroBasedSize;

  return { from, to };
};
