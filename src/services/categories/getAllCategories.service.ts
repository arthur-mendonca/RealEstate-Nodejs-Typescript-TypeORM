import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";

const getAllCategoriesService = async (): Promise<Category[]> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const getAllCategories = await categoryRepo.find();

  return getAllCategories;
};

export default getAllCategoriesService;
