import { faker } from "@faker-js/faker/locale/es";

export const generateProducts = () => {
  const categories = ["Hombre", "Mujer", "Niños"];
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    thumbnails: faker.image.urlLoremFlickr(),
    price: faker.commerce.price(),
    category: faker.helpers.arrayElement(categories),
    stock: faker.number.int({ min: 0, max: 20 }),
    id: faker.database.mongodbObjectId(),
    code: faker.string.alphanumeric(10),
  };
};
