// import { cn } from "@/utils";
import { ReactNode } from "react";

// interface MaxWidthWrapperProps {
// 	className?: string;
// 	children: ReactNode;
// }

export const MaxWidth = ({ children }: { children: ReactNode }) => {
	return <div className="w-full md:w-3/4">{children}</div>;
};
