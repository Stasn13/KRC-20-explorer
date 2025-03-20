import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LockOpen, UsersRound } from "lucide-react"
import { Token } from "@/hooks/useTokens"
import { useEffect, useMemo, useState } from "react"
import { cn, currentDate, formatNumber, shortenAddress } from "@/lib/utils"
import { TransactionsData } from "@/hooks/useTransactionsData"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { logoUrl } from "@/lib/constants"

const skeletonTransaction = {
    hashRev: "e258fbb8026c596ed01bf201d480656cf46220f1136b4f80448550c7a7f1b583",
    from: "kaspa:qpavnhvchwg2500qckwkurwvxf6dk8zfjazc6skm80kv69s0frat6pneayzv2",
    to: "kaspa:qpavnhvchwg2500qckwkurwvxf6dk8zfjazc6skm80kv69s0frat6pneayzv2",
    amt: 287_000_000_000
};

type TokenViewProps = {
    commonData: Token;
    transactionsData?: TransactionsData;
    loadingTransactions: boolean;
    loadingCommon: boolean;
};

const TokenView = ({
    commonData,
    transactionsData,
    loadingTransactions,
    loadingCommon
}: TokenViewProps) => {
    const timestamp = useMemo(() => currentDate(), []);
    const totalSupply = useMemo(() => {
        if (commonData) {
            return Number(commonData.max) / (10 ** Number(commonData.dec))
        }
    }, [commonData.max, commonData.dec]);
    return (
        <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center">
                <Card className="inline-block mr-4 text-2xl font-bold inline-black bg-foreground-light">
                    {commonData.tick}
                </Card>
                <Avatar className="inline-block">
                    <AvatarImage src={`${logoUrl}/${commonData.tick}.jpg`} alt={`${commonData.tick}-logo`} />
                    <AvatarFallback>{commonData.tick}</AvatarFallback>
                </Avatar>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total supply
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${formatNumber(totalSupply || 0)} {commonData.tick}</div>
                        <p className="text-xs text-muted-foreground">
                            captured for {timestamp}
                        </p>
                    </CardContent>
                </Card>
                <Card
                    className={cn(loadingCommon && "animate-pulse blur-md")}
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Number of Holders
                        </CardTitle>
                        <UsersRound />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{commonData.holderTotal}</div>
                        <p className="text-xs text-muted-foreground">
                            captured for {timestamp}
                        </p>
                    </CardContent>
                </Card>
            </div>
            <Card className={cn(loadingTransactions && "animate-pulse blur-md", "w-full")}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold mb-2">
                        Latest Transactions
                    </CardTitle>
                    <LockOpen />
                </CardHeader>
                {(transactionsData || Array(50).fill(skeletonTransaction)).map((trx, index) => (
                    <div className="flex items-center mb-2" key={transactionsData ? trx.hashRev : index}>
                        <div className="ml-4 space-y-1 mr-2">
                            <p className="text-sm font-medium leading-none">{shortenAddress(trx.from)} to {shortenAddress(trx.to)}</p>
                            <p className="text-sm text-muted-foreground">
                                {trx.hashRev}
                            </p>
                        </div>
                        <div
                            className={cn(loadingTransactions && "animate-pulse blur-md", "ml-auto font-bold")}
                        >
                            {trx.amt}
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    )
}

export default TokenView