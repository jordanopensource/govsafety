/**
 * Created by salalem on 22/01/19.
 */
import React, {Component} from "react";
// import {withRouter} from "next/router";
// import {connect} from "react-redux";
import About from "../src/containers/about";
import Layout from "../src/containers/layouts/mainLayout";


class Index extends Component {


    render() {
        return (
            <Layout {...this.props} locale={this.props.locale || "ar"}>
                <About/>
            </Layout>
        );
    }
}

export default Index;
