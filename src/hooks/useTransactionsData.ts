import { baseUrl } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

export type TransactionsData = {
    hashRev: string;
    p: string;
    op: string;
    tick: string;
    amt?: string | null;
    from: string;
    to: string;
    opScore: string;
    feeRev: string;
    txAccept: string;
    opAccept: string;
    opError: string;
    checkpoint: string;
    mtsAdd: string;
    mtsMod: string;
    max?: string | null;
    lim?: string | null;
    pre?: string | null;
    dec?: string | null;
}[];

const fetchTransactionsData = async (tick: string): Promise<TransactionsData> => {
    const transactionsResponse = await fetch(`${baseUrl}/krc20/oplist?tick=${tick}`);

    const obj = await transactionsResponse.json();
    return obj.result;
}

const useTransactionsData = (addr: string) => {
    return useQuery({
        queryKey: ['transactionsData', addr],
        queryFn: () => fetchTransactionsData(addr),
        enabled: !!addr,
    })
}

export { useTransactionsData, fetchTransactionsData }
