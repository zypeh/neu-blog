import Document from './hello.mdx'
import { Helmet } from "react-helmet"

export default () => (
    <main>
        <Helmet>
            <title>767D</title>
            <meta
                name="description"
                content="Next generation web log for 767D."
            />
        </Helmet>
        <Document />
    </main>
)
