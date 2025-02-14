import axios, { AxiosResponse } from "axios";
import { TransactionDto } from "../models/transactionDto";
import { API_BASE_URL } from "../../config";

const transactionService = {

    getTransactions: async (): Promise<TransactionDto[]> => {
        try {
            const response: AxiosResponse<TransactionDto[]> =
                await axios.get(`${API_BASE_URL}/transactions`);
            return response.data;
        } catch (error) {
            console.log("Error fetching transactions:", error);
            throw error;
        }
    },

    createTransaction: async (transaction: TransactionDto): Promise<TransactionDto> => {
        try {
            const response = await axios.post<TransactionDto>(`${API_BASE_URL}/transactions`, transaction);
            return response.data;
        } catch (error) {
            console.log("Error creating transaction", error)
            throw error;
        }
    },

    getTransactionById: async (TransactionId: number): Promise<TransactionDto | undefined> => {
        try {
            const response = await axios.get<TransactionDto>(`${API_BASE_URL}/Transactions/${TransactionId}`);
            return response.data;
        } catch (error) {
            console.log("Error fetching Transaction:", error);
            throw error;
        }
    }

}
export default transactionService;