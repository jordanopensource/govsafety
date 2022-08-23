/**
 * Created by salalem on 22/01/19.
 */
import React from "react";
import App from "next/app";
import {MuiThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import getPageContext from '../src/createPageContext'
import {IntlProvider} from "react-intl";
// import {JssProvider} from "react-jss";
import JssProvider from "react-jss/lib/JssProvider";
// import {SheetsRegistry, create} from "jss";
import translations from "../translations.json"
import Head from 'next/head';
import Router from 'next/router'

// import {createGenerateClassName, jssPreset} from "@material-ui/core/styles";

class Main extends App {

    // constructor(props) {
    //     super(props)
    //     let jss = create({plugins: [...jssPreset().plugins]});
    //     this.jss = jss;
    //
    // }
    //

    constructor(props) {
        super(props);
        this.pageContext = getPageContext();


    }

    //
    // static async getInitialProps(context) {
    //   const {Component, ctx} = context;
    //   let pageProps = {};
    //
    //   if (Component.getInitialProps) {
    //     pageProps = await Component.getInitialProps(ctx);
    //   }
    //
    //   const initialNow = Date.now();
    //
    //   const userAgent = ctx.req ? ctx.req.headers["user-agent"] : navigator.userAgent;
    //
    //   return {
    //     pageProps: pageProps, userAgent: userAgent,
    //     initialNow: initialNow, store: ctx.store,
    //   };
    // }

    //
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const {Component, pageProps} = this.props;
        console.log("router", Router, Router.query)
        let myLanguage = "ar";
        if (Router.query && Router.query.lang && Router.query.lang.toLowerCase() === "en")
            myLanguage = "en";
        return (
            <React.Fragment>
                <Head>
                    <title>SSL Mapping</title>
                    <link rel="icon" type="image/ico" href="static/thumbnail.png"/>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                </Head>
                <JssProvider
                    jss={this.pageContext.jss}
                    registry={this.pageContext.sheetsRegistry}
                    generateClassName={this.pageContext.generateClassName}
                >
                    <MuiThemeProvider
                        theme={this.pageContext.theme}
                        sheetsManager={this.pageContext.sheetsManager}
                    >
                        <CssBaseline/>
                        <IntlProvider locale={myLanguage} messages={translations[myLanguage]}>
                            <Component locale={myLanguage} onLangChange={(lang) => Router.push(`${Router.route}?lang=${lang}`)}
                                       pageContext={this.pageContext}  {...pageProps}/>
                        </IntlProvider>
                    </MuiThemeProvider>
                </JssProvider>

            </React.Fragment>
        );
    }

}

//s
export default Main
