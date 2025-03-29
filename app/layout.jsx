import '@/app/global.css'
import Provider from '@/components/Provider'

export const metadata = {
    title: 'COTAM',
    descriptions: 'Course Outcome Taxonomy Analytics and Mappings'
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <main>
                    <Provider>
                        {children}
                    </Provider>
                </main>
            </body>
        </html>
    )
} 

export default RootLayout