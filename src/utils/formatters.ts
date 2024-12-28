export const formatCurrency = (price: string) => {
  price = price.replace("$", "").replace(",", "");
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return USDollar.format(Number(price));
};

export const formatDate = (input: string) => {
  const date = new Date(input.replace(" ", ""));
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return month + "/" + day + "/" + year;
};
