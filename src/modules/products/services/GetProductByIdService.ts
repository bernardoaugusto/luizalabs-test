import AppError from '../../../shared/errors/AppError';
import { IProductDTO } from '../dtos/IProductDTO';
import axios from 'axios';

export default class GetProductByIdService {
    public async execute(productId: string): Promise<IProductDTO> {
        const url = `https://challenge-api.luizalabs.com/api/product/${productId}/`;

        try {
            return (await axios.get<IProductDTO>(url)).data;
        } catch (error: any) {
            throw new AppError(error.response.data.error_message);
        }
    }
}
