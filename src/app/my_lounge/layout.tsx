export default function LoungeLayout({
    children,
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <>
            {children}
            {modal}
        </>
    )
}