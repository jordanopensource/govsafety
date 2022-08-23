/**
 * Created by salalem on 22/01/19.
 */
import React, {Component} from "react";
// import {withRouter} from "next/router";
// import {connect} from "react-redux";
import Imp from "../src/containers/importance";
import Layout from "../src/containers/layouts/mainLayout";


class Page extends Component {


    render() {
        return (
            <Layout {...this.props} locale={this.props.locale || "ar"}>
                <Imp/>
            </Layout>
        );
    }
}

export default Page;
