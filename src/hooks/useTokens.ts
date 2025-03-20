import { baseUrl } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

export type Token = {
    tick: string;
    max: string;
    lim: string;
    pre: string;
    to: string;
    dec: string;
    minted: string;
    opScoreAdd: string;
    opScoreMod: string;
    state: string;
    hashRev: string;
    mtsAdd: string;
    holderTotal: number;
    transferTotal: number;
    mintTotal: number;
    holder: {
        address: string;
        amount: string;
    }[];
}

const fetchToken = async (tokenSymbol: string): Promise<Token> => {
    const response = await fetch(`${baseUrl}/krc20/token/${tokenSymbol}`);

    const token = await response.json();
    return token.result[0]
}

const useToken = (searchValue: string) => {
    return useQuery({
        queryKey: ['token', searchValue],
        queryFn: () => fetchToken(searchValue),
        enabled: !!searchValue,
    })
}

export { useToken, fetchToken }
