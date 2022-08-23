/**
 * Created by salalem on 22/01/19.
 */
import React from "react";
import Document, {Head, Main, NextScript} from "next/document";
// import {ServerStyleSheets} from '@material-ui/styles'
import {SheetsRegistry, JssProvider, createGenerateId} from 'react-jss'
import getPageContext from '../src/createPageContext'
import flush from "styled-jsx/server";


class MyDocument extends Document {
    render() {
        const pageContext = getPageContext();
        // const direction = rtlDetect.getLangDir(language);
        // const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;
        // console.log("DOCUMENT");

        return (
            <html>
            <title>SSL Mapping</title>
            <Head>
                <meta charSet="utf-8"/>

                {/*<script*/}
                {/*dangerouslySetInnerHTML={{*/}
                {/*__html: `*/}
                {/*let vh = window.innerHeight * 0.01;*/}
                {/*document.documentElement.style.setProperty('--vh', vh + "px");*/}

                {/*window.addEventListener('resize', () => {*/}
                {/*let vh = window.innerHeight * 0.01;*/}
                {/*document.documentElement.style.setProperty('--vh', vh + "px");*/}
                {/*});*/}
                {/*`*/}
                {/*}}*/}
                {/*/>*/}
                {/*<meta name="viewport"*/}
                {/*content="user-scalable=yes,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"*/}
                {/*/>*/}

                <link href='https://fonts.googleapis.com/css?family=Almarai' rel='stylesheet'/>
                <link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet'/>
                <link href="/static/App.css" rel="stylesheet"/>

            </Head>
            <body id={"bodyMainContainer"}
                  style={{background: pageContext.theme.palette.background.grayDark}}>
            <Main/>
            <NextScript/>
            </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = ctx => {
    console.log("documentinital")
    let pageContext;


    // let css;getPageContext
    // if (pageContext) {
    //     css = pageContext.sheetsRegistry.toString();
    // }

    return {

        html: "<div></div>",
        styles: (
            <React.Fragment>
                <style
                    id="jss-server-side"
                />
                {flush() || null}
            </React.Fragment>
        ),
    };
};

export default MyDocument;

//
// MyDocument.getInitialProps = async (ctx) => {
//     // Resolution order
//     //
//     // On the server:
//     // 1. app.getInitialProps
//     // 2. page.getInitialProps
//     // 3. document.getInitialProps
//     // 4. app.render
//     // 5. page.render
//     // 6. document.render
//     //
//     // On the server with error:
//     // 1. document.getInitialProps
//     // 2. app.render
//     // 3. page.render
//     // 4. document.render
//     //
//     // On the client
//     // 1. app.getInitialProps
//     // 2. page.getInitialProps
//     // 3. app.render
//     // 4. page.render
//
//     // Render app and page and get the context of the page with collected side effects.
//     // const sheets = new ServerStyleSheets();
//     // const originalRenderPage = ctx.renderPage;
//     //
//     // ctx.renderPage = () =>
//     //   originalRenderPage({
//     //     enhanceApp: App => props => sheets.collect(<App {...props} />),
//     //   });
//     //
//     // const initialProps = await Document.getInitialProps(ctx);
//     //
//     // return {
//     //   ...initialProps,
//     //   // Styles fragment is rendered after the app and page rendering finish.
//     //   styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
//     // };
//     const registry = new SheetsRegistry();
//     let css=registry.toString();
//     const generateId = createGenerateId()
//     const originalRenderPage = ctx.renderPage;
//     ctx.renderPage = () =>
//         originalRenderPage({
//             enhanceApp: App => props => (
//                 <JssProvider registry={registry} generateId={generateId}>
//                     <App {...props} />
//                 </JssProvider>
//             ),
//         })
//
//     const initialProps = await Document.getInitialProps(ctx)
//
//     return {
//         ...initialProps,
//         styles: (
//             <React.Fragment>
//                 {initialProps.styles}
//                <style
//                     id="jss-server-side"
//                     dangerouslySetInnerHTML={{__html: css}}
//                 />
//             </React.Fragment>
//         ),
//     }
// };

// export default MyDocument;