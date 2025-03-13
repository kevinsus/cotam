import '@/app/global.css'

export const metadata = {
    title: 'COTAM',
    descriptions: 'Course Outcome Taxonomy Analytics and Mappings'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
} 

export default RootLayout