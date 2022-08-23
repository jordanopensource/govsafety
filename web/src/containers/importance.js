import React from 'react';
import {Grid, withStyles, TextField, Hidden, Typography, Button, Tabs, Tab, Paper} from '@material-ui/core'
import {FormattedMessage} from "react-intl";

const styles = (theme) => ({
    root: {
        margin: "3em auto 8em",
        maxWidth: 1040,
        minHeight: "90vh",
        padding: "0.75em",
        [theme.breakpoints.down("sm")]: {
            padding: "1.5em",
            margin: "0em auto 3em",
        }
    },
    title: {
        fontWeight: "bold",
        fontSize: "1.6em",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.4em",
        },
        margin: "1em 0 0.5em"
    },
    content: {
        fontSize: "1.1em",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.0em",
        },

    }, contentTitle: {
        fontWeight: "bold",
        marginTop: "0.5em",
        fontSize: "1.1em",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.0em",
        },

    }

});

function Imp(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Typography variant={"h6"} className={classes.title}>
                <FormattedMessage id={"imp"}
                                  defaultMessage={"Introduction"}/>
            </Typography>
            <Typography className={classes.content}>
                <FormattedMessage id={"imp_content"}
                                  defaultMessage={"..."}/>
            </Typography>
            <Typography variant={"h6"} className={classes.title}>
                <FormattedMessage id={"benefits"}
                                  defaultMessage={""}/>
            </Typography>

            <ul>
                {[1, 2, 3, 4, 5].map((x) => <li><Typography className={classes.contentTitle}>
                    <FormattedMessage id={`ben${x}_title`}
                                      defaultMessage={"..."}/>
                </Typography>
                    <Typography className={classes.content}>
                        <FormattedMessage id={`ben${x}_content`}
                                          defaultMessage={"..."}/>
                    </Typography></li>)}


            </ul>


        </div>
    )

}


export default withStyles(styles)(Imp);