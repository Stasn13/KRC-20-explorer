import Link from "next/link"
import { Card } from "./ui/card"
import { LayoutDashboard, Search } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Switch } from "./ui/switch"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const Navigation = () => {
    const [darkMode, setDarkMode] = useState(false)

    useEffect(() => { 
        // to solve hydration issue and keep component ssr, might be solved with cache later
        if (localStorage.darkTheme === "1") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("darkTheme", !darkMode ? "1" : "0");
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(!darkMode ? "dark" : "light");
    }

    return (
        <TooltipProvider delayDuration={200}>
            <Card className="bg-foreground-light !h-[fit-content] flex flex-col gap-4 pt-4 px-2 pb-6 mt-4 items-center">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/"
                            className="[&.active]:border-white rounded-lg border border-transparent transition"
                        >
                            <LayoutDashboard />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>To Home page</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link
                            href="/?token=NACHO"
                            className="[&.active]:border-white rounded-lg border border-transparent transition"
                        >
                            <Search />
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>Search NACHO token</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/* className="mt-2" */}
                        <Switch
                            checked={darkMode}
                            className={cn(darkMode ? "bg-primary" : "bg-input", "mt-2")}
                            onCheckedChange={toggleDarkMode}
                        />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>Switch to the dark mode</p>
                    </TooltipContent>
                </Tooltip>
            </Card>
        </TooltipProvider>
    )
}

export default Navigation