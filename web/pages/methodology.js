/**
 * Created by salalem on 22/01/19.
 */
import React, {Component} from "react";
// import {withRouter} from "next/router";
// import {connect} from "react-redux";
import Meth from "../src/containers/methodology";
import Layout from "../src/containers/layouts/mainLayout";


class Page extends Component {


    render() {
        return (
            <Layout {...this.props} locale={this.props.locale || "ar"}>
                <Meth/>
            </Layout>
        );
    }
}

export default Page;
