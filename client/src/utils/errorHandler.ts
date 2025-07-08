export const getApiErrorMessage = (error: unknown): string => {
    if (typeof error === 'string') return error;
    if (error instanceof Error) {
        const axiosError = error as {
            response?: {

                data?: {
                    code?: {

                        message?: string;
                    }
                };

            };
        };

        return (
            axiosError?.response?.data?.code?.message ||
            error.message ||
            "An unknown error occurred"
        );
    }

    return "An unknown error occurred";

};