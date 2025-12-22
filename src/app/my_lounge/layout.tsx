export default function LoungeLayout({
    children,
    overlay,
}: {
    children: React.ReactNode
    overlay: React.ReactNode
}) {
    return (
        <>
            {children}
            {overlay}
        </>
    )
}