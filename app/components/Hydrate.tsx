"use client";

import { type ReactNode, useEffect, useState } from "react";

export default function Hydrate({ children }: { children: ReactNode }) {
	const [hydrated, setHydrated] = useState(false);

	// wait till nextjs hydration is complete
	useEffect(() => {
		setHydrated(true);
	}, []);

	if (!hydrated) return <div>Loading...</div>;

	return <>{children}</>;
}
