
import SearchModule from "./SearchModule"
import TokenView from "./TokenView"
import { useToken } from "@/hooks/useTokens"
import { Suspense, useState } from "react"
import { useTransactionsData } from "@/hooks/useTransactionsData"

const Dashboard = () => {
    const [value, setValue] = useState<string>("");
    const { data, isLoading, isError } = useToken(value);
    const { data: dataTransactions, isLoading: loadingTransactions } = useTransactionsData(value);

    return (
        <Suspense>
            <main>
                <SearchModule onValueSet={setValue} />
                {data && value && !isError &&
                    <TokenView
                        commonData={data}
                        loadingCommon={isLoading}
                        transactionsData={dataTransactions}
                        loadingTransactions={loadingTransactions}
                    />}
            </main>
        </Suspense>
    )
}

export default Dashboard