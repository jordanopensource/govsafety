/**
 * Created by salalem on 22/01/19.
 */
import React, {Component} from "react";
// import {withRouter} from "next/router";
// import {connect} from "react-redux";
import Landing from "../src/containers/landingPage";
import Layout from "../src/containers/layouts/mainLayout";


class Index extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <Layout {...this.props} locale={this.props.locale || "ar"}>
                <Landing/>
            </Layout>
        );
    }
}

export default Index;
